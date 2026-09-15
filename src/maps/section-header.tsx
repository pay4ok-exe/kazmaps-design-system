import type { ReactNode } from "react";

/* Замер макета: Header (88:30). Заголовок — 16/20 весом 500 цветом text/primary,
   в рамке с паддингом 4; справа слот под действия с gap 4.

   Это заметно не то, чем SectionHeader был раньше: до замера он рисовал мелкую
   подпись 11px в верхнем регистре с разрядкой цветом text/tertiary. Замена
   сознательная — в макете заголовок ровно один, и он такой. На экранах
   main-web это 19 файлов, где подписи секций станут крупными. */

export function SectionHeader({
  children,
  action,
  className = "",
}: {
  children: ReactNode;
  /** Слот действий справа: в макете Action Container с gap 4. */
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <p className="min-w-0 flex-1 p-(--spacing-padding-4) text-base leading-(--typography-line-height-20) text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
        {children}
      </p>
      {action == null ? null : (
        <span className="flex shrink-0 items-center gap-(--spacing-gap-4)">{action}</span>
      )}
    </div>
  );
}
