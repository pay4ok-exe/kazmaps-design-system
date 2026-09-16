"use client";

import type { ReactNode } from "react";

import { IconChevronRight } from "../icons/generated";

export interface MenuItemProps {
  icon: ReactNode;
  activeIcon?: ReactNode;
  label: string;
  count?: number;
  unread?: boolean;
  chevron?: boolean;
  active?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  className?: string;
}

const ICON_TONE = {
  disabled: "text-(color:--icon-tertiary)",
  active: "text-(color:--icon-accent)",
  idle: "text-(color:--icon-secondary) group-hover:text-(color:--icon-primary)",
} as const;

const TEXT_TONE = {
  disabled: "text-(color:--text-tertiary)",
  active: "text-(color:--text-primary)",
  idle: "text-(color:--text-secondary) group-hover:text-(color:--text-primary)",
} as const;

export function MenuItem({
  icon,
  activeIcon,
  label,
  count,
  unread = false,
  chevron = false,
  active = false,
  disabled = false,
  onSelect,
  className = "",
}: MenuItemProps) {
  const tone = disabled ? "disabled" : active ? "active" : "idle";

  return (
    <button
      type="button"
      disabled={disabled}
      aria-current={active ? "true" : undefined}
      onClick={onSelect}
      className={`group flex w-full items-center gap-(--spacing-gap-8) rounded-(--dimension-corner-radius-4) bg-(--background-primary) p-(--spacing-padding-6) text-left transition-interactive focus-ring disabled:cursor-not-allowed not-disabled:hover:bg-(--background-secondary) ${className}`}
    >
      <span
        className={`relative flex size-5 shrink-0 items-center justify-center ${ICON_TONE[tone]}`}
      >
        {active ? (activeIcon ?? icon) : icon}
        {unread ? (
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 size-1.5 rounded-(--dimension-corner-radius-max) bg-(--icon-accent)"
          />
        ) : null}
      </span>
      <span
        className={`min-w-0 flex-1 truncate text-sm leading-(--typography-line-height-20) [font-weight:var(--font-weight-book)] ${TEXT_TONE[tone]}`}
      >
        {label}
      </span>
      {count === undefined ? null : (
        <span
          className={`flex size-5 shrink-0 items-center justify-center p-(--spacing-padding-2) text-xs leading-(--typography-line-height-16) tabular-nums [font-weight:var(--font-weight-book)] ${
            unread && !disabled ? "text-(color:--text-accent)" : TEXT_TONE[tone]
          }`}
        >
          {count}
        </span>
      )}
      {chevron ? <IconChevronRight size={20} className={`shrink-0 ${ICON_TONE[tone]}`} /> : null}
    </button>
  );
}
