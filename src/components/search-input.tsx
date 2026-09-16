import { Search } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  submitLabel?: string;
  compact?: boolean;
  suffix?: ReactNode;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  onSubmit,
  submitLabel = "Искать",
  compact = false,
  suffix,
  placeholder,
  className = "",
  ...rest
}: SearchInputProps) {
  return (
    <div
      className={`group flex items-center gap-(--spacing-gap-8) overflow-hidden rounded-(--dimension-corner-radius-10) inset-ring-[length:var(--stroke-border-1)] inset-ring-(--border-secondary) bg-(--background-primary) p-(--spacing-padding-8) transition-surface hover:inset-ring-(--border-primary) has-[input:focus]:inset-ring-(--border-focus) ${
        compact ? "" : "shadow-(--shadow-field)"
      } ${className}`}
    >
      <Search
        size={20}
        aria-hidden="true"
        className="shrink-0 text-(color:--icon-secondary) transition-interactive group-has-[input:focus]:text-(color:--icon-primary)"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-xs leading-(--typography-line-height-16) text-(color:--text-primary) outline-none [font-weight:var(--font-weight-book)] placeholder:text-(color:--text-tertiary)"
        {...rest}
      />
      {suffix}
      {onSubmit === undefined ? null : (
        <button
          type="button"
          aria-label={submitLabel}
          title={submitLabel}
          onClick={onSubmit}
          className="-my-[calc(var(--spacing-padding-8)-var(--stroke-border-1))] -mr-[calc(var(--spacing-padding-8)-var(--stroke-border-1))] flex w-[46px] self-stretch shrink-0 items-center justify-center bg-(--action-accent-primary) text-(color:--text-white) transition-interactive focus-ring hover:bg-(--action-accent-secondary)"
        >
          <Search size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
