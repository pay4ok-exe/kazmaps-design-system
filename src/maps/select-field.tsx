"use client";

import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";
import { useId } from "react";

/* Замер макета: компонент-сет Select Field (129:77), 6 вариантов
   State(Default|Hover|Focus) × Stroke(False|True). Геометрия у всех шести
   одинаковая: 28 высотой, радиус 6, паддинг 6/6/6/8, gap 4, текст 12/16 весом
   400, фон background/primary.

   Stroke — это не «есть рамка или нет», а насколько она заметна в покое:
   при Stroke=False рамки в покое нет и она появляется на наведении, при
   Stroke=True она есть сразу и на наведении становится темнее. Focus в обоих
   случаях одинаков. */

export type SelectFieldOption = { value: string; label: string };

export type SelectFieldProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange" | "value" | "children"
> & {
  value: string;
  onChange: (value: string) => void;
  options: SelectFieldOption[];
  /**
   * Видимая подпись над полем. Необязательна, но доступное имя обязательно:
   * без `label` передайте `aria-label`, иначе select останется безымянным
   * для скринридера.
   */
  label?: string;
  /** Stroke=True в макете: рамка видна уже в покое. */
  bordered?: boolean;
  className?: string;
};

/* Правый паддинг в макете не равен левому: между текстом и шевроном gap 4, сам
   шеврон 16, до края 6. У нативного select нет flex-потока, поэтому место под
   шеврон приходится держать паддингом — отсюда сумма, а не одно число. */
const TRAILING_SPACE =
  "pr-[calc(var(--spacing-padding-6)+var(--dimension-width-16)+var(--spacing-gap-4))]";

/* Обводка в макете выровнена ВНУТРЬ и места не занимает, поэтому inset-ring, а
   не border: прозрачная рамка была костылём под то, что border съедает у
   содержимого свою толщину. */
const RING_CLASSES = {
  quiet: "hover:inset-ring-(--border-secondary)",
  bordered: "inset-ring-(--border-secondary) hover:inset-ring-(--border-primary)",
};

export function SelectField({
  value,
  onChange,
  options,
  label,
  bordered = false,
  className = "",
  ...rest
}: SelectFieldProps) {
  const id = useId();

  return (
    <div className={className}>
      {label == null ? null : (
        <label
          htmlFor={id}
          className="mb-(--spacing-gap-4) block text-xs leading-(--typography-line-height-16) text-(color:--text-secondary) [font-weight:var(--font-weight-medium)]"
        >
          {label}
        </label>
      )}
      <div className="relative inline-flex w-full items-center">
        <select
          id={id}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          className={`peer h-(--dimension-height-28) w-full appearance-none rounded-(--dimension-corner-radius-6) inset-ring-[length:var(--stroke-border-1)] bg-(--background-primary) pl-(--spacing-padding-8) text-xs leading-(--typography-line-height-16) text-(color:--text-secondary) transition-interactive [font-weight:var(--font-weight-regular)] focus:inset-ring-(--border-focus) focus:text-(color:--text-primary) focus-ring ${TRAILING_SPACE} ${bordered ? RING_CLASSES.bordered : RING_CLASSES.quiet}`}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-(--spacing-padding-6) size-(--dimension-width-16) text-(color:--icon-primary) transition-interactive peer-focus:text-(color:--icon-accent)"
        />
      </div>
    </div>
  );
}
