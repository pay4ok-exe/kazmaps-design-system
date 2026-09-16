import type { ReactNode } from "react";

import { NAV_ITEM_STATE } from "./nav-item.states";

export interface NavItemProps {
  label: string;
  icon: ReactNode;
  active: boolean;
  onSelect: () => void;
  selection: "pressed" | "current";
  className?: string;
}

export function NavItem({
  label,
  icon,
  active,
  onSelect,
  selection,
  className = "",
}: NavItemProps) {
  return (
    <button
      type="button"
      aria-pressed={selection === "pressed" ? active : undefined}
      aria-current={selection === "current" && active ? "page" : undefined}
      onClick={onSelect}
      className={`group flex w-(--dimension-width-64) flex-col items-center gap-(--spacing-gap-4) text-[10px] leading-(--typography-line-height-12) transition-interactive focus-ring ${
        active
          ? "text-(color:--text-link) [font-weight:var(--font-weight-strong)]"
          : "text-(color:--text-secondary) [font-weight:var(--font-weight-book)]"
      } ${className}`}
    >
      <span
        className={`inline-flex size-[32px] items-center justify-center rounded-(--dimension-corner-radius-10) p-(--spacing-padding-6) transition-interactive ${
          active ? NAV_ITEM_STATE.active : NAV_ITEM_STATE.idle
        }`}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}
