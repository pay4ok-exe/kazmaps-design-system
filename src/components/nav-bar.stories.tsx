import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bookmark, MapPin, Plus, Route, Users } from "lucide-react";

import { NavBar } from "./nav-bar";
import { TabAction } from "./tab-action";
import { TAB_ACTION_STATE } from "./tab-action.states";

const meta: Meta<typeof NavBar> = {
  title: "Components/NavBar",
  component: NavBar,
};
export default meta;

const noop = () => undefined;

const ITEMS = [
  { id: "search", label: "Поиск", icon: <MapPin size={20} aria-hidden="true" /> },
  { id: "routes", label: "Маршруты", icon: <Route size={20} aria-hidden="true" /> },
  { id: "friends", label: "Друзья", icon: <Users size={20} aria-hidden="true" /> },
  { id: "bookmarks", label: "Избранные", icon: <Bookmark size={20} aria-hidden="true" /> },
];

const SECONDARY = [
  { id: "install", label: "Установить", icon: <Plus size={20} aria-hidden="true" /> },
];

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-24)">
      <section className="flex flex-col gap-(--spacing-gap-8)">
        <h3 className="text-xs text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
          Кнопка вкладки
        </h3>
        <p className="max-w-[560px] text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
          Колонка Hover нарисована ролью, а не настоящим наведением: статикой псевдокласс не
          показать. Роли берутся из того же модуля, что и в компоненте.
        </p>
        <div className="flex items-start gap-(--spacing-gap-16)">
          {[
            {
              caption: "Inactive",
              node: (
                <TabAction
                  label="Поиск"
                  icon={ITEMS[0].icon}
                  active={false}
                  selection="current"
                  onSelect={noop}
                />
              ),
            },
            {
              caption: "Hover",
              node: (
                <TabAction
                  label="Поиск"
                  icon={ITEMS[0].icon}
                  active={false}
                  selection="current"
                  onSelect={noop}
                  className={TAB_ACTION_STATE.hoverPreview}
                />
              ),
            },
            {
              caption: "Active",
              node: (
                <TabAction
                  label="Поиск"
                  icon={ITEMS[0].icon}
                  active
                  selection="current"
                  onSelect={noop}
                />
              ),
            },
          ].map(({ caption, node }) => (
            <div key={caption} className="flex flex-col items-center gap-(--spacing-gap-4)">
              {node}
              <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
                {caption}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-(--spacing-gap-8)">
        <h3 className="text-xs text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
          Панель
        </h3>
        <p className="max-w-[560px] text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
          Нажмите любую вкладку — панель сама её отмечает. В макете это четыре варианта набора «Nav
          bar», по одному на активную вкладку.
        </p>
        <div className="h-[420px] w-fit">
          <NavBar
            label="Разделы"
            defaultActiveId="search"
            items={ITEMS.map((i) => ({ ...i, onSelect: noop }))}
            secondaryItems={SECONDARY.map((i) => ({ ...i, onSelect: noop }))}
          />
        </div>
      </section>
    </div>
  ),
};

export const Playground: StoryObj<typeof NavBar> = {
  args: { label: "Разделы", defaultActiveId: "search" },
  argTypes: {
    defaultActiveId: { control: "inline-radio", options: ITEMS.map((i) => i.id) },
    items: { table: { disable: true } },
    secondaryItems: { table: { disable: true } },
    activeId: { table: { disable: true } },
  },
  render: (args) => (
    <div className="h-[420px]">
      <NavBar
        {...args}
        key={args.defaultActiveId}
        items={ITEMS.map((i) => ({ ...i, onSelect: noop }))}
        secondaryItems={SECONDARY.map((i) => ({ ...i, onSelect: noop }))}
      />
    </div>
  ),
};
