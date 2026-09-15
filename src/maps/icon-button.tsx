import type { ComponentProps, ReactNode } from "react";

/* Замер макета: Map Action (97:53), 9 вариантов Type(Default|Locate|Dimension) ×
   State(Default|Hover|Active). Геометрия одна на все девять: 36×36, паддинг 6,
   радиус 10, фон background/primary, иконка 24, тень --shadow-hud, а на
   наведении --shadow-hud-hover.

   Типы различаются только глифом, поэтому props типа в коде нет — иконку
   передаёт вызывающий. Цветом управляет состояние:
     Default — icon/tertiary, Hover — icon/primary, Active — icon/accent.

   Осторожно: у Type=Default в макете Default и Hover переставлены местами
   относительно двух других типов — иконка там СВЕТЛЕЕТ при наведении. Это
   расхождение макета с самим собой, см. docs/figma-deltas.md, пункт 13;
   воспроизводится порядок остальных восьми вариантов. */

export type IconButtonSize = "sm" | "md" | "lg";
/* Map Compass и Profile из той же секции — та же поверхность, тень и размер, но
   круглые. Это форма одного компонента, а не два новых. */
export type IconButtonShape = "square" | "circle";

const SHAPE_CLASSES: Record<IconButtonShape, string> = {
  square: "rounded-(--dimension-corner-radius-10)",
  circle: "rounded-(--dimension-corner-radius-max)",
};

/* Размер в макете один — 36. sm и lg остались от кита: на них стоят 54 вызова в
   main-web, а своих замеров у них нет. */
const SIZE_CLASSES: Record<IconButtonSize, string> = {
  sm: "size-[34px] p-(--spacing-padding-4)",
  md: "size-[36px] p-(--spacing-padding-6)",
  lg: "size-10 p-(--spacing-padding-6)",
};

export function IconButton({
  children,
  label,
  size = "md",
  shape = "square",
  active,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  children: ReactNode;
  label: string;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      {...rest}
      className={`flex items-center justify-center bg-(--background-primary) shadow-(--shadow-hud) transition-interactive focus-ring hover:shadow-(--shadow-hud-hover) ${
        active
          ? "text-(color:--icon-accent)"
          : "text-(color:--icon-tertiary) hover:text-(color:--icon-primary)"
      } ${SHAPE_CLASSES[shape]} ${SIZE_CLASSES[size]} ${className}`}
    >
      {children}
    </button>
  );
}
