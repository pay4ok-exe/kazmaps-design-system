"use client";

/* Замер макета: Toggle Switch (141:612) и его внутренний _Toggle Option (141:604).
   Трек — высота 40, радиус 12, паддинг 2, gap 2, фон background/toggle. Пункт —
   высота 36, паддинг 8/12, текст 16/20 весом 400. Индикатор — радиус 10, фон
   background/primary, размером ровно в пункт.

   Подчёркивание в имени _Toggle Option означает служебный слой макета, поэтому
   наружу пункт не экспортируется — он часть трека.

   В макете пунктов ровно два, но раскладка обобщается на любое их число без
   допущений: ширина и сдвиг индикатора считаются от количества. Это дешевле,
   чем защищаться от третьего пункта рантайм-проверкой. */

export type ToggleSwitchOption = { id: string; label: string };

export interface ToggleSwitchProps {
  options: ToggleSwitchOption[];
  activeId: string;
  onSelect: (id: string) => void;
  /** Назначение переключателя для скринридера. */
  label: string;
  className?: string;
}

export function ToggleSwitch({
  options,
  activeId,
  onSelect,
  label,
  className = "",
}: ToggleSwitchProps) {
  const activeIndex = options.findIndex((option) => option.id === activeId);

  return (
    <div
      role="group"
      aria-label={label}
      className={`relative flex gap-(--spacing-gap-2) rounded-(--dimension-corner-radius-12) bg-(--background-toggle) p-(--spacing-padding-2) ${className}`}
    >
      {/* Индикатор идёт первым в потоке и потому оказывается под подписями:
          в макете он подложка, а не наклейка поверх текста. */}
      {activeIndex < 0 ? null : (
        <span
          aria-hidden="true"
          className="absolute top-(--spacing-padding-2) bottom-(--spacing-padding-2) left-(--spacing-padding-2) rounded-(--dimension-corner-radius-10) bg-(--background-primary) transition-[translate] duration-(--motion-panel) ease-(--ease-standard)"
          style={{
            width: `calc((100% - 2 * var(--spacing-padding-2) - ${options.length - 1} * var(--spacing-gap-2)) / ${options.length})`,
            translate: `calc(${activeIndex} * (100% + var(--spacing-gap-2)))`,
          }}
        />
      )}
      {options.map((option) => {
        const active = option.id === activeId;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => {
              onSelect(option.id);
            }}
            /* Hover и Active в макете — одно и то же состояние подписи
               (_Toggle Option: State=Hover / Active), поэтому hover красит текст
               так же, как выбор. */
            className={`relative flex-1 rounded-(--dimension-corner-radius-10) px-(--spacing-padding-12) py-(--spacing-padding-8) text-base leading-(--typography-line-height-20) transition-interactive [font-weight:var(--font-weight-regular)] focus-ring ${
              active
                ? "text-(color:--text-primary)"
                : "text-(color:--text-tertiary) hover:text-(color:--text-primary)"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
