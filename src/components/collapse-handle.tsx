import type { ComponentProps, ReactNode } from "react";

export function CollapseHandle({
  children,
  label,
  open = false,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
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
