import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { EmptyState } from "./empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="EmptyState" /> };

export const Playground: StoryObj<typeof EmptyState> = {
  args: { title: "Пусто", description: "Здесь пока ничего нет" },
  argTypes: { children: { table: { disable: true } } },
};
