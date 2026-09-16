import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { Chip } from "./chip";
import { SectionHeader } from "./section-header";

const meta: Meta<typeof SectionHeader> = {
  title: "Components/SectionHeader",
  component: SectionHeader,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="SectionHeader" /> };

type SectionHeaderArgs = { children: React.ReactNode; withAction: boolean };

export const Playground: StoryObj<SectionHeaderArgs> = {
  args: { children: "Рядом", withAction: false },
  render: ({ withAction, ...args }) => (
    <div className="w-[328px]">
      <SectionHeader {...args} action={withAction ? <Chip label="Все" /> : undefined} />
    </div>
  ),
};
