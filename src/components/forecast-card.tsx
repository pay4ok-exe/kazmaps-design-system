import type { ReactNode } from "react";

export interface ForecastCardProps {
  title: ReactNode;
  day?: ReactNode;
  icon: ReactNode;
  temperature: ReactNode;
  precipitation: ReactNode;
  current?: boolean;
  className?: string;
}

export function ForecastCard({
  title,
  day,
  icon,
  temperature,
  precipitation,
  current = false,
  className = "",
}: ForecastCardProps) {
  return (
    <div
      className={`flex w-(--dimension-width-64) flex-col items-center gap-(--spacing-gap-4) overflow-hidden rounded-(--dimension-corner-radius-8) bg-(--background-secondary) px-(--spacing-padding-4) pt-(--spacing-padding-4) pb-(--spacing-padding-6) text-center ${className}`}
    >
      <span
        className={`w-full truncate text-xs leading-(--typography-line-height-16) text-(color:--text-primary) ${
          current
            ? "[font-weight:var(--font-weight-medium)]"
            : "[font-weight:var(--font-weight-regular)]"
        }`}
      >
        {title}
      </span>
      {day == null ? null : (
        <span className="w-full truncate text-[10px] leading-(--typography-line-height-12) text-(color:--text-secondary) [font-weight:var(--font-weight-book)]">
          {day}
        </span>
      )}
      <span className="flex size-[32px] shrink-0 items-center justify-center">{icon}</span>
      <span className="flex w-full flex-col items-center gap-(--spacing-gap-2)">
        <span className="w-full text-xs leading-(--typography-line-height-16) text-(color:--text-primary) [font-weight:var(--font-weight-regular)]">
          {temperature}
        </span>
        <span
          className={`w-full text-[10px] leading-(--typography-line-height-12) [font-weight:var(--font-weight-book)] ${
            current ? "text-(color:--text-secondary)" : "text-(color:--text-tertiary)"
          }`}
        >
          {precipitation}
        </span>
      </span>
    </div>
  );
}
