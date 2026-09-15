import type { Meta, StoryObj } from "@storybook/react-vite";

import { ErrorBoundary } from "./error-boundary";

function Boom(): never {
  throw new Error("Не удалось загрузить блок");
}

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof ErrorBoundary> = {
  globals: { brand: "business" },
  title: "Molecules/ErrorBoundary",
  component: ErrorBoundary,
};
export default meta;
export const Caught: StoryObj<typeof ErrorBoundary> = {
  render: () => (
    <ErrorBoundary>
      <Boom />
    </ErrorBoundary>
  ),
};
