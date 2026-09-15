/* Тянет иконки из Figma в src/icons/svg/*.svg.
 *
 * Почему REST, а не выгрузка руками: набор живой — дизайнер правит глифы и
 * добавляет новые. Разовый перенос пришлось бы повторять вручную и сверять
 * глазами, а этот скрипт перезапускается одной командой и показывает дифом,
 * что именно изменилось.
 *
 *   FIGMA_TOKEN=<personal access token> npm run icons:import
 *
 * Токен берётся в Figma → Settings → Security → Personal access tokens,
 * достаточно области file_read.
 */
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

/** `Cloud Sunny ` → `cloud-sunny`. Хвостовые пробелы в именах макета реальны. */
const slug = (name) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// ---- какие ноды тянуть ------------------------------------------------------

const file = await api(`/v1/files/${FILE_KEY}?depth=4`);
const page = file.document.children.find((p) => p.name === ICONS_PAGE);
if (!page) throw new Error(`страница ${ICONS_PAGE} не найдена`);

const wanted = [];
const walk = (node, setName) => {
  if (node.type === "COMPONENT") {
    // Внутри COMPONENT_SET имя варианта выглядит как "weight=bold".
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

// ---- ссылки на SVG ----------------------------------------------------------

/* Запрос по списку id: Figma отдаёт временные ссылки, качать их надо сразу.
   Режем на части, иначе длинный URL упирается в ограничение сервера. */
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

// ---- запись -----------------------------------------------------------------

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

let written = 0;
for (const node of wanted) {
  const url = urls[node.id];
  if (!url) {
    console.error(`нет ссылки для ${node.file} (${node.id})`);
    continue;
  }
  const svg = await (await fetch(url)).text();
  writeFileSync(join(OUT, `${node.file}.svg`), svg.trimEnd() + "\n");
  written += 1;
}

console.log(
  JSON.stringify({ components: wanted.length, written, files: readdirSync(OUT).length }, null, 2),
);
