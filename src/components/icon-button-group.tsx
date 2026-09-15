import type { ReactNode } from "react";

export type IconButtonGroupDirection = "vertical" | "horizontal";

const DIRECTION_CLASSES: Record<IconButtonGroupDirection, string> = {
  vertical:
    "flex-col [&>button:first-child]:rounded-t-(--dimension-corner-radius-10) [&>button:last-child]:rounded-b-(--dimension-corner-radius-10)",
  horizontal:
    "flex-row [&>button:first-child]:rounded-l-(--dimension-corner-radius-10) [&>button:last-child]:rounded-r-(--dimension-corner-radius-10)",
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
      className={`isolate inline-flex w-fit rounded-(--dimension-corner-radius-10) shadow-(--shadow-hud) [&>button:focus-visible]:z-10 [&>button:hover]:shadow-none [&>button]:relative [&>button]:rounded-none [&>button]:shadow-none ${DIRECTION_CLASSES[direction]} ${className}`}
    >
      {children}
    </div>
  );
}
