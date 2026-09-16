"use client";

export type PillTabsOption = { id: string; label: string };
export type PillTabsSize = "default" | "menu";

const SIZE_CLASSES: Record<PillTabsSize, { root: string; indicator: string; option: string }> = {
  default: {
    root: "rounded-(--dimension-corner-radius-12)",
    indicator: "rounded-(--dimension-corner-radius-10)",
    option:
      "rounded-(--dimension-corner-radius-10) px-(--spacing-padding-12) py-(--spacing-padding-8) text-base leading-(--typography-line-height-20)",
  },
  menu: {
    root: "rounded-(--dimension-corner-radius-8)",
    indicator: "rounded-(--dimension-corner-radius-6)",
    option:
      "rounded-(--dimension-corner-radius-6) px-(--spacing-padding-4) py-(--spacing-padding-6) text-sm leading-(--typography-line-height-18)",
  },
};

export interface PillTabsProps {
  options: PillTabsOption[];
  activeId: string;
  onSelect: (id: string) => void;
  label: string;
  size?: PillTabsSize;
  className?: string;
}

export function PillTabs({
  options,
  activeId,
  onSelect,
  label,
  size = "default",
  className = "",
}: PillTabsProps) {
  const activeIndex = options.findIndex((option) => option.id === activeId);
  const style = SIZE_CLASSES[size];

  return (
    <div
      role="group"
      aria-label={label}
      className={`relative flex gap-(--spacing-gap-2) bg-(--background-toggle) bg-[linear-gradient(var(--background-toggle-2),var(--background-toggle-2))] p-(--spacing-padding-2) ${style.root} ${className}`}
    >
      {activeIndex < 0 ? null : (
        <span
          aria-hidden="true"
          className={`absolute top-(--spacing-padding-2) bottom-(--spacing-padding-2) left-(--spacing-padding-2) bg-(--background-primary) transition-[translate] duration-(--motion-panel) ease-(--ease-standard) ${style.indicator}`}
          style={{
            width: `calc((100% - 2 * var(--spacing-padding-2) - ${options.length - 1} * var(--spacing-gap-2)) / ${options.length})`,
            translate: `calc(${activeIndex} * (100% + var(--spacing-gap-2)))`,
          }}
        />
      )}
      {options.map((option) => {
        const active = option.id === activeId;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => {
              onSelect(option.id);
            }}
            className={`relative flex-1 transition-interactive [font-weight:var(--font-weight-regular)] focus-ring ${style.option} ${
              active
                ? "text-(color:--text-primary)"
                : "text-(color:--text-tertiary) hover:text-(color:--text-primary)"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
