import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./checkbox";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Checkbox> = {
  globals: { brand: "business" },
  title: "Atoms/Checkbox",
  component: Checkbox,
};
export default meta;
export const States: StoryObj<typeof Checkbox> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox label="По умолчанию" />
      <Checkbox label="Отмечен" defaultChecked />
      <Checkbox label="Недоступен" disabled />
    </div>
  ),
};
