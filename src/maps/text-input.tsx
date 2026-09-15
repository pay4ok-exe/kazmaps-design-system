"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

/* Замер макета: Contact Input, Type=Email (148:721), четыре состояния. Паддинг
   8/12, радиус 10, фон background/secondary, текст 16/20 весом 400. Высота 36
   складывается из паддингов и строки, числом не задана.

   Состояния меняют рамку: Default — нет, Hover — border/secondary,
   Focus — border/focus, Error — border/error. В ошибке макет красит и САМ ТЕКСТ
   поля в text/danger, не только рамку — это замер, а не вольность.

   Сообщения об ошибке у поля нет и не будет: в KazMaps текст ошибки показывает
   тост. Поле несёт только визуальное состояние, поэтому проп булев. */

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  /** Визуальное состояние ошибки. Текст показывает тост, не поле. */
  invalid?: boolean;
  prefix?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

export function TextInput({
  value,
  onChange,
  label,
  invalid = false,
  prefix,
  trailing,
  className = "",
  ...rest
}: TextInputProps) {
  const id = useId();

  return (
    <div className={className}>
      {label == null ? null : (
        <label
          htmlFor={id}
          className="mb-(--spacing-gap-4) block text-xs leading-(--typography-line-height-16) text-(color:--text-secondary) [font-weight:var(--font-weight-medium)]"
        >
          {label}
        </label>
      )}
      <div
        /* Рамка прозрачна, а не отсутствует: в макете она появляется только с
           наведением, а при border-box её появление сдвинуло бы текст. */
        className={`flex items-center gap-(--spacing-gap-8) overflow-hidden rounded-(--dimension-corner-radius-10) border-(length:--stroke-border-1) border-solid bg-(--background-secondary) px-(--spacing-padding-12) py-(--spacing-padding-8) transition-surface ${
          invalid
            ? "border-(--border-error)"
            : "border-transparent hover:border-(--border-secondary) has-[input:focus]:border-(--border-focus)"
        }`}
      >
        {prefix == null ? null : (
          // Префикса в макете нет — остался от кита, на нём стоят формы main-web.
          <span className="shrink-0 text-base leading-(--typography-line-height-20) text-(color:--text-tertiary)">
            {prefix}
          </span>
        )}
        <input
          id={id}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          aria-invalid={invalid || undefined}
          className={`min-w-0 flex-1 bg-transparent text-base leading-(--typography-line-height-20) outline-none [font-weight:var(--font-weight-regular)] placeholder:text-(color:--text-tertiary) ${
            invalid ? "text-(color:--text-danger)" : "text-(color:--text-primary)"
          }`}
          {...rest}
        />
        {trailing == null ? null : <span className="shrink-0">{trailing}</span>}
      </div>
    </div>
  );
}
