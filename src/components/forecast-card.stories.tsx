import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sun } from "lucide-react";

import { Cases } from "./cases";
import { ForecastCard } from "./forecast-card";

const meta: Meta<typeof ForecastCard> = {
  title: "Components/ForecastCard",
  component: ForecastCard,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="ForecastCard" /> };

export const Playground: StoryObj<typeof ForecastCard> = {
  args: { title: "14:00", day: "", temperature: "+20°", precipitation: "0%", current: true },
  argTypes: { icon: { table: { disable: true } } },
  render: ({ day, ...args }) => (
    <ForecastCard
      {...args}
      day={day === "" ? undefined : day}
      icon={<Sun size={32} aria-hidden="true" className="text-(color:--weather-sun)" />}
    />
  ),
};
