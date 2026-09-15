import type { ReactNode } from "react";

import { StarRating } from "./star-rating";

/* Замер макета: Near Place Card (89:31). Карточка — паддинг 4, gap 4, радиус 16,
   фон background/primary; на наведении добавляется рамка border/secondary.
   Снимок 64 с радиусом 12. Колонка содержимого — свой паддинг 4 и gap 4:
   название 12/16 весом 500 цветом text/primary, тип 12/16 весом 450 цветом
   text/secondary, ниже строка с gap 16, где слева расстояние, а справа пустой
   слот Additional Info с gap 4.

   Высота 72 складывается из 4 + 64 + 4 и числом не задаётся. */

export interface PlaceRowStatus {
  label: string;
  tone?: "success" | "muted";
}

export interface PlaceRowProps {
  photoUrl?: string;
  photoAlt?: string;
  name: string;
  rating?: number;
  category?: string;
  status?: PlaceRowStatus;
  metaText?: string;
  /** Слот Additional Info справа от расстояния. */
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
      /* Рамка прозрачна, а не отсутствует: в макете она появляется только на
         наведении, а при border-box её появление сдвинуло бы содержимое. */
      className={`flex w-full items-center gap-(--spacing-gap-4) rounded-(--dimension-corner-radius-16) border-(length:--stroke-border-1) border-solid border-transparent bg-(--background-primary) p-(--spacing-padding-4) text-left transition-interactive focus-ring hover:border-(--border-secondary) ${className}`}
    >
      <span className="size-(--dimension-width-64) shrink-0 overflow-hidden rounded-(--dimension-corner-radius-12) bg-(--background-secondary)">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={photoAlt} className="size-full object-cover" />
        ) : null}
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
          {/* Additional Info в макете — пустой слот. Рейтинг и статус кладём
              сюда, а не в строку названия: там в макете только название. */}
          <span className="flex items-center gap-(--spacing-gap-4)">
            {rating !== undefined ? <StarRating value={rating} /> : null}
            {status ? (
              <span
                className={
                  status.tone === "muted"
                    ? "text-(color:--text-tertiary)"
                    : "text-(color:--tag-green)"
                }
              >
                {status.label}
              </span>
            ) : null}
            {additional}
          </span>
        </span>
      </span>
    </button>
  );
}
