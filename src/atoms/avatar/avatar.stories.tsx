import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar } from "./avatar";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Avatar> = {
  globals: { brand: "business" },
  title: "Atoms/Avatar",
  component: Avatar,
};
export default meta;
export const Grid: StoryObj<typeof Avatar> = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Иван Петров" size="sm" />
      <Avatar name="Асель Нурланова" size="md" />
      <Avatar name="KazMaps" size="lg" shape="square" />
    </div>
  ),
};
