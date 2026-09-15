import type { ComponentProps, ReactNode } from "react";

/* Замер макета: Collapse Sidebar Action (99:124), два действия. Полоска 24×36,
   паддинг 8/2, тень --shadow-hud-side — вбок, а не вниз, потому что элемент
   липнет к краю панели. Шеврон 20 цветом icon/primary.

   Действия различаются поверхностью: Close идёт на background/primary без
   обводки, Open — на background/secondary с обводкой цветом background/primary.
   Обводка выровнена внутрь, поэтому inset-ring: border сжал бы полоску, а она
   всего 24 шириной. Радиуса у полоски в макете нет. */

export function CollapseHandle({
  children,
  label,
  open = false,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  /** Шеврон: влево при open, вправо при закрытой панели. */
  children: ReactNode;
  label: string;
  open?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-expanded={open}
      {...rest}
      className={`flex h-[36px] w-(--dimension-width-24) items-center justify-center px-(--spacing-padding-2) py-(--spacing-padding-8) text-(color:--icon-primary) shadow-(--shadow-hud-side) transition-interactive focus-ring ${
        open
          ? "bg-(--background-primary)"
          : "inset-ring-[length:var(--stroke-border-1)] inset-ring-(--background-primary) bg-(--background-secondary)"
      } ${className}`}
    >
      {children}
    </button>
  );
}
