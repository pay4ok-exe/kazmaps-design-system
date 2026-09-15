import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "./select";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof Select> = {
  globals: { brand: "business" },
  title: "Atoms/Select",
  component: Select,
};
export default meta;
export const Interactive: StoryObj<typeof Select> = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="w-72">
        <Select
          label="Город"
          placeholder="Выберите город"
          value={value}
          onChange={setValue}
          options={[
            { value: "almaty", label: "Алматы" },
            { value: "astana", label: "Астана" },
            { value: "shymkent", label: "Шымкент" },
          ]}
        />
      </div>
    );
  },
};
export const WithError: StoryObj<typeof Select> = {
  render: () => (
    <div className="w-72">
      <Select label="Категория" error="Обязательное поле" options={[{ value: "x", label: "X" }]} />
    </div>
  ),
};
