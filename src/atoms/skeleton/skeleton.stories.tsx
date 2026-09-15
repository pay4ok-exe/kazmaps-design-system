import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton } from "./skeleton";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Skeleton> = {
  globals: { brand: "business" },
  title: "Atoms/Skeleton",
  component: Skeleton,
};
export default meta;
export const CardShape: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};
