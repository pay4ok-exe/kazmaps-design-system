import type { ReactNode } from "react";

export type PanelVariant = "flush";

const VARIANT_CLASSES: Record<PanelVariant, string> = {
  flush:
    "rounded-none border-r border-(--border-secondary) shadow-(--shadow-column) transition-surface",
};

export function Panel({
  children,
  variant = "flush",
  className = "",
}: {
  children: ReactNode;
  variant?: PanelVariant;
  className?: string;
}) {
  return (
    <div className={`bg-(--background-primary) ${VARIANT_CLASSES[variant]} ${className}`}>
      {children}
    </div>
  );
}
