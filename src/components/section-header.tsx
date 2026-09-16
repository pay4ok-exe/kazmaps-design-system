import type { ReactNode } from "react";

export function SectionHeader({
  children,
  action,
  className = "",
}: {
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <p className="min-w-0 flex-1 truncate p-(--spacing-padding-4) text-base leading-(--typography-line-height-20) text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
        {children}
      </p>
      {action == null ? null : (
        <span className="flex shrink-0 items-center gap-(--spacing-gap-4)">{action}</span>
      )}
    </div>
  );
}
