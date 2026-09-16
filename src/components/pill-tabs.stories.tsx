import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { PillTabs, type PillTabsSize } from "./pill-tabs";

const meta: Meta<typeof PillTabs> = {
  title: "Components/PillTabs",
  component: PillTabs,
};
export default meta;

const OPTIONS = [
  { id: "map", label: "Карта" },
  { id: "list", label: "Список" },
  { id: "photo", label: "Фото" },
];

function Live({ size, count }: { size: PillTabsSize; count: number }) {
  const [activeId, setActiveId] = useState("map");
  return (
    <PillTabs
      label="Вид"
      size={size}
      activeId={activeId}
      onSelect={setActiveId}
      options={OPTIONS.slice(0, count)}
    />
  );
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex w-[368px] flex-col gap-(--spacing-gap-24)">
      <section className="flex flex-col gap-(--spacing-gap-8)">
        <div>
          <h3 className="text-xs text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
            default
          </h3>
          <p className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
            Toggle Switch из раздела Essential: высота 40, радиусы 12 и 10, текст 16/20
          </p>
        </div>
        <Live size="default" count={2} />
      </section>
      <section className="flex flex-col gap-(--spacing-gap-8)">
        <div>
          <h3 className="text-xs text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
            menu
          </h3>
          <p className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
            Menu Toggle Switch из раздела Map HUD: высота 34, радиусы 8 и 6, текст 14/18
          </p>
        </div>
        <div className="w-[224px]">
          <Live size="menu" count={3} />
        </div>
      </section>
    </div>
  ),
};

export const Playground: StoryObj<typeof PillTabs> = {
  args: { label: "Вид", size: "default" },
  argTypes: {
    size: { control: "inline-radio", options: ["default", "menu"] },
    options: { table: { disable: true } },
    activeId: { table: { disable: true } },
    onSelect: { table: { disable: true } },
  },
  render: function Render(args) {
    const [activeId, setActiveId] = useState("map");
    return (
      <div className="w-[368px]">
        <PillTabs {...args} activeId={activeId} onSelect={setActiveId} options={OPTIONS} />
      </div>
    );
  },
};
