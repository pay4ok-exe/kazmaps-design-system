import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import { TextInput } from "./text-input";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
};
export default meta;

const noop = () => undefined;

function Cell({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className="flex w-[328px] flex-col gap-(--spacing-gap-4)">
      {children}
      <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
        {caption}
      </span>
    </div>
  );
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-16)">
      <p className="max-w-[620px] text-xs leading-(--typography-line-height-16) text-(color:--text-secondary)">
        Hover and Focus are real states: hover the field or click into it. Error is the only state
        with a permanent ring; the error text itself goes to a toast.
      </p>
      <Cell caption="Default">
        <TextInput value="" onChange={noop} placeholder="yourmail@example.com" />
      </Cell>
      <Cell caption="Filled">
        <TextInput value="yourmail@example.com" onChange={noop} />
      </Cell>
      <Cell caption="Error">
        <TextInput value="yourmail@example.com" onChange={noop} invalid />
      </Cell>
      <Cell caption="With label">
        <TextInput label="E-mail" value="" onChange={noop} placeholder="yourmail@example.com" />
      </Cell>
      <Cell caption="Disabled">
        <TextInput value="" onChange={noop} placeholder="yourmail@example.com" disabled />
      </Cell>
    </div>
  ),
};

export const Playground: StoryObj<typeof TextInput> = {
  args: {
    label: "E-mail",
    value: "",
    placeholder: "yourmail@example.com",
    invalid: false,
    disabled: false,
    type: "text",
  },
  argTypes: {
    type: { control: "inline-radio", options: ["text", "email", "number"] },
    onChange: { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-[328px]">
        <TextInput
          {...args}
          onChange={(value) => {
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
};
