import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchInput } from "./search-input";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof SearchInput> = {
  globals: { brand: "business" },
  title: "Molecules/SearchInput",
  component: SearchInput,
};
export default meta;
export const Interactive: StoryObj<typeof SearchInput> = {
  render: function Render() {
    const [q, setQ] = useState("");
    return <SearchInput value={q} onChange={setQ} placeholder="Поиск по филиалам" shortcut="⌘K" />;
  },
};
