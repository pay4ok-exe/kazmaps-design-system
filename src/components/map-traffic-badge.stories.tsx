import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { MapTrafficBadge, type TrafficLevel } from "./map-traffic-badge";

const meta: Meta<typeof MapTrafficBadge> = {
  title: "Components/MapTrafficBadge",
  component: MapTrafficBadge,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="MapTrafficBadge" /> };

type TrafficArgs = { level: TrafficLevel | "off"; value: number; label: string };

export const Playground: StoryObj<TrafficArgs> = {
  args: { level: "orange", value: 6, label: "Пробки" },
  argTypes: {
    level: { control: "inline-radio", options: ["green", "yellow", "orange", "red", "off"] },
    value: { control: { type: "range", min: 0, max: 10, step: 1 } },
  },
  render: ({ level, ...args }) => (
    <MapTrafficBadge {...args} level={level === "off" ? null : level} />
  ),
};
