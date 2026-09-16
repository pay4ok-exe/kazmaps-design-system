import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { ShimmerBlock } from "./shimmer-block";

const meta: Meta<typeof ShimmerBlock> = {
  title: "Components/ShimmerBlock",
  component: ShimmerBlock,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="ShimmerBlock" /> };

export const Playground: StoryObj<typeof ShimmerBlock> = {
  args: { className: "h-4 w-24" },
};
