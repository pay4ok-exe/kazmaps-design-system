import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "../../atoms/input";
import { FormField } from "./form-field";

/* Бренд закреплён намеренно. Atoms и molecules построены на общем контракте
   токенов (--brand, --ink, --card, --line и далее), который есть у business и
   booking. Бренд maps с версии редизайна несёт СВОЙ контракт из Figma, этих
   ролей у него нет, и под ним витрина рисовалась бы пустыми прямоугольниками.
   Компоненты maps живут в разделе «Maps kit». */
const meta: Meta<typeof FormField> = {
  globals: { brand: "business" },
  title: "Molecules/FormField",
  component: FormField,
};
export default meta;
export const WithError: StoryObj<typeof FormField> = {
  render: () => (
    <div className="w-80">
      <FormField
        label="Название компании"
        required
        errorMessage="Обязательное поле"
        hint="Как в реестре"
      >
        {(field) => <Input id={field.id} placeholder="ТОО Ромашка" />}
      </FormField>
    </div>
  ),
};
