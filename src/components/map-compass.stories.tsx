import type { Meta, StoryObj } from "@storybook/react-vite";

import { MapCompass } from "./map-compass";

const meta: Meta<typeof MapCompass> = {
  title: "Components/MapCompass",
  component: MapCompass,
};
export default meta;

export const AllVariants: StoryObj = {
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

export const Playground: StoryObj<typeof MapCompass> = {
  args: { label: "Повернуть карту на север", heading: 35, aligned: false },
  argTypes: { heading: { control: { type: "range", min: 0, max: 360, step: 1 } } },
};
