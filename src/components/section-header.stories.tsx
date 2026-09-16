import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { SectionHeader } from "./section-header";

const meta: Meta<typeof SectionHeader> = {
  title: "Components/SectionHeader",
  component: SectionHeader,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="SectionHeader" /> };

export const Playground: StoryObj<typeof SectionHeader> = {
  args: { children: "Рядом" },
  argTypes: { action: { table: { disable: true } } },
  render: (args) => (
    <div className="w-[328px]">
      <SectionHeader {...args} />
    </div>
  ),
};
