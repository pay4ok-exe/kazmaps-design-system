import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import { Cases } from "./cases";
import { SearchInput } from "./search-input";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="SearchInput" /> };

export const Playground: StoryObj<typeof SearchInput> = {
  args: { value: "", placeholder: "Поиск" },
  argTypes: { onChange: { table: { disable: true } } },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-[328px]">
        <SearchInput
          {...args}
          onChange={(value) => {
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
};
