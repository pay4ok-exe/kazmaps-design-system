import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Cases } from "./cases";
import { CodeInput } from "./code-input";

const meta: Meta<typeof CodeInput> = {
  title: "Components/CodeInput",
  component: CodeInput,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="CodeInput" /> };

export const Playground: StoryObj<typeof CodeInput> = {
  args: { invalid: false, disabled: false, autoFocus: false },
  argTypes: {
    values: { table: { disable: true } },
    onChange: { table: { disable: true } },
    digitLabel: { table: { disable: true } },
  },
  render: function Render(args) {
    const [values, setValues] = useState(["", "", "", ""]);
    return (
      <CodeInput
        {...args}
        values={values}
        onChange={(index, digit) => {
          setValues((v) => v.map((d, i) => (i === index ? digit : d)));
        }}
      />
    );
  },
};
