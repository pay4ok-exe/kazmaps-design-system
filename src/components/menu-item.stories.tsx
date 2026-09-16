import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconBookmarkBold, IconBookmarkLight, IconUsersThreeLight } from "../icons/generated";
import { Menu } from "./menu";
import { MenuItem } from "./menu-item";
import { MENU_ITEM_STATE } from "./menu-item.states";

const meta: Meta<typeof MenuItem> = {
  title: "Components/MenuItem",
  component: MenuItem,
};
export default meta;

const noop = () => undefined;
const glyph = <IconBookmarkLight size={20} />;

function Row({
  caption,
  note,
  children,
}: {
  caption: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-(--spacing-gap-4)">
      <div>
        <h3 className="text-xs text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
          {caption}
        </h3>
        {note === undefined ? null : (
          <p className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
            {note}
          </p>
        )}
      </div>
      <Menu label={caption}>{children}</Menu>
    </section>
  );
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-24)">
      <p className="max-w-[620px] text-xs leading-(--typography-line-height-16) text-(color:--text-secondary)">
        Наведение нарисовано ролью, а не настоящим курсором: статикой псевдокласс не показать. Роли
        берутся из того же модуля, что и в компоненте, и сверяются тестом.
      </p>
      <div className="flex flex-wrap items-start gap-(--spacing-gap-24)">
        <Row caption="Состояния">
          <MenuItem icon={glyph} label="Обычный" onSelect={noop} />
          <MenuItem
            icon={glyph}
            label="Наведение"
            onSelect={noop}
            className={MENU_ITEM_STATE.hoverPreview}
          />
          <MenuItem icon={glyph} label="Выключен" disabled />
        </Row>
        <Row caption="Хвост строки" note="счётчик, счётчик с непрочитанным, шеврон">
          <MenuItem icon={glyph} label="Избранные места" count={5} onSelect={noop} />
          <MenuItem
            icon={<IconUsersThreeLight size={20} />}
            label="Друзья и чаты"
            count={3}
            unread
            onSelect={noop}
          />
          <MenuItem icon={glyph} label="Для бизнеса" chevron onSelect={noop} />
        </Row>
        <Row caption="Активный" note="глиф меняется на жирный и красится акцентом">
          <MenuItem
            icon={glyph}
            activeIcon={<IconBookmarkBold size={20} />}
            label="Избранное"
            active
            onSelect={noop}
          />
          <MenuItem
            icon={glyph}
            activeIcon={<IconBookmarkBold size={20} />}
            label="Отзывы"
            onSelect={noop}
          />
        </Row>
      </div>
    </div>
  ),
};

export const Playground: StoryObj<typeof MenuItem> = {
  args: {
    label: "Друзья и чаты",
    count: 3,
    unread: true,
    chevron: false,
    active: false,
    disabled: false,
  },
  argTypes: {
    icon: { table: { disable: true } },
    activeIcon: { table: { disable: true } },
    onSelect: { table: { disable: true } },
  },
  render: (args) => (
    <Menu label="Меню">
      <MenuItem
        {...args}
        icon={<IconUsersThreeLight size={20} />}
        activeIcon={<IconBookmarkBold size={20} />}
      />
    </Menu>
  ),
};
