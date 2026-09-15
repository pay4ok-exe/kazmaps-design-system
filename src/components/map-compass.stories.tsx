"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { MapCompass } from "./map-compass";

const meta: Meta<typeof MapCompass> = {
  title: "Components/MapCompass",
  component: MapCompass,
  args: { label: "Повернуть карту на север", heading: 0, aligned: false },
  argTypes: { heading: { control: { type: "range", min: 0, max: 360, step: 1 } } },
};
export default meta;

export const Playground: StoryObj<typeof MapCompass> = {};

export const States: StoryObj = {
  render: () => (
    <div className="flex items-center gap-(--spacing-gap-24)">
      {[
        { label: "Default", props: {} },
        { label: "Aligned", props: { aligned: true } },
        { label: "Heading 35°", props: { heading: 35 } },
        { label: "Heading 180°", props: { heading: 180 } },
      ].map(({ label, props }) => (
        <div key={label} className="flex flex-col items-center gap-(--spacing-gap-8)">
          <MapCompass label={`Compass: ${label}`} {...props} />
          <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
            {label}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Interactive: StoryObj = {
  render: function Interactive() {
    const [heading, setHeading] = useState(35);
    return (
      <div className="flex items-center gap-(--spacing-gap-16)">
        <MapCompass
          label="Повернуть карту на север"
          heading={heading}
          aligned={heading === 0}
          onClick={() => {
            setHeading(0);
          }}
        />
        <div className="flex flex-col gap-(--spacing-gap-4)">
          <span className="text-xs text-(color:--text-secondary)">heading {heading}°</span>
          <div className="flex gap-(--spacing-gap-8)">
            {[-45, 45].map((delta) => (
              <button
                key={delta}
                type="button"
                onClick={() => {
                  setHeading((h) => (h + delta + 360) % 360);
                }}
                className="rounded-(--dimension-corner-radius-6) bg-(--background-secondary) px-(--spacing-padding-8) py-(--spacing-padding-4) text-xs text-(color:--text-primary)"
              >
                {delta > 0 ? `+${String(delta)}°` : `${String(delta)}°`}
              </button>
            ))}
          </div>
          <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
            clicking the compass resets to north
          </span>
        </div>
      </div>
    );
  },
};
