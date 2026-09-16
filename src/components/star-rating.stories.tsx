import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { StarRating } from "./star-rating";

const meta: Meta<typeof StarRating> = {
  title: "Components/StarRating",
  component: StarRating,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="StarRating" /> };

export const Playground: StoryObj<typeof StarRating> = {
  args: { value: 4.5 },
  argTypes: { value: { control: { type: "range", min: 0, max: 5, step: 0.5 } } },
};
