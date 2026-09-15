import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ThemeToggle, type Theme } from "./theme-toggle";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof ThemeToggle> = {
  globals: { brand: "business" },
  title: "Molecules/ThemeToggle",
  component: ThemeToggle,
};
export default meta;
export const Interactive: StoryObj<typeof ThemeToggle> = {
  render: function Render() {
    const [theme, setTheme] = useState<Theme>("dark");
    return <ThemeToggle theme={theme} onToggle={setTheme} />;
  },
};
