import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Input> = {
  globals: { brand: "business" },
  title: "Atoms/Input",
  component: Input,
};
export default meta;
export const States: StoryObj<typeof Input> = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input label="Название" placeholder="ТОО Ромашка" />
      <Input label="БИН" mask="bin" hint="12 цифр" />
      <Input label="Email" error="Неверный формат" defaultValue="not-an-email" />
      <Input label="Пароль" type="password" revealable />
      <Input label="Недоступно" disabled placeholder="disabled" />
    </div>
  ),
};
