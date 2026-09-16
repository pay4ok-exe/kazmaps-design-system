import type { Meta, StoryObj } from "@storybook/react-vite";
import { Minus, Plus } from "lucide-react";

import { Cases } from "./cases";
import { IconButton } from "./icon-button";
import { IconButtonGroup } from "./icon-button-group";

const meta: Meta<typeof IconButtonGroup> = {
  title: "Components/IconButtonGroup",
  component: IconButtonGroup,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="IconButtonGroup" /> };

export const Playground: StoryObj<typeof IconButtonGroup> = {
  args: { label: "Масштаб", direction: "vertical" },
  argTypes: {
    direction: { control: "inline-radio", options: ["vertical", "horizontal"] },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <IconButtonGroup {...args}>
      <IconButton label="Приблизить">
        <Plus size={24} aria-hidden="true" />
      </IconButton>
      <IconButton label="Отдалить">
        <Minus size={24} aria-hidden="true" />
      </IconButton>
    </IconButtonGroup>
  ),
};
