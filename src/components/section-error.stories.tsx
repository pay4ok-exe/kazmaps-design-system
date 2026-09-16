import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { SectionError } from "./section-error";

const meta: Meta<typeof SectionError> = {
  title: "Components/SectionError",
  component: SectionError,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="SectionError" /> };

export const Playground: StoryObj<typeof SectionError> = {
  args: { message: "Не удалось загрузить", onRetry: () => undefined },
  argTypes: { onRetry: { table: { disable: true } } },
};
