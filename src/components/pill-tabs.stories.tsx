import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Cases } from "./cases";
import { PillTabs } from "./pill-tabs";

const meta: Meta<typeof PillTabs> = {
  title: "Components/PillTabs",
  component: PillTabs,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="PillTabs" /> };

export const Playground: StoryObj<typeof PillTabs> = {
  args: { label: "Вид" },
  argTypes: {
    options: { table: { disable: true } },
    activeId: { table: { disable: true } },
    onSelect: { table: { disable: true } },
  },
  render: function Render(args) {
    const [activeId, setActiveId] = useState("map");
    return (
      <PillTabs
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
