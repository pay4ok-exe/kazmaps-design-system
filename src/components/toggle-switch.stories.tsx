import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Cases } from "./cases";
import { ToggleSwitch } from "./toggle-switch";

const meta: Meta<typeof ToggleSwitch> = {
  title: "Components/ToggleSwitch",
  component: ToggleSwitch,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="ToggleSwitch" /> };

export const Playground: StoryObj<typeof ToggleSwitch> = {
  args: { label: "Вид" },
  argTypes: {
    options: { table: { disable: true } },
    activeId: { table: { disable: true } },
    onSelect: { table: { disable: true } },
  },
  render: function Render(args) {
    const [activeId, setActiveId] = useState("map");
    return (
      <ToggleSwitch
        {...args}
        activeId={activeId}
        onSelect={setActiveId}
        options={[
          { id: "map", label: "Карта" },
          { id: "list", label: "Список" },
        ]}
      />
    );
  },
};
