import type { Meta, StoryObj } from "@storybook/react-vite";

import { Heading } from "./heading";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Heading> = {
  globals: { brand: "business" },
  title: "Atoms/Heading",
  component: Heading,
};
export default meta;
export const Sizes: StoryObj<typeof Heading> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Heading as="h1" size="xl">
        Размер xl
      </Heading>
      <Heading as="h2" size="lg">
        Размер lg
      </Heading>
      <Heading as="h3" size="md">
        Размер md
      </Heading>
      <Heading as="h4" size="sm">
        Размер sm
      </Heading>
    </div>
  ),
};
