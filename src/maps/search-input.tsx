import { Search } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

/* Замер макета: Search Field (79:157), три состояния. Паддинг 8 со всех сторон,
   gap 8, радиус 10, фон background/primary, тень --shadow-field, иконка 20,
   текст 12/16 весом 450. Высота 36 нигде не задана числом — она складывается из
   паддингов и самого высокого ребёнка (иконки), поэтому здесь её тоже нет:
   высота остаётся производной, как в auto-layout макета.

   Состояния различаются рамкой, а на фокусе ещё и цветом иконки с текстом:
   default border/secondary, hover border/primary, focus border/focus. */

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  submitLabel?: string;
  /** Плотный вариант без тени — своего макета не имеет, нужен плавающим панелям. */
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
      className={`group flex items-center gap-(--spacing-gap-8) overflow-hidden rounded-(--dimension-corner-radius-10) border-(length:--stroke-border-1) border-solid border-(--border-secondary) bg-(--background-primary) p-(--spacing-padding-8) transition-surface focus-ring-within hover:border-(--border-primary) has-[input:focus]:border-(--border-focus) ${
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
        /* Кнопки отправки в макете нет — она осталась от кита, потому что на неё
           опираются экраны поиска. Переведена на новые роли, геометрия прежняя. */
        <button
          type="button"
          aria-label={submitLabel}
          title={submitLabel}
          onClick={onSubmit}
          className="-my-(--spacing-padding-8) -mr-(--spacing-padding-8) flex h-[calc(100%+2*var(--spacing-padding-8))] w-[46px] shrink-0 items-center justify-center bg-(--action-accent-primary) text-(color:--text-white) transition-interactive focus-ring hover:bg-(--action-accent-secondary)"
        >
          <Search size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
