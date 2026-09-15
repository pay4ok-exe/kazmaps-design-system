import type { Meta, StoryObj } from "@storybook/react-vite";

import { Caption } from "./caption";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Caption> = {
  globals: { brand: "business" },
  title: "Atoms/Caption",
  component: Caption,
};
export default meta;
export const Default: StoryObj<typeof Caption> = { render: () => <Caption>Раздел</Caption> };
