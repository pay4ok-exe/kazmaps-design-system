import type { ComponentProps, ReactNode } from "react";

export type IconButtonShape = "square" | "circle";

const SHAPE_CLASSES: Record<IconButtonShape, string> = {
  square: "rounded-(--dimension-corner-radius-10)",
  circle: "rounded-(--dimension-corner-radius-max)",
};

export function IconButton({
  children,
  label,
  shape = "square",
  active,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  children: ReactNode;
  label: string;
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
      } size-[36px] p-(--spacing-padding-6) ${SHAPE_CLASSES[shape]} ${className}`}
    >
      {children}
    </button>
  );
}
