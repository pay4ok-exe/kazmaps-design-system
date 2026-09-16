import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sun } from "lucide-react";

import { Cases } from "./cases";
import { WeatherBadge } from "./weather-badge";

const meta: Meta<typeof WeatherBadge> = {
  title: "Components/WeatherBadge",
  component: WeatherBadge,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="WeatherBadge" /> };

export const Playground: StoryObj<typeof WeatherBadge> = {
  args: { temperature: "18", "aria-label": "Погода" },
  argTypes: { icon: { table: { disable: true } } },
  render: (args) => (
    <WeatherBadge
      {...args}
      icon={<Sun size={20} aria-hidden="true" className="text-(color:--weather-sun)" />}
    />
  ),
};
