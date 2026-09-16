import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { ScaleBar } from "./scale-bar";

const meta: Meta<typeof ScaleBar> = {
  title: "Components/ScaleBar",
  component: ScaleBar,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="ScaleBar" /> };

export const Playground: StoryObj<typeof ScaleBar> = {
  args: { label: "100 м", widthPx: 80 },
  argTypes: { widthPx: { control: { type: "range", min: 20, max: 240, step: 1 } } },
};
