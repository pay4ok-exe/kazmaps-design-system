import type { ReactNode } from "react";

/* Замер макета: Category Label (81:181). Радиус 10, фон background/primary,
   gap 6, текст 12/16 весом 450 цветом text/primary. Паддинг несимметричный —
   2/6/2/2: слева всего 2, потому что там стоит иконочный чип 24 с собственным
   паддингом 4 и радиусом 8, залитый tag/gray.

   Высота 28 числом нигде не задана: она складывается из паддингов и чипа
   (2 + 24 + 2), поэтому и здесь не фиксируется. */

/* Welcome Label (157:895) из секции Login — тот же чип с точностью до двух
   заливок: поверхность background/secondary вместо primary и иконочный чип
   tag/blue вместо tag/gray. Геометрия совпадает полностью, поэтому это тон, а
   не отдельный компонент. */
export type ChipTone = "neutral" | "info";

export interface ChipProps {
  label: string;
  /** Иконка в чипе слева. В макете она есть всегда; без неё паддинг симметричный. */
  icon?: ReactNode;
  /** neutral — Category Label, info — Welcome Label. */
  tone?: ChipTone;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

const TONE = {
  neutral: { surface: "bg-(--background-primary)", badge: "bg-(--tag-gray)" },
  info: { surface: "bg-(--background-secondary)", badge: "bg-(--tag-blue)" },
};

/* Без иконки паддинг слева измерить негде — в макете такого варианта нет.
   Берём измеренную правую шестёрку на обе стороны: так высота остаётся теми же
   28 (6 + 16 + 6), что и с иконкой. */
const PADDING = {
  withIcon: "py-(--spacing-padding-2) pr-(--spacing-padding-6) pl-(--spacing-padding-2)",
  textOnly: "px-(--spacing-padding-6) py-(--spacing-padding-6)",
};

/* active в макете отсутствует: Category Label снят только в Default и Hover.
   Вариант оставлен от кита и переведён на новые роли — на него опираются
   фильтры в main-web. */
const STATE = {
  active: "border-(--action-accent-primary) text-(color:--text-accent)",
  idle: "border-transparent text-(color:--text-primary) hover:border-(--border-secondary)",
};

export function Chip({
  label,
  icon,
  tone = "neutral",
  active = false,
  onClick,
  className = "",
}: ChipProps) {
  const palette = TONE[tone];
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center gap-(--spacing-gap-6) rounded-(--dimension-corner-radius-10) border-(length:--stroke-border-1) border-solid text-xs leading-(--typography-line-height-16) transition-interactive [font-weight:var(--font-weight-book)] focus-ring ${palette.surface} ${
        icon ? PADDING.withIcon : PADDING.textOnly
      } ${active ? STATE.active : STATE.idle} ${className}`}
    >
      {icon == null ? null : (
        <span
          className={`inline-flex size-(--dimension-width-24) shrink-0 items-center justify-center rounded-(--dimension-corner-radius-8) p-(--spacing-padding-4) text-(color:--icon-white) ${palette.badge}`}
        >
          {icon}
        </span>
      )}
      {label}
    </button>
  );
}
