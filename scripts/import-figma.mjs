import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

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

const extras = {
  light: {
    "map-tile-style": { $type: "string", $value: fig.semantics.Map.light },
    "shimmer-peak": { $type: "number", $value: "0.94", $description: WAITING },
    "surface-map": { $type: "color", $value: "#e9ece4", $description: WAITING },
    "text-on-map": { $type: "color", $value: "#22272e", $description: WAITING },
    "rating-star": { $type: "color", $value: "#f2a615", $description: WAITING },
    "marker-primary": { $type: "color", $value: "#e0442f", $description: WAITING },
  },
  dark: {
    "map-tile-style": { $type: "string", $value: fig.semantics.Map.dark },
    "shimmer-peak": { $type: "number", $value: "1.12", $description: WAITING },
    "surface-map": { $type: "color", $value: "#0a0e18", $description: WAITING },
    "text-on-map": { $type: "color", $value: "#22272e", $description: WAITING },
    "rating-star": { $type: "color", $value: "#f2a615", $description: WAITING },
    "marker-primary": { $type: "color", $value: "#e0442f", $description: WAITING },
  },
};

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
  "shadow-column": {
    $type: "shadow",
    $value: "rgba(16, 24, 40, 0.05) 2px 0px 8px 0px",
    $description: WAITING,
  },
  "shadow-button-sm": {
    $type: "shadow",
    $value: "rgba(16, 24, 40, 0.08) 0px 1px 3px 0px",
    $description: WAITING,
  },
  "shadow-button-md": {
    $type: "shadow",
    $value: "rgba(16, 24, 40, 0.1) 0px 1px 3px 0px",
    $description: WAITING,
  },
  "shadow-sheet-top": {
    $type: "shadow",
    $value: "rgba(16, 24, 40, 0.14) 0px -4px 20px 0px",
    $description: WAITING,
  },
  "shadow-dropdown": {
    $type: "shadow",
    $value: "rgba(16, 24, 40, 0.22) 0px 12px 32px 0px",
    $description: WAITING,
  },
};

write("tokens/brands/maps.json", {
  brand: "maps",
  defaultTheme: "light",
  followsSystem: true,
  _source: "tokens/figma/export.json — сгенерировано scripts/import-figma.mjs, не править руками",
  themes,
  static: statics,
  kit,
  extras,
});

const schema = read("tokens/schema.json");
schema.byBrand = schema.byBrand ?? {};
schema.byBrand.maps = {
  replacesContract: true,
  themed: GROUPS,
  static: staticRoles,
  aliases: {
    "radius-sm": "dimension-corner-radius-4",
    "radius-md": "dimension-corner-radius-6",
    "radius-lg": "dimension-corner-radius-8",
    "radius-xl": "dimension-corner-radius-12",
    "radius-2xl": "dimension-corner-radius-16",
    "radius-full": "dimension-corner-radius-max",

    "surface-base": "background-secondary",
    "surface-panel": "background-primary",
    "surface-raised": "background-secondary",
    "surface-subtle": "background-secondary",
    "backdrop-scrim": "overlay-modal-dialog",
    "text-muted": "text-secondary",
    "text-faint": "text-tertiary",
    "text-on-accent": "text-white",
    border: "border-primary",
    "border-subtle": "border-secondary",
    "border-hairline": "border-secondary",
    "border-input": "border-primary",
    accent: "action-accent-primary",
    "accent-press": "action-accent-secondary",
    "accent-soft-bg": "background-secondary",
    "accent-soft-border": "action-accent-subtle",
    success: "tag-green",
    "success-soft-bg": "traffic-fill-green",
    warning: "tag-orange",
    "warning-soft-bg": "traffic-fill-orange",
    danger: "action-danger-primary",
    "danger-soft-bg": "action-danger-subtle",
    info: "action-accent-primary",
    "info-soft-bg": "background-secondary",
    "bg-2": "background-secondary",
    "ink-2": "text-secondary",
  },
};
write("tokens/schema.json", schema);

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
