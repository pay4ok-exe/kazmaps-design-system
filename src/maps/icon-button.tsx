import type { ComponentProps, ReactNode } from "react";

export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonShape = "square" | "circle";

const SHAPE_CLASSES: Record<IconButtonShape, string> = {
  square: "rounded-(--dimension-corner-radius-10)",
  circle: "rounded-(--dimension-corner-radius-max)",
};

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
