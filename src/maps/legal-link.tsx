import type { AnchorHTMLAttributes, ReactNode } from "react";

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
