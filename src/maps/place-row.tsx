import type { ReactNode } from "react";

import { StarRating } from "./star-rating";

export interface PlaceRowProps {
  photoUrl?: string;
  photoAlt?: string;
  name: string;
  rating?: number;
  category?: string;
  status?: string;
  metaText?: string;
  additional?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function PlaceRow({
  photoUrl,
  photoAlt = "",
  name,
  rating,
  category,
  status,
  metaText,
  additional,
  onClick,
  className = "",
}: PlaceRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-(--spacing-gap-4) rounded-(--dimension-corner-radius-16) inset-ring-[length:var(--stroke-border-1)] inset-ring-transparent bg-(--background-primary) p-(--spacing-padding-4) text-left transition-interactive focus-ring hover:inset-ring-(--border-secondary) ${className}`}
    >
      <span className="size-(--dimension-width-64) shrink-0 overflow-hidden rounded-(--dimension-corner-radius-12) bg-(--background-secondary)">
        {photoUrl ? <img src={photoUrl} alt={photoAlt} className="size-full object-cover" /> : null}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-(--spacing-gap-4) p-(--spacing-padding-4)">
        <span className="truncate text-xs leading-(--typography-line-height-16) text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
          {name}
        </span>
        {category ? (
          <span className="truncate text-xs leading-(--typography-line-height-16) text-(color:--text-secondary) [font-weight:var(--font-weight-book)]">
            {category}
          </span>
        ) : null}
        <span className="flex items-center gap-(--spacing-gap-16) text-xs leading-(--typography-line-height-16) [font-weight:var(--font-weight-book)]">
          {metaText ? <span className="text-(color:--text-secondary)">{metaText}</span> : null}
          <span className="flex items-center gap-(--spacing-gap-4)">
            {rating !== undefined ? <StarRating value={rating} /> : null}
            {status ? <span className="text-(color:--text-secondary)">{status}</span> : null}
            {additional}
          </span>
        </span>
      </span>
    </button>
  );
}
