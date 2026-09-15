import type { ReactNode } from "react";

export type IconButtonGroupDirection = "vertical" | "horizontal";

const DIRECTION_CLASSES: Record<IconButtonGroupDirection, string> = {
  vertical: "flex-col",
  horizontal: "flex-row",
};

export interface IconButtonGroupProps {
  children: ReactNode;
  label: string;
  direction?: IconButtonGroupDirection;
  className?: string;
}

export function IconButtonGroup({
  children,
  label,
  direction = "vertical",
  className = "",
}: IconButtonGroupProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex w-fit overflow-hidden rounded-(--dimension-corner-radius-10) shadow-(--shadow-hud) [&>button:hover]:shadow-none [&>button]:rounded-none [&>button]:shadow-none ${DIRECTION_CLASSES[direction]} ${className}`}
    >
      {children}
    </div>
  );
}
