import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { IconDarkLight } from "../icons/generated";
import { MenuTabs } from "./menu-tabs";

const meta: Meta<typeof MenuTabs> = {
  title: "Components/MenuTabs",
  component: MenuTabs,
};
export default meta;

const OPTIONS = [
  { id: "auto", label: "Авто" },
  { id: "light", label: "Светлая" },
  { id: "dark", label: "Тёмная" },
];

function Live({ icon }: { icon?: boolean }) {
  const [activeId, setActiveId] = useState("auto");
  return (
    <div className="w-[224px]">
      <MenuTabs
        title="Тема карты"
        icon={icon === true ? <IconDarkLight size={16} /> : undefined}
        options={OPTIONS}
        activeId={activeId}
        onSelect={setActiveId}
      />
    </div>
  );
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-24)">
      <p className="max-w-[520px] text-xs leading-(--typography-line-height-16) text-(color:--text-secondary)">
        Menu Toggle Item из раздела Map HUD: заголовок 12/16 весом 500, иконка 16 справа, зазор 4 и
        компактные пилюли. Всего 62 в высоту.
      </p>
      <div className="flex items-start gap-(--spacing-gap-24)">
        <div className="flex flex-col items-center gap-(--spacing-gap-8)">
          <Live icon />
          <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
            С иконкой
          </span>
        </div>
        <div className="flex flex-col items-center gap-(--spacing-gap-8)">
          <Live />
          <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
            Без иконки
          </span>
        </div>
      </div>
    </div>
  ),
};

export const Playground: StoryObj<typeof MenuTabs> = {
  args: { title: "Тема карты" },
  argTypes: {
    icon: { table: { disable: true } },
    options: { table: { disable: true } },
    activeId: { table: { disable: true } },
    onSelect: { table: { disable: true } },
  },
  render: function Render(args) {
    const [activeId, setActiveId] = useState("auto");
    return (
      <div className="w-[224px]">
        <MenuTabs
          {...args}
          icon={<IconDarkLight size={16} />}
          options={OPTIONS}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>
    );
  },
};
