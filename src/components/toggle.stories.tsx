import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import { Cases } from "./cases";
import { Toggle } from "./toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="Toggle" /> };

export const Playground: StoryObj<typeof Toggle> = {
  args: { label: "Уведомления", checked: true, disabled: false },
  argTypes: { onChange: { table: { disable: true } } },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Toggle
        {...args}
        onChange={(checked) => {
          updateArgs({ checked });
        }}
      />
    );
  },
};
