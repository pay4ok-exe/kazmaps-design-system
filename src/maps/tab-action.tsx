import type { ReactNode } from "react";

/* Замер макета: _Tab Action (76:342), три состояния. Подчёркивание в имени —
   служебный слой, поэтому наружу из кита не экспортируется: пункт всегда живёт
   внутри ряда (SegmentedRow) или рельса (NavRail).

   Колонка 64 шириной с gap 4: сверху иконочный чип 32 с радиусом 10 и
   паддингом 6, под ним подпись 10/12.

   Состояния:
     Inactive — чип background/secondary, иконка icon/secondary, подпись
                text/secondary весом 450;
     Hover    — чип тот же, иконка становится icon/accent, подпись не меняется;
     Active   — чип action/accent/primary, иконка icon/white, подпись text/link
                весом 550.

   Акцентом заливается ЧИП, а не кнопка целиком — до замера красилась кнопка
   вместе с подписью. */

export interface TabActionProps {
  label: string;
  icon: ReactNode;
  active: boolean;
  onSelect: () => void;
  /** Ряд сообщает о нажатии, рельс — о текущей странице. */
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
