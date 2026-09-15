"use client";

import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";
import { useId } from "react";

export type SelectFieldOption = { value: string; label: string };

export type SelectFieldProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange" | "value" | "children"
> & {
  value: string;
  onChange: (value: string) => void;
  options: SelectFieldOption[];
  label?: string;
  bordered?: boolean;
  className?: string;
};

const TRAILING_SPACE =
  "pr-[calc(var(--spacing-padding-6)+var(--dimension-width-16)+var(--spacing-gap-4))]";

const RING_CLASSES = {
  quiet: "inset-ring-transparent hover:inset-ring-(--border-secondary)",
  bordered: "inset-ring-(--border-secondary) hover:inset-ring-(--border-primary)",
};

export function SelectField({
  value,
  onChange,
  options,
  label,
  bordered = false,
  className = "",
  id: idProp,
  ...rest
}: SelectFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div className={className}>
      {!label?.trim() ? null : (
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
