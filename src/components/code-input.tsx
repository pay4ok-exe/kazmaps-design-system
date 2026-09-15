"use client";

import { useRef } from "react";

export interface CodeInputProps {
  values: string[];
  onChange: (index: number, digit: string) => void;
  invalid?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
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
    <div className={`flex gap-(--spacing-gap-10) ${className}`}>
      {values.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          aria-label={digitLabel(i, length)}
          aria-invalid={invalid || undefined}
          autoFocus={autoFocus && i === 0}
          disabled={disabled}
          autoComplete={i === 0 ? "one-time-code" : "off"}
          value={digit}
          onFocus={(e) => {
            e.target.select();
          }}
          onChange={(e) => {
            const typed = e.target.value.replace(/\D/g, "");
            if (typed.length > 1 && !(digit !== "" && typed.length === 2)) {
              const spread = typed.slice(0, length - i);
              for (let k = 0; k < spread.length; k += 1) onChange(i + k, spread.charAt(k));
              refs.current[Math.min(i + spread.length, length - 1)]?.focus();
              return;
            }
            const next = typed.length === 2 ? typed.charAt(typed.startsWith(digit) ? 1 : 0) : typed;
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
          style={{ caretColor: "var(--text-accent)" }}
          className={`w-(--dimension-width-40) rounded-(--dimension-corner-radius-10) inset-ring-[length:var(--stroke-border-1_5)] bg-(--background-secondary) py-(--spacing-padding-12) text-center text-[20px] leading-[24px] transition-interactive outline-none [font-weight:var(--font-weight-regular)] ${
            invalid
              ? "inset-ring-(--border-error) text-(color:--text-danger)"
              : `text-(color:--text-primary) focus:inset-ring-(--border-focus) ${
                  digit ? "inset-ring-(--border-primary)" : "inset-ring-transparent"
                }`
          }`}
        />
      ))}
    </div>
  );
}
