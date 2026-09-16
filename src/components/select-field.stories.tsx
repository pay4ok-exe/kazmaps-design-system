import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import { Cases } from "./cases";
import { SelectField } from "./select-field";

const meta: Meta<typeof SelectField> = {
  title: "Components/SelectField",
  component: SelectField,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="SelectField" /> };

export const Playground: StoryObj<typeof SelectField> = {
  args: { label: "Город", value: "almaty", bordered: false, disabled: false },
  argTypes: { options: { table: { disable: true } }, onChange: { table: { disable: true } } },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <SelectField
        {...args}
        options={[
          { value: "almaty", label: "Алматы" },
          { value: "astana", label: "Астана" },
        ]}
        onChange={(value) => {
          updateArgs({ value });
        }}
      />
    );
  },
};
