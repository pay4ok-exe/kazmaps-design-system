import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  IconDimensionBold,
  IconDimensionLight,
  IconNavigateRightBold,
  IconPlus,
} from "../icons/generated";
import { IconButton } from "./icon-button";
import { ICON_BUTTON_STATE } from "./icon-button.states";

const meta: Meta<typeof IconButton> = {
  title: "Maps kit/IconButton",
  component: IconButton,
  globals: { brand: "maps" },
};
export default meta;

const TYPES = [
  {
    name: "Default",
    label: "Приблизить",
    glyph: () => <IconPlus />,
    activeGlyph: () => <IconPlus />,
    note: "в макете Default и Hover переставлены местами — иконка там светлеет на наведении; воспроизведён порядок двух других типов, см. docs/figma-deltas.md, пункт 13",
  },
  {
    name: "Dimension",
    label: "Размерность",
    glyph: () => <IconDimensionLight />,
    activeGlyph: () => <IconDimensionBold />,
    note: "в active меняется ГЛИФ: 2D → 3D",
  },
  {
    name: "Locate",
    label: "Моё местоположение",
    glyph: () => <IconNavigateRightBold />,
    activeGlyph: () => <IconNavigateRightBold />,
    note: "глиф один на все состояния",
  },
];

function Cell({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-(--spacing-gap-4)">
      {children}
      <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
        {caption}
      </span>
    </div>
  );
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-24)">
      <p className="max-w-[620px] text-xs leading-(--typography-line-height-16) text-(color:--text-secondary)">
        Колонка Hover нарисована ролью, а не настоящим наведением: статикой псевдокласс не показать.
        Роли сверяются с компонентом тестом, разъехаться не смогут — наведите курсор, чтобы увидеть
        то же вживую.
      </p>
      {TYPES.map((type) => (
        <section key={type.name} className="flex flex-col gap-(--spacing-gap-8)">
          <div>
            <h3 className="text-xs text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
              {type.name}
            </h3>
            <p className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
              {type.note}
            </p>
          </div>
          <div className="flex items-center gap-(--spacing-gap-16)">
            <Cell caption="Default">
              <IconButton label={type.label}>{type.glyph()}</IconButton>
            </Cell>
            <Cell caption="Hover">
              <IconButton label={type.label} className={ICON_BUTTON_STATE.hoverPreview}>
                {type.glyph()}
              </IconButton>
            </Cell>
            <Cell caption="Active">
              <IconButton label={type.label} active>
                {type.activeGlyph()}
              </IconButton>
            </Cell>
          </div>
        </section>
      ))}
    </div>
  ),
};

export const Playground: StoryObj<typeof IconButton> = {
  args: { label: "Приблизить", active: false, children: <IconPlus /> },
};
