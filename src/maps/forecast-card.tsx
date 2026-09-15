import type { ReactNode } from "react";

/* Замер макета: Forecast Card (179:199), четыре варианта Time(Current|Future) ×
   Type(Hourly|Weekly). Ширина 64, паддинг 4/4/6/4 — снизу шестёрка, — gap 4,
   радиус 8, фон background/secondary. Пиктограмма 32.

   Time и Type меняют разное, и их легко перепутать:
     Type=Weekly добавляет строку дня (10/12 весом 450, text/secondary) между
       заголовком и пиктограммой — отсюда высота 112 против 96;
     Time=Current делает ЗАГОЛОВОК тяжелее (500 против 400) и поднимает
       осадки с text/tertiary до text/secondary.
   То есть «текущее» подчёркнуто не заливкой, а весом и контрастом. */

export interface ForecastCardProps {
  /** Час или дата — верхняя строка. */
  title: ReactNode;
  /** День недели: только для недельного прогноза. */
  day?: ReactNode;
  /** Пиктограмма 32×32; цвет задаёт вызывающий ролью weather/*. */
  icon: ReactNode;
  temperature: ReactNode;
  /** Вероятность осадков. */
  precipitation: ReactNode;
  /** Текущий час или день — выделяется весом заголовка, а не фоном. */
  current?: boolean;
  className?: string;
}

export function ForecastCard({
  title,
  day,
  icon,
  temperature,
  precipitation,
  current = false,
  className = "",
}: ForecastCardProps) {
  return (
    <div
      className={`flex w-(--dimension-width-64) flex-col items-center gap-(--spacing-gap-4) rounded-(--dimension-corner-radius-8) bg-(--background-secondary) px-(--spacing-padding-4) pt-(--spacing-padding-4) pb-(--spacing-padding-6) ${className}`}
    >
      <span
        className={`text-xs leading-(--typography-line-height-16) text-(color:--text-primary) ${
          current
            ? "[font-weight:var(--font-weight-medium)]"
            : "[font-weight:var(--font-weight-regular)]"
        }`}
      >
        {title}
      </span>
      {day == null ? null : (
        <span className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-secondary) [font-weight:var(--font-weight-book)]">
          {day}
        </span>
      )}
      <span className="flex size-[32px] items-center justify-center">{icon}</span>
      <span className="flex flex-col items-center gap-(--spacing-gap-2)">
        <span className="text-xs leading-(--typography-line-height-16) text-(color:--text-primary) [font-weight:var(--font-weight-regular)]">
          {temperature}
        </span>
        <span
          className={`text-[10px] leading-(--typography-line-height-12) [font-weight:var(--font-weight-book)] ${
            current ? "text-(color:--text-secondary)" : "text-(color:--text-tertiary)"
          }`}
        >
          {precipitation}
        </span>
      </span>
    </div>
  );
}
