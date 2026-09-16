import type { Meta, StoryObj } from "@storybook/react-vite";
import { Coffee } from "lucide-react";

import { Cases } from "./cases";
import { Chip, type ChipProps } from "./chip";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="Chip" /> };

type ChipArgs = ChipProps & { withIcon: boolean };

export const Playground: StoryObj<ChipArgs> = {
  args: { label: "Кафе", tone: "neutral", active: false, withIcon: false },
  argTypes: {
    tone: { control: "inline-radio", options: ["neutral", "info"] },
    icon: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  render: ({ withIcon, ...args }) => (
    <Chip {...args} icon={withIcon ? <Coffee size={16} aria-hidden="true" /> : undefined} />
  ),
};
