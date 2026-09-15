import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SegmentedControl } from "./segmented-control";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof SegmentedControl> = {
  globals: { brand: "business" },
  title: "Molecules/SegmentedControl",
  component: SegmentedControl,
};
export default meta;
export const Interactive: StoryObj<typeof SegmentedControl> = {
  render: function Render() {
    const [v, setV] = useState("day");
    return (
      <SegmentedControl
        options={[
          { value: "day", label: "День" },
          { value: "week", label: "Неделя" },
          { value: "month", label: "Месяц" },
        ]}
        value={v}
        onChange={setV}
      />
    );
  },
};
