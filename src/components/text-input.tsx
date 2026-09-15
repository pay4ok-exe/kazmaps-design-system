"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

export type TextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "prefix"
> & {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  invalid?: boolean;
  prefix?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

export function TextInput({
  value,
  onChange,
  label,
  invalid = false,
  prefix,
  trailing,
  className = "",
  id: idProp,
  ...rest
}: TextInputProps) {
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
      <div
        className={`flex items-center gap-(--spacing-gap-8) overflow-hidden rounded-(--dimension-corner-radius-10) inset-ring-[length:var(--stroke-border-1)] bg-(--background-secondary) px-(--spacing-padding-12) py-(--spacing-padding-8) transition-surface ${
          invalid
            ? "inset-ring-(--border-error) focus-ring-within"
            : "inset-ring-transparent hover:inset-ring-(--border-secondary) has-[input:focus]:inset-ring-(--border-focus)"
        }`}
      >
        {prefix == null ? null : (
          <span className="flex shrink-0 items-center text-base leading-(--typography-line-height-20) text-(color:--text-tertiary)">
            {prefix}
          </span>
        )}
        <input
          id={id}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          aria-invalid={invalid || undefined}
          className={`min-w-0 flex-1 bg-transparent text-base leading-(--typography-line-height-20) outline-none [font-weight:var(--font-weight-regular)] placeholder:text-(color:--text-tertiary) ${
            invalid ? "text-(color:--text-danger)" : "text-(color:--text-primary)"
          }`}
          {...rest}
        />
        {trailing == null ? null : <span className="flex shrink-0 items-center">{trailing}</span>}
      </div>
    </div>
  );
}
