import type { ComponentProps, ReactNode } from "react";

/* Замер макета: Map Weather (110:895). Паддинг 4/6/4/4 — справа шестёрка,
   слева четвёрка, — gap 4, радиус 8, фон background/primary, тень
   --shadow-hud-badge (смещение 2, а не 4 как у остальных элементов HUD).

   Градус и знак градуса — РАЗНЫЕ ноды разного цвета: число text/secondary,
   «°» text/tertiary. Если склеить их в одну строку, разница пропадёт. */

export function WeatherBadge({
  icon,
  temperature,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  /** Пиктограмма погоды 20×20; цвет задаёт вызывающий ролью weather/*. */
  icon: ReactNode;
  /** Температура без знака градуса — он рисуется отдельно. */
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
