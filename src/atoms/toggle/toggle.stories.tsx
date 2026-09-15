import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Toggle } from "./toggle";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Toggle> = {
  globals: { brand: "business" },
  title: "Atoms/Toggle",
  component: Toggle,
};
export default meta;
export const Interactive: StoryObj<typeof Toggle> = {
  render: function Render() {
    const [on, setOn] = useState(false);
    return <Toggle checked={on} onChange={setOn} label="Уведомления" />;
  },
};
