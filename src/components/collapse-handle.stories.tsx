import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronLeft } from "lucide-react";

import { Cases } from "./cases";
import { CollapseHandle } from "./collapse-handle";

const meta: Meta<typeof CollapseHandle> = {
  title: "Components/CollapseHandle",
  component: CollapseHandle,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="CollapseHandle" /> };

export const Playground: StoryObj<typeof CollapseHandle> = {
  args: { open: true, label: "Свернуть панель" },
  argTypes: { children: { table: { disable: true } } },
  render: (args) => (
    <CollapseHandle {...args}>
      <ChevronLeft size={20} aria-hidden="true" />
    </CollapseHandle>
  ),
};
