import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { REGIONS } from "../data/regions";
import { PhoneInput, type PhoneValue } from "./phone-input";

const meta: Meta<typeof PhoneInput> = { title: "Components/PhoneInput", component: PhoneInput };
export default meta;

export const AllVariants: StoryObj<typeof PhoneInput> = {
  render: () => (
    <div className="flex w-[340px] flex-col gap-4">
      <PhoneInput label="Пусто" />
      <PhoneInput label="Заполнено" defaultValue="+77012345678" />
      <PhoneInput label="Ошибка" defaultValue="+7701234" invalid />
    </div>
  ),
};

export const Playground: StoryObj<typeof PhoneInput> = {
  args: {
    label: "Номер телефона",
    defaultRegion: "KZ",
    locale: "ru",
    invalid: false,
    disabled: false,
    readOnly: false,
    required: false,
  },
  argTypes: {
    defaultRegion: { control: "select", options: REGIONS.map((r) => r.iso) },
    locale: { control: "inline-radio", options: ["ru", "en"] },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    regions: { table: { disable: true } },
    labels: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onRegionChange: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onBlur: { table: { disable: true } },
  },
  render: function Render(args) {
    const [value, setValue] = useState<PhoneValue | null>(null);
    return (
      <div className="flex w-[340px] flex-col gap-(--spacing-gap-12)">
        <PhoneInput key={args.defaultRegion} {...args} onChange={setValue} />
        <pre
          data-testid="readout"
          className="text-[12px] leading-(--typography-line-height-16) text-(color:--text-tertiary)"
        >
          {value ? JSON.stringify(value) : "onChange → здесь"}
        </pre>
      </div>
    );
  },
};
