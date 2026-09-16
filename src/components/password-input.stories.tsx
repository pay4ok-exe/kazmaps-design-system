import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import { Cases } from "./cases";
import { PasswordInput } from "./password-input";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/PasswordInput",
  component: PasswordInput,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="PasswordInput" /> };

export const Playground: StoryObj<typeof PasswordInput> = {
  args: { label: "Пароль", value: "secret", invalid: false, disabled: false },
  argTypes: { onChange: { table: { disable: true } }, prefix: { table: { disable: true } } },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-[328px]">
        <PasswordInput
          {...args}
          onChange={(value) => {
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
};
