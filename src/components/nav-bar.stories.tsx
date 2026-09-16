import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconBookmarkBold,
  IconBookmarkLight,
  IconPhoneAndTabletBold,
  IconPhoneAndTabletLight,
  IconRouteBold,
  IconRouteLight,
  IconSearchBold,
  IconSearchLight,
  IconUsersThreeBold,
  IconUsersThreeLight,
} from "../icons/generated";
import { NavBar } from "./nav-bar";
import { NavItem } from "./nav-item";
import { NAV_ITEM_STATE } from "./nav-item.states";

const meta: Meta<typeof NavBar> = {
  title: "Components/NavBar",
  component: NavBar,
};
export default meta;

const noop = () => undefined;

// Вес глифа в макете меняется вместе с состоянием: light у неактивной вкладки
// и наведения, bold у активной.
const ITEMS = [
  {
    id: "search",
    label: "Поиск",
    icon: <IconSearchLight size={20} />,
    activeIcon: <IconSearchBold size={20} />,
  },
  {
    id: "routes",
    label: "Маршруты",
    icon: <IconRouteLight size={20} />,
    activeIcon: <IconRouteBold size={20} />,
  },
  {
    id: "friends",
    label: "Друзья",
    icon: <IconUsersThreeLight size={20} />,
    activeIcon: <IconUsersThreeBold size={20} />,
  },
  {
    id: "bookmarks",
    label: "Избранные",
    icon: <IconBookmarkLight size={20} />,
    activeIcon: <IconBookmarkBold size={20} />,
  },
];

const SECONDARY = [
  {
    id: "install",
    label: "Установить",
    icon: <IconPhoneAndTabletLight size={20} />,
    activeIcon: <IconPhoneAndTabletBold size={20} />,
  },
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
                <NavItem
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
                <NavItem
                  label="Поиск"
                  icon={ITEMS[0].icon}
                  active={false}
                  selection="current"
                  onSelect={noop}
                  className={NAV_ITEM_STATE.hoverPreview}
                />
              ),
            },
            {
              caption: "Active",
              node: (
                <NavItem
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
