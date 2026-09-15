import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Chip } from "./chip";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Chip> = {
  globals: { brand: "business" },
  title: "Atoms/Chip",
  component: Chip,
};
export default meta;
export const Interactive: StoryObj<typeof Chip> = {
  render: function Render() {
    const [active, setActive] = useState(false);
    return <Chip label="Wi-Fi" active={active} onToggle={setActive} />;
  },
};
