import type { AnchorHTMLAttributes, ReactNode } from "react";

/* Замер макета: Legal (109:720), два состояния. Паддинг 4/6, радиус 4, фон
   background/primary, текст 10/12 весом 400. Единственное различие состояний —
   цвет: text/primary в покое и text/link на наведении.

   Тени у этой плашки нет, в отличие от остальных элементов поверх карты. */

export function LegalLink({
  children,
  className = "",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a
      {...rest}
      className={`inline-flex items-center rounded-(--dimension-corner-radius-4) bg-(--background-primary) px-(--spacing-padding-6) py-(--spacing-padding-4) text-[10px] leading-(--typography-line-height-12) text-(color:--text-primary) transition-interactive focus-ring [font-weight:var(--font-weight-regular)] hover:text-(color:--text-link) ${className}`}
    >
      {children}
    </a>
  );
}
