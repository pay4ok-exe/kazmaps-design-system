import type { InputHTMLAttributes } from "react";

import { IconSearchLight } from "../icons/generated";

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder,
  className = "",
  ...rest
}: SearchInputProps) {
  return (
    <div
      className={`group flex items-center gap-(--spacing-gap-8) overflow-hidden rounded-(--dimension-corner-radius-10) inset-ring-[length:var(--stroke-border-1)] inset-ring-(--border-secondary) bg-(--background-primary) p-(--spacing-padding-8) shadow-(--shadow-field) transition-surface hover:inset-ring-(--border-primary) has-[input:focus]:inset-ring-(--border-focus) ${className}`}
    >
      <IconSearchLight
        size={20}
        className="shrink-0 text-(color:--icon-secondary) transition-interactive group-has-[input:focus]:text-(color:--icon-primary)"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-xs leading-(--typography-line-height-16) text-(color:--text-primary) outline-none [font-weight:var(--font-weight-book)] placeholder:text-(color:--text-tertiary) [&::-webkit-search-cancel-button]:hidden"
        {...rest}
      />
    </div>
  );
}
