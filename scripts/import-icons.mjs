import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "src/icons/svg");

const FILE_KEY = "eI51Nnu0d74Y5xdO3XIZ30";
const ICONS_PAGE = "Icons";

const token = process.env.FIGMA_TOKEN;
if (!token) {
  console.error("Нужен FIGMA_TOKEN (Settings → Security → Personal access tokens).");
  process.exit(1);
}

const api = async (path) => {
  const res = await fetch(`https://api.figma.com${path}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) throw new Error(`${path} → ${res.status} ${await res.text()}`);
  return res.json();
};

const slug = (name) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const file = await api(`/v1/files/${FILE_KEY}?depth=4`);
const page = file.document.children.find((p) => p.name === ICONS_PAGE);
if (!page) throw new Error(`страница ${ICONS_PAGE} не найдена`);

const wanted = [];
const walk = (node, setName) => {
  if (node.name.trimStart().startsWith("_")) return;

  if (node.type === "COMPONENT") {
    const weight = setName ? node.name.split("=")[1]?.trim() : null;
    wanted.push({
      id: node.id,
      file: weight ? `${slug(setName)}-${slug(weight)}` : slug(node.name),
    });
    return;
  }
  for (const child of node.children ?? [])
    walk(child, node.type === "COMPONENT_SET" ? node.name : null);
};
walk(page, null);

if (wanted.length === 0) throw new Error("на странице Icons не нашлось ни одного компонента");

const CHUNK = 60;
const urls = {};
for (let i = 0; i < wanted.length; i += CHUNK) {
  const part = wanted.slice(i, i + CHUNK);
  const { images, err } = await api(
    `/v1/images/${FILE_KEY}?ids=${part.map((n) => n.id).join(",")}&format=svg`,
  );
  if (err) throw new Error(String(err));
  Object.assign(urls, images);
}

const downloads = [];
for (const node of wanted) {
  const url = urls[node.id];
  if (!url) throw new Error(`нет ссылки для ${node.file} (${node.id})`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${node.file}: ${res.status} ${res.statusText}`);
  const svg = await res.text();
  if (!svg.trimStart().startsWith("<svg")) throw new Error(`${node.file}: ответ не SVG`);
  downloads.push({ file: node.file, svg });
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const { file, svg } of downloads) {
  writeFileSync(join(OUT, `${file}.svg`), svg.trimEnd() + "\n");
}

console.log(
  JSON.stringify(
    { components: wanted.length, written: downloads.length, files: readdirSync(OUT).length },
    null,
    2,
  ),
);
