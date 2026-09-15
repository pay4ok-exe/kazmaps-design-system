import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "accent" | "neutral" | "danger" | "outline" | "outline-accent";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  accent: [
    "text-(color:--text-white) bg-(--action-accent-primary)",
    "[--btn-ring-from:var(--action-accent-subtle)]",
    "[--btn-ring-to:var(--action-accent-secondary)]",
    "active:bg-(--action-accent-secondary)",
    "active:[--btn-ring-from:var(--action-accent-secondary)]",
    "active:[--btn-ring-to:var(--action-accent-secondary)]",
  ].join(" "),
  neutral: [
    "text-(color:--text-white) bg-(--action-neutral-primary)",
    "[--btn-ring-from:var(--action-neutral-subtle)]",
    "[--btn-ring-to:var(--action-neutral-secondary)]",
    "active:bg-(--action-neutral-secondary)",
    "active:[--btn-ring-from:var(--action-neutral-secondary)]",
    "active:[--btn-ring-to:var(--action-neutral-secondary)]",
  ].join(" "),
  danger: [
    "text-(color:--text-white) bg-(--action-danger-primary)",
    "[--btn-ring-from:var(--action-danger-subtle)]",
    "[--btn-ring-to:var(--action-danger-hover)]",
    "active:bg-(--action-danger-secondary)",
    "active:[--btn-ring-from:var(--action-danger-secondary)]",
    "active:[--btn-ring-to:var(--action-danger-secondary)]",
  ].join(" "),

  outline: [
    "inset-ring-[length:var(--stroke-border-1)] inset-ring-(--border-primary)",
    "bg-(--background-primary) text-(color:--text-secondary)",
    "active:bg-(--background-secondary) active:text-(color:--text-primary)",
  ].join(" "),
  "outline-accent": [
    "inset-ring-[length:var(--stroke-border-1)] inset-ring-(--border-primary)",
    "bg-(--background-primary) text-(color:--text-accent)",
    "active:bg-(--background-secondary)",
  ].join(" "),
};

const GRADIENT_RING = new Set<ButtonVariant>(["accent", "neutral", "danger"]);

const DISABLED_CLASSES = [
  "disabled:cursor-not-allowed",
  "disabled:bg-(--action-disabled)",
  "disabled:inset-ring-(--action-disabled)",
  "disabled:[--btn-ring-from:var(--action-disabled)]",
  "disabled:[--btn-ring-to:var(--action-disabled)]",
  "disabled:text-(color:--text-tertiary)",
].join(" ");

type SizeSpec = { base: string; textOnly: string; withIcon: string };

const SIZE_CLASSES: Record<ButtonSize, SizeSpec> = {
  sm: { base: "h-[34px] text-[12.5px]", textOnly: "px-3.5", withIcon: "px-3.5 gap-1.5" },
  md: {
    base: "h-(--dimension-height-40) text-base leading-(--typography-line-height-20)",
    textOnly: "px-(--spacing-padding-12)",
    withIcon: "pl-(--spacing-padding-12) pr-(--spacing-padding-10) gap-(--spacing-gap-6)",
  },
  lg: { base: "h-11 text-[13.5px]", textOnly: "px-4", withIcon: "px-4 gap-2" },
};

const WEIGHT_CLASSES = {
  withIcon: "[font-weight:var(--font-weight-book)]",
  textOnly: "[font-weight:var(--font-weight-medium)]",
};

export function Button({
  children,
  icon,
  variant = "accent",
  size = "md",
  fullWidth = false,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}) {
  const sizing = SIZE_CLASSES[size];
  return (
    <button
      type="button"
      {...rest}
      className={`relative inline-flex items-center justify-center rounded-(--dimension-corner-radius-10) whitespace-nowrap transition-interactive focus-ring ${sizing.base} ${icon ? `${sizing.withIcon} ${WEIGHT_CLASSES.withIcon}` : `${sizing.textOnly} ${WEIGHT_CLASSES.textOnly}`} ${VARIANT_CLASSES[variant]} ${DISABLED_CLASSES} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {GRADIENT_RING.has(variant) ? (
        <span
          aria-hidden="true"
          className="gradient-ring pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      ) : null}
      {children}
      {icon}
    </button>
  );
}
