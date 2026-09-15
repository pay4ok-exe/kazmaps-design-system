import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SVG_DIR = join(ROOT, "src/icons/svg");
const SOURCE = join(ROOT, "src/icons/source.json");
const OUT_DIR = join(ROOT, "src/icons/generated");

const WEATHER_COLORS = {
  "#F1C21B": "--weather-sun",
  "#A4AAB3": "--weather-moon",
  "#82CFFF": "--weather-cloud",
  "#4589FF": "--weather-raindrop",
  "#C1C5C9": "--weather-snow",
};

const pascal = (slug) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

function normalise(svg) {
  let body = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();

  let multicolour = false;
  body = body.replace(/fill="(#[0-9a-fA-F]{6})"/g, (match, hex) => {
    const role = WEATHER_COLORS[hex.toUpperCase()];
    if (role) {
      multicolour = true;
      return `fill="var(${role})"`;
    }
    if (hex.toLowerCase() === "#000000") return 'fill="currentColor"';
    throw new Error(`неизвестный литерал ${hex}: добавьте роль в WEATHER_COLORS`);
  });

  body = body.replace(/fill="black"/g, 'fill="currentColor"');

  body = body.replace(
    /\s([a-z]+(?:-[a-z]+)+)=/g,
    (match, attr) => ` ${attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}=`,
  );

  return { body, multicolour };
}

const source = existsSync(SOURCE) ? JSON.parse(readFileSync(SOURCE, "utf8")) : {};

const files = readdirSync(SVG_DIR)
  .filter((f) => f.endsWith(".svg"))
  .sort();
if (files.length === 0) throw new Error("src/icons/svg пуст — запустите icons:import");

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

const index = [];
for (const file of files) {
  const slug = file.replace(/\.svg$/, "");
  const name = `Icon${pascal(slug)}`;
  const { body, multicolour } = normalise(readFileSync(join(SVG_DIR, file), "utf8"));

  writeFileSync(
    join(OUT_DIR, `${slug}.tsx`),
    `/* сгенерировано scripts/build-icons.mjs из src/icons/svg/${file} — не править руками */
import type { IconProps } from "../icon";
import { Icon } from "../icon";

export function ${name}(props: IconProps) {
  return (
    <Icon {...props} name="${slug}"${multicolour ? " multicolour" : ""}>
      ${body}
    </Icon>
  );
}
`,
  );
  const meta = source[slug] ?? {};
  index.push({
    slug,
    name,
    multicolour,
    section: meta.section ?? "Other",
    weight: meta.weight ?? null,
  });
}

writeFileSync(
  join(OUT_DIR, "index.ts"),
  "/* сгенерировано scripts/build-icons.mjs — не править руками */\n" +
    index.map((i) => `export { ${i.name} } from "./${i.slug}";`).join("\n") +
    "\n",
);

writeFileSync(
  join(OUT_DIR, "manifest.ts"),
  `/* сгенерировано scripts/build-icons.mjs — не править руками */
export const ICON_MANIFEST = ${JSON.stringify(
    index.map(({ slug, multicolour, section, weight }) => ({
      slug,
      multicolour,
      section,
      weight,
    })),
    null,
    2,
  )} as const;
`,
);

execFileSync("npx", ["--no-install", "prettier", "--write", "src/icons/generated"], {
  cwd: ROOT,
  stdio: "ignore",
});

console.log(
  JSON.stringify(
    { icons: index.length, multicolour: index.filter((i) => i.multicolour).length },
    null,
    2,
  ),
);
