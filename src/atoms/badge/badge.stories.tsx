import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, type BadgeVariant } from "./badge";

const VARIANTS: BadgeVariant[] = [
  "default",
  "neutral",
  "primary",
  "secondary",
  "brand",
  "success",
  "warning",
  "error",
  "info",
];

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Badge> = {
  globals: { brand: "business" },
  title: "Atoms/Badge",
  component: Badge,
};
export default meta;
export const AllVariants: StoryObj<typeof Badge> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {VARIANTS.map((v) => (
        <Badge key={v} variant={v}>
          {v}
        </Badge>
      ))}
    </div>
  ),
};
