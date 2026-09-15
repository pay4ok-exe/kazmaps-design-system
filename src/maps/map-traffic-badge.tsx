import type { ComponentProps } from "react";

export type TrafficLevel = "green" | "yellow" | "orange" | "red";

const LEVEL_CLASSES: Record<TrafficLevel, string> = {
  green:
    "bg-(--traffic-fill-green) outline-(--traffic-border-green) text-(color:--traffic-text-green)",
  yellow:
    "bg-(--traffic-fill-yellow) outline-(--traffic-border-yellow) text-(color:--traffic-text-yellow)",
  orange:
    "bg-(--traffic-fill-orange) outline-(--traffic-border-orange) text-(color:--traffic-text-orange)",
  red: "bg-(--traffic-fill-red) outline-(--traffic-border-red) text-(color:--traffic-text-red)",
};

const OFF_CLASSES = "outline-(--icon-secondary) text-(color:--icon-secondary)";

export function MapTrafficBadge({
  level,
  value,
  label,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  level: TrafficLevel | null;
  value: number;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={level !== null}
      {...rest}
      className={`flex size-[36px] items-center justify-center rounded-(--dimension-corner-radius-10) bg-(--background-primary) p-(--spacing-padding-8) shadow-(--shadow-hud) transition-interactive focus-ring hover:shadow-(--shadow-hud-hover) ${className}`}
    >
      <span
        className={`flex size-(--dimension-width-20) items-center justify-center rounded-(--dimension-corner-radius-max) outline-[length:var(--stroke-border-1_5)] -outline-offset-[0.75px] text-xs leading-(--typography-line-height-16) [font-weight:var(--font-weight-book)] ${
          level === null ? OFF_CLASSES : LEVEL_CLASSES[level]
        }`}
      >
        {value}
      </span>
    </button>
  );
}
