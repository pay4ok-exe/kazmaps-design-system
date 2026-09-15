import type { ComponentProps, ReactNode } from "react";

export function WeatherBadge({
  icon,
  temperature,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  icon: ReactNode;
  temperature: ReactNode;
}) {
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex items-center gap-(--spacing-gap-4) rounded-(--dimension-corner-radius-8) bg-(--background-primary) py-(--spacing-padding-4) pr-(--spacing-padding-6) pl-(--spacing-padding-4) shadow-(--shadow-hud-badge) transition-interactive focus-ring ${className}`}
    >
      <span className="flex size-(--dimension-width-20) shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="text-base leading-(--typography-line-height-20) [font-weight:var(--font-weight-regular)]">
        <span className="text-(color:--text-secondary)">{temperature}</span>
        <span className="text-(color:--text-tertiary)">°</span>
      </span>
    </button>
  );
}
