import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs } from "./tabs";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Tabs> = {
  globals: { brand: "business" },
  title: "Molecules/Tabs",
  component: Tabs,
};
export default meta;
export const Interactive: StoryObj<typeof Tabs> = {
  render: function Render() {
    const [tab, setTab] = useState("services");
    return (
      <Tabs
        items={[
          { key: "services", label: "Услуги" },
          { key: "reviews", label: "Отзывы" },
          { key: "about", label: "О компании" },
        ]}
        value={tab}
        onChange={setTab}
      />
    );
  },
};
