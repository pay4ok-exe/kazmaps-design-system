import type { ReactNode } from "react";

export function MenuDivider() {
  return (
    <div role="separator" className="flex h-2 shrink-0 items-center">
      <span className="h-px w-full bg-(--background-tertiary)" />
    </div>
  );
}

export interface MenuProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function Menu({ label, children, className = "" }: MenuProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex w-[240px] flex-col gap-(--spacing-gap-4) rounded-(--dimension-corner-radius-10) bg-(--background-primary) p-(--spacing-padding-8) shadow-(--shadow-modal) ${className}`}
    >
      {children}
    </div>
  );
}
