import type { Meta, StoryObj } from "@storybook/react-vite";
import { createElement } from "react";

import * as Icons from "./generated";
import { ICON_MANIFEST } from "./generated/manifest";

const meta: Meta = { title: "Icons" };
export default meta;

type IconComponent = (props: { size?: number; title?: string }) => React.ReactElement;

const pascal = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

const GLYPHS: Record<string, IconComponent> = Object.fromEntries(
  ICON_MANIFEST.map(({ slug }) => [
    slug,
    (Icons as unknown as Record<string, IconComponent>)[`Icon${pascal(slug)}`],
  ]),
);

const glyph = (slug: string, key?: string) =>
  GLYPHS[slug] ? createElement(GLYPHS[slug], { key }) : null;

const MAPS = { brand: "maps" };

type Entry = (typeof ICON_MANIFEST)[number];

const inSection = (section: string) => ICON_MANIFEST.filter((i) => i.section === section);

function Cell({ entry }: { entry: Entry }) {
  return (
    <div className="flex flex-col items-center gap-(--spacing-gap-4) rounded-(--dimension-corner-radius-8) bg-(--background-secondary) p-(--spacing-padding-8)">
      <span className="text-(color:--icon-primary)">{glyph(entry.slug)}</span>
      <span className="text-center text-[10px] leading-(--typography-line-height-12) text-(color:--text-secondary)">
        {entry.slug}
      </span>
    </div>
  );
}

function Grid({ entries, min = 96 }: { entries: readonly Entry[]; min?: number }) {
  return (
    <div
      className="grid gap-(--spacing-gap-8)"
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${String(min)}px, 1fr))` }}
    >
      {entries.map((entry) => (
        <Cell key={entry.slug} entry={entry} />
      ))}
    </div>
  );
}

function Section({ name }: { name: string }) {
  const entries = inSection(name);
  const paired = new Set(
    entries.filter((e) => e.weight).map((e) => e.slug.replace(/-(bold|light)$/, "")),
  );
  return (
    <div className="flex flex-col gap-(--spacing-gap-8)">
      <p className="text-xs leading-(--typography-line-height-16) text-(color:--text-secondary)">
        {entries.length} шт. · в двух начертаниях {paired.size} · в одном{" "}
        {entries.filter((e) => !e.weight).length}
      </p>
      <Grid entries={entries} />
    </div>
  );
}

export const InterfaceIcons: StoryObj = {
  name: "Interface Icons",
  globals: MAPS,
  render: () => <Section name="Interface Icons" />,
};

export const MapUiIcons: StoryObj = {
  name: "Map UI Icons",
  globals: MAPS,
  render: () => <Section name="Map UI Icons" />,
};

export const WeatherIcons: StoryObj = {
  name: "Weather Icons",
  globals: MAPS,
  render: () => <Section name="Weather Icons" />,
};

export const Все: StoryObj = {
  globals: MAPS,
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-24)">
      {["Interface Icons", "Map UI Icons", "Weather Icons"].map((section) => (
        <section key={section} className="flex flex-col gap-(--spacing-gap-8)">
          <h3 className="text-base leading-(--typography-line-height-20) text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
            {section}
          </h3>
          <Grid entries={inSection(section)} />
        </section>
      ))}
    </div>
  ),
};

export const Начертания: StoryObj = {
  globals: MAPS,
  render: () => {
    const bases = [
      ...new Set(
        ICON_MANIFEST.filter((i) => i.weight).map((i) => i.slug.replace(/-(bold|light)$/, "")),
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

export const ОдноНачертание: StoryObj = {
  name: "Только одно начертание",
  globals: MAPS,
  render: () => <Grid entries={ICON_MANIFEST.filter((i) => !i.weight)} />,
};

export const Погода: StoryObj = {
  globals: MAPS,
  render: () => <Grid entries={ICON_MANIFEST.filter((i) => i.multicolour)} />,
};

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
