import type { ComponentProps } from "react";

import { IconChevronLeft, IconChevronRight } from "../icons/generated";

const CLOSED_EDGE = [
  "inset-shadow-[0_1px_0_0_var(--background-primary),0_-1px_0_0_var(--background-primary),-1px_0_0_0_var(--background-primary)]",
  "bg-(--background-secondary)",
].join(" ");

export function CollapseHandle({
  label,
  open = false,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  label: string;
  open?: boolean;
}) {
  const Chevron = open ? IconChevronLeft : IconChevronRight;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-expanded={open}
      {...rest}
      className={`flex size-fit items-center justify-center rounded-r-(--dimension-corner-radius-8) px-(--spacing-padding-2) py-(--spacing-padding-8) text-(color:--icon-primary) shadow-(--shadow-hud-side) transition-interactive focus-ring ${
        open ? "bg-(--background-primary)" : CLOSED_EDGE
      } ${className}`}
    >
      <Chevron size={20} />
    </button>
  );
}
