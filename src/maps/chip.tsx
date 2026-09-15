import type { ReactNode } from "react";

export type ChipTone = "neutral" | "info";

export interface ChipProps {
  label: string;
  icon?: ReactNode;
  tone?: ChipTone;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

const TONE = {
  neutral: { surface: "bg-(--background-primary)", badge: "bg-(--tag-gray)" },
  info: { surface: "bg-(--background-secondary)", badge: "bg-(--tag-blue)" },
};

const PADDING = {
  withIcon: "py-(--spacing-padding-2) pr-(--spacing-padding-6) pl-(--spacing-padding-2)",
  textOnly: "px-(--spacing-padding-6) py-(--spacing-padding-6)",
};

const STATE = {
  active: "inset-ring-(--action-accent-primary) text-(color:--text-accent)",
  idle: "inset-ring-transparent text-(color:--text-primary) hover:inset-ring-(--border-secondary)",
};

export function Chip({
  label,
  icon,
  tone = "neutral",
  active = false,
  onClick,
  className = "",
}: ChipProps) {
  const palette = TONE[tone];
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center gap-(--spacing-gap-6) rounded-(--dimension-corner-radius-10) inset-ring-[length:var(--stroke-border-1)] text-xs leading-(--typography-line-height-16) transition-interactive [font-weight:var(--font-weight-book)] focus-ring ${palette.surface} ${
        icon ? PADDING.withIcon : PADDING.textOnly
      } ${active ? STATE.active : STATE.idle} ${className}`}
    >
      {icon == null ? null : (
        <span
          className={`inline-flex size-(--dimension-width-24) shrink-0 items-center justify-center rounded-(--dimension-corner-radius-8) p-(--spacing-padding-4) text-(color:--icon-white) ${palette.badge}`}
        >
          {icon}
        </span>
      )}
      {label}
    </button>
  );
}
