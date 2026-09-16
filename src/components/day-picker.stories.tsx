import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import { Overlay } from "./cases";
import { DayPicker } from "./day-picker";

const meta: Meta<typeof DayPicker> = {
  title: "Components/DayPicker",
  component: DayPicker,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Overlay component="DayPicker" /> };

export const Playground: StoryObj<typeof DayPicker> = {
  args: { value: "2026-09-09", max: "2026-12-31", label: "Дата" },
  argTypes: { onChange: { table: { disable: true } } },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <DayPicker
        {...args}
        onChange={(value) => {
          updateArgs({ value });
        }}
      />
    );
  },
};
