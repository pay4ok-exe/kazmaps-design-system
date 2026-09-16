import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ownedStatics, validateOwnStatics } from "./owned-statics.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), "utf8"));
const GENERATED = ["tokens/brands/maps.json", "tokens/schema.json"];
const write = (p, v) => writeFileSync(join(ROOT, p), JSON.stringify(v, null, 2) + "\n");

const fig = read("tokens/figma/export.json");

const cssName = (figmaName) => figmaName.replace(/\//g, "-");

const withAlpha = (base, opacityPercent) =>
  base +
  Math.round((opacityPercent / 100) * 255)
    .toString(16)
    .padStart(2, "0");

const colorFor = (def, theme) => {
  const v = def[theme];
  return typeof v === "string" ? v : withAlpha(v.base, v.opacity);
};

const GROUPS = {
  action: [],
  background: [],
  overlay: [],
  border: [],
  text: [],
  icon: [],
  tag: [],
  traffic: [],
  weather: [],
};

const themes = { light: {}, dark: {} };

for (const [figmaName, def] of Object.entries(fig.semantics)) {
  if (def._type === "STRING") continue;
  const role = cssName(figmaName);
  const group = figmaName.split("/")[0];
  if (!(group in GROUPS)) throw new Error(`неизвестная группа semantics: ${group}`);
  GROUPS[group].push(role);

  for (const theme of ["light", "dark"]) {
    themes[theme][role] = { $type: "color", $value: colorFor(def, theme) };
  }
}

for (const theme of ["light", "dark"]) {
  if (themes[theme]["icon-dander"] === undefined) continue;
  themes[theme]["icon-dander"].$description =
    "опечатка в Figma (ожидается icon/danger) — имя держим как в источнике до правки макета";
}

const staticRoles = [];
const statics = {};
const TYPE_BY_GROUP = {
  "dimension/corner-radius": "dimension",
  "dimension/height": "dimension",
  "dimension/width": "dimension",
  "spacing/gap": "dimension",
  "spacing/padding": "dimension",
  "stroke/border": "dimension",
  "stroke/divider": "dimension",
  "shadow/blur": "dimension",
  "shadow/position": "dimension",
  "typography/font-size": "dimension",
  "typography/line-height": "dimension",
};

for (const [group, steps] of Object.entries(fig.numerics)) {
  for (const [step, value] of Object.entries(steps)) {
    const role = cssName(`${group}/${step}`);
    staticRoles.push(role);
    statics[role] = { $type: TYPE_BY_GROUP[group], $value: `${value}px` };
  }
}

const WAITING = "ожидает значения от дизайнера";

staticRoles.push("font-sans");
statics["font-sans"] = {
  $type: "fontFamily",
  $value: "var(--font-inter), system-ui, sans-serif",
};

for (const [role, value] of Object.entries({
  "font-weight-regular": "400",
  "font-weight-book": "450",
  "font-weight-medium": "500",
  "font-weight-strong": "550",
})) {
  staticRoles.push(role);
  statics[role] = { $type: "fontWeight", $value: value };
}

const TEXT_SCALE = {
  "text-xs": "0.75rem",
  "text-sm": "0.875rem",
  "text-base": "1rem",
  "text-lg": "1.125rem",
  "text-xl": "1.25rem",
  "text-2xl": "1.5rem",
  "text-3xl": "1.875rem",
};
const TEXT_FROM_FIGMA = new Set(["text-xs", "text-sm", "text-base"]);
for (const [role, value] of Object.entries(TEXT_SCALE)) {
  staticRoles.push(role);
  statics[role] = {
    $type: "dimension",
    $value: value,
    ...(TEXT_FROM_FIGMA.has(role) ? {} : { $description: WAITING }),
  };
}

const WAIT_MAP = {
  "shimmer-peak": { light: "0.94", dark: "1.12", $type: "number" },
  "surface-map": { light: "#e9ece4", dark: "#0a0e18", $type: "color" },
  "text-on-map": { light: "#22272e", dark: "#22272e", $type: "color" },
  "rating-star": { light: "#f2a615", dark: "#f2a615", $type: "color" },
};
GROUPS.map = ["surface-map", "text-on-map", "rating-star"];
GROUPS.effect = ["shimmer-peak"];
for (const [role, def] of Object.entries(WAIT_MAP)) {
  for (const theme of ["light", "dark"]) {
    themes[theme][role] = { $type: def.$type, $value: def[theme], $description: WAITING };
  }
}

const kit = {
  "shadow-field": { $type: "shadow", $value: "rgba(0, 0, 0, 0.04) 0px 4px 4px 0px" },
  "shadow-hud": { $type: "shadow", $value: "rgba(0, 0, 0, 0.12) 0px 4px 8px 0px" },
  "shadow-hud-hover": { $type: "shadow", $value: "rgba(0, 0, 0, 0.24) 0px 4px 8px 0px" },
  "shadow-hud-side": { $type: "shadow", $value: "rgba(0, 0, 0, 0.08) 4px 0px 8px 0px" },
  "shadow-hud-badge": { $type: "shadow", $value: "rgba(0, 0, 0, 0.12) 0px 2px 8px 0px" },
  "shadow-modal": { $type: "shadow", $value: "rgba(0, 0, 0, 0.08) 0px 4px 8px 0px" },
  "ease-standard": { $type: "cubicBezier", $value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  "motion-fast": { $type: "duration", $value: "140ms", $description: WAITING },
  "motion-panel": { $type: "duration", $value: "240ms", $description: WAITING },
  "motion-shimmer": { $type: "duration", $value: "1.6s", $description: WAITING },
};
for (const [role, def] of Object.entries(kit)) {
  staticRoles.push(role);
  statics[role] = def;
}

const OTHER_BRANDS = ["business", "booking"];
for (const name of OTHER_BRANDS) {
  validateOwnStatics(name, read(`tokens/brands/${name}.json`), staticRoles);
}

write("tokens/brands/maps.json", {
  brand: "maps",
  defaultTheme: "light",
  followsSystem: true,
  _source: "tokens/figma/export.json — сгенерировано scripts/import-figma.mjs, не править руками",
  themes,
  static: statics,
});

const schema = read("tokens/schema.json");
write("tokens/schema.json", { ...schema, themed: GROUPS, static: staticRoles });

const syncRoles = (current, contract, fallback, override) => {
  const own = current ?? {};
  const keep = Object.keys(own)
    .filter((role) => contract.includes(role))
    .map((role) => [role, override(role) ?? own[role]]);
  const added = contract.filter((role) => !(role in own)).map((role) => [role, fallback[role]]);
  return Object.fromEntries([...keep, ...added]);
};
const themedContract = Object.values(GROUPS).flat();
for (const name of OTHER_BRANDS) {
  const path = `tokens/brands/${name}.json`;
  const brand = read(path);
  for (const theme of Object.keys(themes)) {
    brand.themes[theme] = syncRoles(
      brand.themes[theme],
      themedContract,
      themes[theme],
      () => undefined,
    );
  }
  const owned = ownedStatics(brand);
  brand.static = syncRoles(brand.static, staticRoles, statics, (role) =>
    owned.has(role) ? undefined : statics[role],
  );
  write(path, brand);
  GENERATED.push(path);
}

execFileSync("npx", ["--no-install", "prettier", "--write", ...GENERATED], {
  cwd: ROOT,
  stdio: "ignore",
});

console.log(
  JSON.stringify(
    {
      themedRoles: Object.values(GROUPS).flat().length,
      staticRoles: staticRoles.length,
      groups: Object.fromEntries(Object.entries(GROUPS).map(([g, r]) => [g, r.length])),
    },
    null,
    2,
  ),
);
