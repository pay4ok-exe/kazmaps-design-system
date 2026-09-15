"use client";

import { useRef } from "react";

/* Замер макета: Code Input Cell (149:836), четыре состояния. Ячейка 40×48,
   радиус 10, паддинг 12 сверху и снизу, фон background/secondary, цифра 20/24
   весом 400. Обводка здесь ПОЛУТОРНАЯ — единственное место, где используется
   роль stroke/border/1_5.

   Состояния: Default — рамки нет, Filled — border/primary, Focus — border/focus
   и каретка цветом text/accent, Error — border/error и цифра text/danger.

   Кегль 20 и интерлиньяж 24 в коллекцию numerics не входят (там 10/12/14/16 и
   12/16/18/20) — записаны произвольными значениями, см. docs/figma-deltas.md,
   пункт 7. */

export interface CodeInputProps {
  /** По одной ячейке на элемент; длина массива задаёт длину кода. */
  values: string[];
  onChange: (index: number, digit: string) => void;
  /** Подсвечивает все ячейки ошибкой: в макете это состояние Error. */
  invalid?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  /** Шаблон подписи ячейки для скринридера. */
  digitLabel?: (index: number, total: number) => string;
  className?: string;
}

const defaultDigitLabel = (index: number, total: number) =>
  `Цифра ${String(index + 1)} из ${String(total)}`;

export function CodeInput({
  values,
  onChange,
  invalid = false,
  autoFocus,
  disabled,
  digitLabel = defaultDigitLabel,
  className = "",
}: CodeInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const length = values.length;

  return (
    /* Зазор между ячейками макетом не задан: 149:836 — это витрина четырёх
       СОСТОЯНИЙ одной ячейки, а не собранное поле кода. Взята десятка, на
       которой уже стоят экраны входа main-web. */
    <div className={`flex gap-(--spacing-gap-10) ${className}`}>
      {values.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          aria-label={digitLabel(i, length)}
          aria-invalid={invalid || undefined}
          autoFocus={autoFocus && i === 0}
          disabled={disabled}
          autoComplete={i === 0 ? "one-time-code" : "off"}
          value={digit}
          onChange={(e) => {
            const next = e.target.value.replace(/\D/g, "").slice(-1);
            onChange(i, next);
            if (next && i < length - 1) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digit && i > 0) {
              refs.current[i - 1]?.focus();
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
            if (pasted.length === 0) return;
            for (let i2 = 0; i2 < length; i2 += 1) {
              onChange(i2, pasted[i2] ?? "");
            }
            refs.current[Math.min(pasted.length, length - 1)]?.focus();
          }}
          /* Каретка макета — text/accent. Свойством caret-color это делается
             надёжнее, чем отрисовкой своей палочки поверх поля. */
          style={{ caretColor: "var(--text-accent)" }}
          /* Ширина 40 — роль макета; высота 48 и интерлиньяж 24 ролей не имеют
             (dimension/height идёт 40 → 64, line-height обрывается на 20).
             Вертикальный паддинг 12 из макета здесь не нужен: при border-box он
             съел бы 3 пикселя под обводку и подрезал строку — фиксированная
             высота даёт ровно те же 48. */
          className={`h-[48px] w-(--dimension-width-40) rounded-(--dimension-corner-radius-10) border-(length:--stroke-border-1_5) border-solid bg-(--background-secondary) text-center text-[20px] leading-[24px] transition-interactive outline-none [font-weight:var(--font-weight-regular)] ${
            invalid
              ? "border-(--border-error) text-(color:--text-danger)"
              : `text-(color:--text-primary) focus:border-(--border-focus) ${
                  digit ? "border-(--border-primary)" : "border-transparent"
                }`
          }`}
        />
      ))}
    </div>
  );
}
