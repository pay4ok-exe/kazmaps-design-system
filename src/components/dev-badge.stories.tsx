import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { InDevelopment } from "./dev-badge";

const meta: Meta<typeof InDevelopment> = {
  title: "Components/InDevelopment",
  component: InDevelopment,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="InDevelopment" /> };

export const Playground: StoryObj<typeof InDevelopment> = {
  args: { children: "Скоро", as: "span" },
  argTypes: {
    as: { control: "inline-radio", options: ["span", "div"] },
    label: { control: "text" },
  },
};
