import type { Meta, StoryObj } from "@storybook/react-vite";

import { Divider } from "./divider";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Divider> = {
  globals: { brand: "business" },
  title: "Atoms/Divider",
  component: Divider,
};
export default meta;
export const Plain: StoryObj<typeof Divider> = { render: () => <Divider /> };
export const Labeled: StoryObj<typeof Divider> = { render: () => <Divider label="или" /> };
