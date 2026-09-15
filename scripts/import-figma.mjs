/* Переносит выгрузку Figma Variables (tokens/figma/export.json) в контракт бренда
   maps: tokens/brands/maps.json + блок byBrand.maps в tokens/schema.json.

   Почему генератор, а не правка руками: ролей 130 (65 semantics × 2 темы + 66
   numerics), и любая опечатка в hex молча уедет в прод мимо ревью. Здесь же
   единственный источник — export.json, снятый Plugin API. */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), "utf8"));
const GENERATED = ["tokens/brands/maps.json", "tokens/schema.json"];
const write = (p, v) => writeFileSync(join(ROOT, p), JSON.stringify(v, null, 2) + "\n");

const fig = read("tokens/figma/export.json");

/** Figma `группа/роль` → CSS `--группа-роль`. Точки входа `0_5` сохраняются как есть:
    подчёркивание в custom property легально, а замена на дефис склеила бы
    `stroke/border/0_5` и несуществующий `stroke/border/0/5`. */
const cssName = (figmaName) => figmaName.replace(/\//g, "-");

/** Figma отдаёт alpha-роли как «алиас + opacity в процентах», а не литералом.
    Разворачиваем в #rrggbbaa: так значение остаётся литералом (контракт
    запрещает var() в брендовом JSON) и при этом читается глазами. */
const withAlpha = (base, opacityPercent) =>
  base +
  Math.round((opacityPercent / 100) * 255)
    .toString(16)
    .padStart(2, "0");

const colorFor = (def, theme) => {
  const v = def[theme];
  return typeof v === "string" ? v : withAlpha(v.base, v.opacity);
};

// ---- themes -----------------------------------------------------------------

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
  if (def._type === "STRING") continue; // Map — переключатель тайлов, не цвет
  const role = cssName(figmaName);
  const group = figmaName.split("/")[0];
  if (!(group in GROUPS)) throw new Error(`неизвестная группа semantics: ${group}`);
  GROUPS[group].push(role);

  for (const theme of ["light", "dark"]) {
    themes[theme][role] = { $type: "color", $value: colorFor(def, theme) };
  }
}

// icon/dander — опечатка в макете. Заводим роль под именем источника (иначе
// трассировка разойдётся) и помечаем описанием, чтобы находка не потерялась.
for (const theme of ["light", "dark"]) {
  themes[theme]["icon-dander"].$description =
    "опечатка в Figma (ожидается icon/danger) — имя держим как в источнике до правки макета";
}

// ---- static (numerics) ------------------------------------------------------

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

/* Гарнитура и начертания переменными в Figma не заданы — это свойства текстовых
   нод. Сняты обходом всех 89 текстов страницы Components: везде Inter, веса
   ровно четыре — 400, 450, 500 и 550.

   450 и 550 существуют только у переменного Inter, статичные начертания их не
   дают. Отсюда два следствия: в main-web шрифт подключается без списка weight
   (иначе next/font отдаст статику и промежуточные веса схлопнутся к соседним),
   а в компонентах вес пишется как [font-weight:var(--font-weight-*)] —
   font-(--x) в Tailwind v4 уходит в семейство, подсказки weight у него нет. */
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

/* Шкалу --text-* Tailwind держим в rem, хотя Figma отдаёт px: px-кегль игнорирует
   пользовательский размер шрифта в браузере, а ступени всё равно совпадают —
   12/14/16px из макета это ровно 0.75/0.875/1rem. Ступени крупнее 16px источника
   в макете не имеют вовсе: typography/font-size обрывается на 16. Держим прежние
   значения с пометкой ожидания, а не выдумываем ряд — подобранное «на глаз» число
   здесь неотличимо от измеренного и тихо разъедется с макетом. */
const TEXT_SCALE = {
  // из макета: typography/font-size 12 / 14 / 16
  "text-xs": "0.75rem",
  "text-sm": "0.875rem",
  "text-base": "1rem",
  // источника в макете нет
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

// ---- extras -----------------------------------------------------------------

const extras = {
  light: {
    "map-tile-style": { $type: "string", $value: fig.semantics.Map.light },
    "shimmer-peak": { $type: "number", $value: "0.94", $description: WAITING },
  },
  dark: {
    "map-tile-style": { $type: "string", $value: fig.semantics.Map.dark },
    "shimmer-peak": { $type: "number", $value: "1.12", $description: WAITING },
  },
};

// ---- kit --------------------------------------------------------------------
/* Моушен и СОСТАВНЫЕ тени переменными в макете не заданы: numerics отдаёт только
   shadow/blur/* и shadow/position/*, без цвета и без готовой комбинации. Собрать
   из них тень — это домыслить смещение, цвет и альфу, то есть выдать выдумку за
   замер. Переносим прежние значения как есть с пометкой ожидания; выбросить их
   нельзя — на них стоят компоненты кита и гвардия globals.test.ts в main-web. */
const kit = {
  /* Тени, реально измеренные в макете (эффекты DROP_SHADOW на нодах, а не
     переменные) — поэтому без пометки ожидания, в отличие от блока ниже.
     Смещения 2 и 4 в шкалу shadow/position (8, 24) не попадают, записаны как
     есть; радиусы 4 и 8 — это shadow/blur/4 и shadow/blur/8. */
  "shadow-field": { $type: "shadow", $value: "rgba(0, 0, 0, 0.04) 0px 4px 4px 0px" },
  // Плавающие элементы поверх карты: Map Action, Map Traffic, Map Compass, Profile.
  "shadow-hud": { $type: "shadow", $value: "rgba(0, 0, 0, 0.12) 0px 4px 8px 0px" },
  "shadow-hud-hover": { $type: "shadow", $value: "rgba(0, 0, 0, 0.24) 0px 4px 8px 0px" },
  // Collapse Sidebar Action — тень вбок, а не вниз: элемент липнет к краю панели.
  "shadow-hud-side": { $type: "shadow", $value: "rgba(0, 0, 0, 0.08) 4px 0px 8px 0px" },
  // Map Weather — тот же цвет, но смещение меньше.
  "shadow-hud-badge": { $type: "shadow", $value: "rgba(0, 0, 0, 0.12) 0px 2px 8px 0px" },
  // Dialog (137:440) — самая мягкая из измеренных: та же форма, но 8%.
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

// ---- запись -----------------------------------------------------------------

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
  // Прежние имена контракта остаются жить как var()-алиасы: main-web ссылается на
  // них из 1614 className, и переводить их одним коммитом вместе со сменой палитры
  // означало бы нечитаемый диф. Удаляются по мере миграции экранов.
  aliases: {
    /* Шкала радиусов Tailwind наведена на numerics макета: без этого rounded-lg
       брал бы дефолт Tailwind, а не измеренное значение. Ступени 4/6/8/12/16
       совпали с дефолтами один в один, xl и 2xl появились впервые. Радиусы 2 и 10
       имени в Tailwind не имеют — компоненты берут их прямо как
       rounded-(--dimension-corner-radius-10). */
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
    // highlight/highlight-soft и их алиасы gold/gold-soft не переносим: в макете
    // такой роли нет, а в main-web на них нет ни одной ссылки (проверено grep).
  },
};
write("tokens/schema.json", schema);

// Как и build-tokens.mjs: форматируем сгенерированное, иначе format:check краснеет
// на файле, который никто не писал руками.
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
