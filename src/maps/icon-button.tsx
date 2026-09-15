import type { ComponentProps, ReactNode } from "react";

export function IconButton({
  children,
  label,
  active,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  children: ReactNode;
  label: string;
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
      } size-[36px] rounded-(--dimension-corner-radius-10) p-(--spacing-padding-6) ${className}`}
    >
      {children}
    </button>
  );
}
