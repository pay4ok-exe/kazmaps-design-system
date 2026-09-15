import type { ReactNode } from "react";

export interface TabActionProps {
  label: string;
  icon: ReactNode;
  active: boolean;
  onSelect: () => void;
  selection: "pressed" | "current";
}

export function TabAction({ label, icon, active, onSelect, selection }: TabActionProps) {
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
      }`}
    >
      <span
        className={`inline-flex size-[32px] items-center justify-center rounded-(--dimension-corner-radius-10) p-(--spacing-padding-6) transition-interactive ${
          active
            ? "bg-(--action-accent-primary) text-(color:--icon-white)"
            : "bg-(--background-secondary) text-(color:--icon-secondary) group-hover:text-(color:--icon-accent)"
        }`}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}
