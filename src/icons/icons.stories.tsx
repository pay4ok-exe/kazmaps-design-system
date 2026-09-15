import type { Meta, StoryObj } from "@storybook/react-vite";
import { createElement } from "react";

import * as Icons from "./generated";
import { ICON_MANIFEST } from "./generated/manifest";

const meta: Meta = { title: "Icons/Набор" };
export default meta;

type IconComponent = (props: { size?: number; title?: string }) => React.ReactElement;

const pascal = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

/* Карта собирается один раз на модуле, а рисуются глифы через createElement.
   Поиск компонента прямо в рендере с присваиванием в переменную с большой
   буквы линтер справедливо считает созданием компонента на каждый рендер. */
const GLYPHS: Record<string, IconComponent> = Object.fromEntries(
  ICON_MANIFEST.map(({ slug }) => [
    slug,
    (Icons as unknown as Record<string, IconComponent>)[`Icon${pascal(slug)}`],
  ]),
);

const glyph = (slug: string, key?: string) =>
  GLYPHS[slug] ? createElement(GLYPHS[slug], { key }) : null;

function Cell({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col items-center gap-(--spacing-gap-4) rounded-(--dimension-corner-radius-8) bg-(--background-secondary) p-(--spacing-padding-8)">
      <span className="text-(color:--icon-primary)">{glyph(slug)}</span>
      <span className="text-center text-[10px] leading-(--typography-line-height-12) text-(color:--text-secondary)">
        {slug}
      </span>
    </div>
  );
}

function Grid({ slugs, min = 96 }: { slugs: readonly string[]; min?: number }) {
  return (
    <div
      className="grid gap-(--spacing-gap-8)"
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${String(min)}px, 1fr))` }}
    >
      {slugs.map((slug) => (
        <Cell key={slug} slug={slug} />
      ))}
    </div>
  );
}

// Иконки есть только у бренда maps — открывать их в business нечего.
const MAPS = { brand: "maps" };

export const Все: StoryObj = {
  globals: MAPS,
  render: () => <Grid slugs={ICON_MANIFEST.map((i) => i.slug)} />,
};

/* Одноцветные залиты currentColor, поэтому слушаются роли у родителя. Здесь это
   видно буквально: одни и те же глифы в четырёх ролях icon/*. */
export const Раскраска: StoryObj = {
  globals: MAPS,
  render: () => {
    const slugs = ICON_MANIFEST.filter((i) => !i.multicolour)
      .slice(0, 8)
      .map((i) => i.slug);
    return (
      <div className="flex flex-col gap-(--spacing-gap-16)">
        {["--icon-primary", "--icon-secondary", "--icon-tertiary", "--icon-accent"].map((role) => (
          <section key={role} className="flex flex-col gap-(--spacing-gap-4)">
            <h3 className="text-xs text-(color:--text-tertiary)">{role}</h3>
            <div className="flex gap-(--spacing-gap-12)" style={{ color: `var(${role})` }}>
              {slugs.map((slug) => glyph(slug, slug))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};

/* Иконки погоды несут роли weather/*, а не currentColor. Переключите тему в
   тулбаре: если какая-то из них не изменилась — значит в разметке остался
   литерал светлой темы. */
export const Погода: StoryObj = {
  globals: MAPS,
  render: () => <Grid slugs={ICON_MANIFEST.filter((i) => i.multicolour).map((i) => i.slug)} />,
};

/* 31 иконка снята в двух начертаниях. Разница тонкая, и увидеть её проще
   парами, чем в общей сетке. */
export const Начертания: StoryObj = {
  globals: MAPS,
  render: () => {
    const bases = [
      ...new Set(
        ICON_MANIFEST.map((i) => i.slug)
          .filter((s) => s.endsWith("-bold") || s.endsWith("-light"))
          .map((s) => s.replace(/-(bold|light)$/, "")),
      ),
    ];
    return (
      <div
        className="grid gap-(--spacing-gap-8)"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}
      >
        {bases.map((base) => (
          <div
            key={base}
            className="flex flex-col items-center gap-(--spacing-gap-4) rounded-(--dimension-corner-radius-8) bg-(--background-secondary) p-(--spacing-padding-8) text-(color:--icon-primary)"
          >
            <div className="flex gap-(--spacing-gap-12)">
              {glyph(`${base}-light`, "light")}
              {glyph(`${base}-bold`, "bold")}
            </div>
            <span className="text-center text-[10px] leading-(--typography-line-height-12) text-(color:--text-secondary)">
              {base}
            </span>
          </div>
        ))}
      </div>
    );
  },
};
