import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { Panel } from "./panel";

const meta: Meta<typeof Panel> = {
  title: "Components/Panel",
  component: Panel,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="Panel" /> };

export const Playground: StoryObj<typeof Panel> = {
  args: { variant: "flush" },
  argTypes: {
    variant: { control: "inline-radio", options: ["flush"] },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <Panel {...args}>
      <div className="p-3">Панель</div>
    </Panel>
  ),
};
