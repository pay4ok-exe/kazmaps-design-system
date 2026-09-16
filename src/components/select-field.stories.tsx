import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { useState } from "react";

import { SelectField } from "./select-field";

const meta: Meta<typeof SelectField> = {
  title: "Components/SelectField",
  component: SelectField,
};
export default meta;

const CITIES = [
  { value: "almaty", label: "Алматы" },
  { value: "astana", label: "Астана" },
  { value: "shymkent", label: "Шымкент" },
  { value: "aktobe", label: "Актобе" },
  { value: "karaganda", label: "Караганда" },
];

function Live({ bordered, disabled }: { bordered?: boolean; disabled?: boolean }) {
  const [value, setValue] = useState("almaty");
  return (
    <div className="w-[160px]">
      <SelectField
        aria-label="Город"
        value={value}
        onChange={setValue}
        options={CITIES}
        bordered={bordered}
        disabled={disabled}
      />
    </div>
  );
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-16)">
      <p className="max-w-[620px] text-xs leading-(--typography-line-height-16) text-(color:--text-secondary)">
        Поле собрано без нативного select: список рисуется сам, ходит по стрелкам, выбирает Enter и
        закрывается Escape. Закрытое состояние снято с макета 129:77, открытого списка в макете нет
        — он взят с карточки Menu (docs/figma-deltas.md, пункт 24).
      </p>
      <div className="flex items-start gap-(--spacing-gap-24)">
        {[
          { caption: "Stroke=False", node: <Live /> },
          { caption: "Stroke=True", node: <Live bordered /> },
          { caption: "Disabled", node: <Live disabled /> },
        ].map(({ caption, node }) => (
          <div key={caption} className="flex flex-col gap-(--spacing-gap-4)">
            {node}
            <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
              {caption}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Playground: StoryObj<typeof SelectField> = {
  args: { label: "Город", value: "almaty", bordered: false, disabled: false },
  argTypes: { options: { table: { disable: true } }, onChange: { table: { disable: true } } },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-[200px]">
        <SelectField
          {...args}
          options={CITIES}
          onChange={(value) => {
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
};
