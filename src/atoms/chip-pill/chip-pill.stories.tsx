import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChipPill } from "./chip-pill";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof ChipPill> = {
  globals: { brand: "business" },
  title: "Atoms/ChipPill",
  component: ChipPill,
};
export default meta;
export const Row: StoryObj<typeof ChipPill> = {
  render: () => (
    <div className="flex gap-2">
      <ChipPill label="Все" selected />
      <ChipPill label="Салоны" />
      <ChipPill label="Клиники" disabled />
    </div>
  ),
};
