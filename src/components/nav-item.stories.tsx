import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconSearchBold, IconSearchLight } from "../icons/generated";
import { NavItem } from "./nav-item";
import { NAV_ITEM_STATE } from "./nav-item.states";

const meta: Meta<typeof NavItem> = {
  title: "Components/NavItem",
  component: NavItem,
};
export default meta;

const noop = () => undefined;

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-16)">
      <p className="max-w-[620px] text-xs leading-(--typography-line-height-16) text-(color:--text-secondary)">
        _Tab Action из макета: плашка 32 с радиусом 10, глиф 20, подпись 10/12. Вес глифа меняется
        вместе с состоянием — light у неактивной вкладки и наведения, bold у активной. Колонка Hover
        нарисована ролью: статикой псевдокласс не показать.
      </p>
      <div className="flex items-start gap-(--spacing-gap-24)">
        {[
          {
            caption: "Inactive",
            node: (
              <NavItem
                label="Поиск"
                icon={<IconSearchLight size={20} />}
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
                icon={<IconSearchLight size={20} />}
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
                icon={<IconSearchBold size={20} />}
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
    </div>
  ),
};

export const Playground: StoryObj<typeof NavItem> = {
  args: { label: "Поиск", active: false, selection: "current" },
  argTypes: {
    selection: { control: "inline-radio", options: ["current", "pressed"] },
    icon: { table: { disable: true } },
    onSelect: { table: { disable: true } },
  },
  render: (args) => (
    <NavItem
      {...args}
      icon={args.active ? <IconSearchBold size={20} /> : <IconSearchLight size={20} />}
    />
  ),
};
