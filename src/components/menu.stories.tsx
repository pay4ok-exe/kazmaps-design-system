import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  IconBookmarkBold,
  IconBookmarkLight,
  IconBusinessLight,
  IconLogout,
  IconNotificationLight,
  IconSettings,
  IconStarLight,
  IconSupport,
  IconTerminalLight,
  IconUsersThreeLight,
} from "../icons/generated";
import { Menu, MenuDivider } from "./menu";
import { MenuItem } from "./menu-item";

const meta: Meta<typeof Menu> = { title: "Components/Menu", component: Menu };
export default meta;

const noop = () => undefined;

function Profile() {
  return (
    <Menu label="Профиль">
      <MenuItem
        icon={<IconBookmarkLight size={20} />}
        label="Избранные места"
        count={5}
        onSelect={noop}
      />
      <MenuItem
        icon={<IconStarLight size={20} />}
        label="Отзывы о локациях"
        count={2}
        onSelect={noop}
      />
      <MenuItem icon={<IconBusinessLight size={20} />} label="Организации" onSelect={noop} />
      <MenuItem
        icon={<IconUsersThreeLight size={20} />}
        label="Друзья и чаты"
        count={3}
        unread
        onSelect={noop}
      />
      <MenuItem
        icon={<IconNotificationLight size={20} />}
        label="Уведомления"
        count={16}
        unread
        onSelect={noop}
      />
      <MenuItem icon={<IconSupport size={20} />} label="Поддержка" count={1} onSelect={noop} />
      <MenuDivider />
      <MenuItem icon={<IconSettings size={20} />} label="Настройки аккаунта" onSelect={noop} />
      <MenuItem icon={<IconLogout size={20} />} label="Выйти из аккаунта" onSelect={noop} />
    </Menu>
  );
}

function Services() {
  return (
    <Menu label="Сервисы">
      <MenuItem
        icon={<IconBusinessLight size={20} />}
        label="Для бизнеса"
        chevron
        onSelect={noop}
      />
      <MenuItem
        icon={<IconTerminalLight size={20} />}
        label="Для разработчиков"
        chevron
        onSelect={noop}
      />
      <MenuDivider />
      <MenuItem icon={<IconSupport size={20} />} label="Недоступно" chevron disabled />
    </Menu>
  );
}

function Layers() {
  const [activeId, setActiveId] = useState("favourites");
  const rows = [
    { id: "favourites", label: "Избранное" },
    { id: "reviews", label: "Отзывы" },
    { id: "friends", label: "Друзья" },
  ];
  return (
    <Menu label="Слои">
      {rows.map((row) => (
        <MenuItem
          key={row.id}
          icon={<IconBookmarkLight size={20} />}
          activeIcon={<IconBookmarkBold size={20} />}
          label={row.label}
          active={row.id === activeId}
          onSelect={() => {
            setActiveId(row.id);
          }}
        />
      ))}
    </Menu>
  );
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-16)">
      <p className="max-w-[640px] text-xs leading-(--typography-line-height-16) text-(color:--text-secondary)">
        Одна оболочка на три типа пункта из макета: Profile Menu Item со счётчиком и точкой,
        Servises Menu Item с шевроном, Layers Menu Item с жирным глифом у активного. Наведите курсор
        — фон пункта уходит в background/secondary. В слоях нажмите пункт, он переключится.
      </p>
      <div className="flex items-start gap-(--spacing-gap-24)">
        {(
          [
            { caption: "Профиль", node: <Profile /> },
            { caption: "Сервисы", node: <Services /> },
            { caption: "Слои", node: <Layers /> },
          ] as const
        ).map(({ caption, node }) => (
          <div key={caption} className="flex flex-col items-center gap-(--spacing-gap-8)">
            {node}
            <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
              {caption}
            </span>
          </div>
        ))}
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
