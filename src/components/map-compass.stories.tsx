import type { Meta, StoryObj } from "@storybook/react-vite";

import { MapCompass } from "./map-compass";

const meta: Meta<typeof MapCompass> = {
  title: "Components/MapCompass",
  component: MapCompass,
};
export default meta;

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-16)">
      <p className="max-w-[560px] text-xs leading-(--typography-line-height-16) text-(color:--text-secondary)">
        Буква вращается вместе со шкалой. Нажмите на любой компас — без внешнего heading он сам
        возвращается на север и подсвечивается акцентом.
      </p>
      <div className="flex items-center gap-(--spacing-gap-24)">
        {[
          { label: "Север", heading: 0 },
          { label: "35°", heading: 35 },
          { label: "180°", heading: 180 },
          { label: "270°", heading: 270 },
        ].map(({ label, heading }) => (
          <div key={label} className="flex flex-col items-center gap-(--spacing-gap-8)">
            <MapCompass label={`Повернуть карту на север: ${label}`} defaultHeading={heading} />
            <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Playground: StoryObj<typeof MapCompass> = {
  args: { label: "Повернуть карту на север", heading: 35 },
  argTypes: {
    heading: { control: { type: "range", min: 0, max: 360, step: 1 } },
    defaultHeading: { table: { disable: true } },
  },
};
