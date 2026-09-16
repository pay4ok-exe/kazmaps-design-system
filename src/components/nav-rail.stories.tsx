import type { Meta, StoryObj } from "@storybook/react-vite";
import { MapPin, Plus, Route } from "lucide-react";
import { useState } from "react";

import { Cases } from "./cases";
import { NavRail } from "./nav-rail";

const meta: Meta<typeof NavRail> = {
  title: "Components/NavRail",
  component: NavRail,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="NavRail" /> };

export const Playground: StoryObj<typeof NavRail> = {
  args: { label: "Разделы" },
  argTypes: {
    items: { table: { disable: true } },
    secondaryItems: { table: { disable: true } },
    activeId: { table: { disable: true } },
  },
  render: function Render(args) {
    const [activeId, setActiveId] = useState<string | null>("search");
    const item = (id: string, label: string, icon: React.ReactNode) => ({
      id,
      label,
      icon,
      onSelect: () => {
        setActiveId(id);
      },
    });
    return (
      <NavRail
        {...args}
        activeId={activeId}
        items={[
          item("search", "Поиск", <MapPin size={20} aria-hidden="true" />),
          item("routes", "Маршруты", <Route size={20} aria-hidden="true" />),
        ]}
        secondaryItems={[item("install", "Установить", <Plus size={20} aria-hidden="true" />)]}
      />
    );
  },
};
