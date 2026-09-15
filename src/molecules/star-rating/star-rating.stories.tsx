import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { StarRating } from "./star-rating";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof StarRating> = {
  globals: { brand: "business" },
  title: "Molecules/StarRating",
  component: StarRating,
};
export default meta;

export const Display: StoryObj<typeof StarRating> = {
  args: { value: 4 },
};

export const Interactive: StoryObj<typeof StarRating> = {
  render: function Render() {
    const [v, setV] = useState(3);
    return <StarRating value={v} onChange={setV} size="lg" />;
  },
};
