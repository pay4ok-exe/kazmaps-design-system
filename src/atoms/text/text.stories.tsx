import type { Meta, StoryObj } from "@storybook/react-vite";

import { Text } from "./text";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Text> = {
  globals: { brand: "business" },
  title: "Atoms/Text",
  component: Text,
};
export default meta;
export const Colors: StoryObj<typeof Text> = {
  render: () => (
    <div className="flex flex-col gap-1">
      <Text color="default">Обычный текст</Text>
      <Text color="muted">Приглушённый</Text>
      <Text color="error">Ошибка</Text>
      <Text color="success">Успех</Text>
    </div>
  ),
};
