import type { ReactNode } from "react";

/* Замер макета: _Tab Action (76:342), три состояния. Пункт — колонка 64 шириной
   с gap 4: сверху иконочный чип 32 с радиусом 10 и паддингом 6, под ним подпись
   10/12.

   Состояния:
     Inactive — чип background/secondary, иконка icon/secondary, подпись
                text/secondary весом 450;
     Hover    — чип тот же, иконка становится icon/accent, подпись не меняется;
     Active   — чип action/accent/primary, иконка icon/white, подпись text/link
                весом 550.

   Подчёркивание в имени макета означает служебный слой, поэтому наружу
   экспортируется только ряд целиком.

   Заливку акцентом получает ЧИП, а не кнопка: до замера ею красилась вся
   кнопка вместе с подписью. */

export interface SegmentedRowItem {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface SegmentedRowProps {
  items: SegmentedRowItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  label: string;
  className?: string;
}

export function SegmentedRow({
  items,
  activeId,
  onSelect,
  label,
  className = "",
}: SegmentedRowProps) {
  return (
    <div role="group" aria-label={label} className={`flex ${className}`}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            onClick={() => {
              onSelect(item.id);
            }}
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
              {item.icon}
            </span>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
