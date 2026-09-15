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

function Section({ name, note }: { name: string; note?: string }) {
  const entries = inSection(name);
  const paired = new Set(
    entries.filter((e) => e.weight).map((e) => e.slug.replace(/-(bold|light)$/, "")),
  );
  return (
    <div className="flex flex-col gap-(--spacing-gap-8)">
      <div className="flex flex-col gap-(--spacing-gap-2)">
        <p className="text-xs leading-(--typography-line-height-16) text-(color:--text-secondary)">
          {entries.length} шт. · в двух начертаниях {paired.size} · в одном{" "}
          {entries.filter((e) => !e.weight).length}
        </p>
        {note ? (
          <p className="max-w-[560px] text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
            {note}
          </p>
        ) : null}
      </div>
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
  render: () => (
    <Section
      name="Weather Icons"
      note="Единственные многоцветные в наборе: несут роли weather/*, а не currentColor. Переключите тему в тулбаре — цвета обязаны измениться."
    />
  ),
};
