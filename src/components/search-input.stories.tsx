import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import { Cases } from "./cases";
import { SearchInput, type SearchInputProps } from "./search-input";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="SearchInput" /> };

type SearchInputArgs = SearchInputProps & { submit: boolean };

export const Playground: StoryObj<SearchInputArgs> = {
  args: { value: "", placeholder: "Поиск", compact: false, submit: false, submitLabel: "Найти" },
  argTypes: {
    onChange: { table: { disable: true } },
    onSubmit: { table: { disable: true } },
    suffix: { table: { disable: true } },
  },
  render: function Render({ submit, ...args }) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-[328px]">
        <SearchInput
          {...args}
          onSubmit={submit ? () => undefined : undefined}
          onChange={(value) => {
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
};
