import type { ComponentProps, ReactNode } from "react";

/* Замер макета: Figma «KazMaps Design System», компонент-сет Button (147:271),
   20 вариантов State × Type × Icon. Геометрия у всех двадцати одинаковая:
   высота 40, радиус 10, обводка 1, кегль 16/20. Различаются только заливка,
   стопы градиентной обводки и — при Icon=True — правый паддинг и gap.

   Расхождения макета с самим собой — identical hover и отсутствие outline —
   разобраны в docs/figma-deltas.md, раздел «Кнопка». */

export type ButtonVariant = "accent" | "neutral" | "danger" | "outline" | "outline-accent";
export type ButtonSize = "sm" | "md" | "lg";

/* State=Hover в макете побайтово равен State=Default — совпадают заливка, стопы
   градиента и его трансформация у всех трёх типов. Наводить hover «на глаз»
   здесь нельзя, поэтому отдельного hover-стиля нет: кнопка меняется только на
   нажатии. Как только дизайнер разведёт состояния, hover добавляется сюда. */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  accent: [
    "btn-surface text-(color:--text-white)",
    "[--btn-fill:var(--action-accent-primary)]",
    "[--btn-ring-from:var(--action-accent-subtle)]",
    "[--btn-ring-to:var(--action-accent-secondary)]",
    "active:[--btn-fill:var(--action-accent-secondary)]",
    "active:[--btn-ring-from:var(--action-accent-secondary)]",
    "active:[--btn-ring-to:var(--action-accent-secondary)]",
  ].join(" "),
  neutral: [
    "btn-surface text-(color:--text-white)",
    "[--btn-fill:var(--action-neutral-primary)]",
    "[--btn-ring-from:var(--action-neutral-subtle)]",
    "[--btn-ring-to:var(--action-neutral-secondary)]",
    "active:[--btn-fill:var(--action-neutral-secondary)]",
    "active:[--btn-ring-from:var(--action-neutral-secondary)]",
    "active:[--btn-ring-to:var(--action-neutral-secondary)]",
  ].join(" "),
  danger: [
    "btn-surface text-(color:--text-white)",
    "[--btn-fill:var(--action-danger-primary)]",
    "[--btn-ring-from:var(--action-danger-subtle)]",
    // Нижний стоп у danger — action/danger/hover (та же #da1e28, но 50% альфы),
    // тогда как у accent и neutral там secondary. Так в макете; замер, не описка.
    "[--btn-ring-to:var(--action-danger-hover)]",
    "active:[--btn-fill:var(--action-danger-secondary)]",
    "active:[--btn-ring-from:var(--action-danger-secondary)]",
    "active:[--btn-ring-to:var(--action-danger-secondary)]",
  ].join(" "),

  /* outline и outline-accent в макете отсутствуют, а в main-web это 45 из 77
     вызовов Button. Оставлены как есть по геометрии и переведены на новые роли —
     до появления макета это единственный вариант, не ломающий экраны. */
  outline: [
    "border-(length:--stroke-border-1) border-solid border-(--border-primary)",
    "bg-(--background-primary) text-(color:--text-secondary)",
    "active:bg-(--background-secondary) active:text-(color:--text-primary)",
  ].join(" "),
  "outline-accent": [
    "border-(length:--stroke-border-1) border-solid border-(--border-primary)",
    "bg-(--background-primary) text-(color:--text-accent)",
    "active:bg-(--background-secondary)",
  ].join(" "),
};

/* disabled в макете снят только для Accent, но заливка action/disabled и текст
   text/tertiary — роли не типовые, поэтому применяются ко всем вариантам. */
const DISABLED_CLASSES = [
  "disabled:cursor-not-allowed",
  "disabled:[--btn-fill:var(--action-disabled)]",
  "disabled:[--btn-ring-from:var(--action-disabled)]",
  "disabled:[--btn-ring-to:var(--action-disabled)]",
  "disabled:border-(--action-disabled) disabled:bg-(--action-disabled)",
  "disabled:text-(color:--text-tertiary)",
].join(" ");

/* В макете размер ровно один — 40px, и это md. Паддинги там же: Icon=False даёт
   12 с обеих сторон, Icon=True — слева 12, справа 10, gap 6 (асимметрия именно
   такая, у всех десяти иконочных вариантов).

   sm и lg источника не имеют. Их высоты 34 и 44 не ложатся даже на шкалу макета —
   dimension/height идёт 28 → 40 → 64, — поэтому остаются произвольными
   значениями, а не подгоняются к ближайшей ступени: подгонка изменила бы
   вёрстку 55 экранов ради красоты числа. */
type SizeSpec = { base: string; textOnly: string; withIcon: string };

const SIZE_CLASSES: Record<ButtonSize, SizeSpec> = {
  sm: { base: "h-[34px] text-[12.5px]", textOnly: "px-3.5", withIcon: "px-3.5 gap-1.5" },
  md: {
    base: "h-(--dimension-height-40) text-base leading-(--typography-line-height-20)",
    textOnly: "px-(--spacing-padding-12)",
    withIcon: "pl-(--spacing-padding-12) pr-(--spacing-padding-10) gap-(--spacing-gap-6)",
  },
  lg: { base: "h-11 text-[13.5px]", textOnly: "px-4", withIcon: "px-4 gap-2" },
};

/* Вес текста в макете зависит от наличия иконки: без неё Medium 500, с ней
   Regular 450. Воспроизведено буквально — разница в полступени переменного Inter
   не стоит того, чтобы спорить с замером. Что это похоже на недосмотр
   дизайнера — записано в docs/figma-deltas.md. */
const WEIGHT_CLASSES = {
  withIcon: "[font-weight:var(--font-weight-book)]",
  textOnly: "[font-weight:var(--font-weight-medium)]",
};

export function Button({
  children,
  icon,
  variant = "accent",
  size = "md",
  fullWidth = false,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  children: ReactNode;
  /** Иконка справа от текста. Меняет правый паддинг и включает gap — так в макете. */
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}) {
  const sizing = SIZE_CLASSES[size];
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex items-center justify-center rounded-(--dimension-corner-radius-10) whitespace-nowrap transition-interactive focus-ring ${sizing.base} ${icon ? `${sizing.withIcon} ${WEIGHT_CLASSES.withIcon}` : `${sizing.textOnly} ${WEIGHT_CLASSES.textOnly}`} ${VARIANT_CLASSES[variant]} ${DISABLED_CLASSES} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
      {icon}
    </button>
  );
}
