import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, type ButtonVariant } from "./button";

const VARIANTS: ButtonVariant[] = [
  "primary",
  "brand",
  "secondary",
  "outline",
  "ghost",
  "danger",
  "warning",
  "dark",
  "cta",
  "gold",
  "link",
];

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Button> = {
  globals: { brand: "business" },
  title: "Atoms/Button",
  component: Button,
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = { args: { children: "Кнопка", variant: "brand", size: "md" } };
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {VARIANTS.map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <Button key={s} size={s} variant="brand">
          {s}
        </Button>
      ))}
    </div>
  ),
};
export const Loading: Story = { args: { children: "Сохранить", loading: true, variant: "brand" } };
