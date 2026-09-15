import type { ComponentProps } from "react";

/* Замер макета: Map Traffic (106:427), пять состояний. Внешняя плашка 36×36,
   паддинг 8, радиус 10, фон background/primary, тень --shadow-hud. Внутри
   кружок 20×20 с ПОЛУТОРНОЙ обводкой и цифрой 12/16 весом 450.

   Обводка кружка выровнена по ЦЕНТРУ, а не внутрь, как у остальных компонентов
   макета: половина толщины уходит наружу. Ни border (всегда внутрь), ни
   inset-ring этого не дают — нужен outline со сдвигом на половину толщины.
   Кружок не фокусируется, так что outline здесь ничему не мешает.

   Уровень задаёт сразу тройку ролей — заливку, обводку и цвет цифры, — и все
   три берутся из группы traffic/*. Без уровня (пробки выключены) заливки нет
   вовсе, а обводка и цифра уходят в icon/secondary. */

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
  /** null — пробки выключены: состояние Disabled макета. */
  level: TrafficLevel | null;
  /** Балл пробок. Показывается и в выключенном состоянии, как в макете. */
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
