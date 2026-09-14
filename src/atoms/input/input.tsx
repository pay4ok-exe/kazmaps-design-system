"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, type ReactNode, useId, useState } from "react";

import { cn } from "../../lib/cn";

/** Built-in light formatting for non-phone fields; phone numbers use `PhoneInput`. */
export type InputMask = "email" | "bin" | "url";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  /** `email` sets the input type; `bin` keeps 12 digits; `url` normalises on blur. */
  mask?: InputMask;
  revealable?: boolean;
  /** Подпись reveal-кнопки в состоянии «пароль скрыт». */
  revealLabel?: string;
  /** Подпись reveal-кнопки в состоянии «пароль виден». */
  hideLabel?: string;
};

function formatBin(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 12);
}

/** Normalize a URL on blur: strip spaces, prepend https:// when no scheme. Empty stays empty. */
function normalizeUrl(raw: string): string {
  const v = raw.trim().replace(/\s+/g, "");
  if (!v) return "";
  return /^[a-z][\w+.-]*:\/\//i.test(v) ? v : `https://${v}`;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    required,
    startIcon,
    endIcon,
    mask,
    revealable = false,
    revealLabel = "Показать пароль",
    hideLabel = "Скрыть пароль",
    className,
    type,
    onChange,
    onBlur,
    id: idProp,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descId = `${id}-desc`;

  const [revealed, setRevealed] = useState(false);

  const hasError = Boolean(error);
  const hasDesc = Boolean(error ?? hint);
  const isPassword = type === "password";

  const resolvedType =
    isPassword && revealable ? (revealed ? "text" : "password") : mask === "email" ? "email" : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mask === "bin") {
      e.target.value = formatBin(e.target.value);
    }
    onChange?.(e);
  };

  // URL is normalized on blur (not per-keystroke) so typing isn't disrupted; the
  // synthesized onChange pushes the normalized value into RHF before onBlur.
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (mask === "url") {
      e.target.value = normalizeUrl(e.target.value);
      onChange?.(e);
    }
    onBlur?.(e);
  };

  const inputClassName = cn(
    "h-full w-full bg-transparent text-[length:var(--text-sm)] text-[var(--ink)]",
    "placeholder:text-[var(--muted)] outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    startIcon && "pl-6",
    (endIcon ?? (isPassword && revealable)) && "pr-6",
    className,
  );

  const inputEl = (
    <input
      ref={ref}
      id={id}
      type={resolvedType}
      required={required}
      aria-describedby={hasDesc ? descId : undefined}
      aria-invalid={hasError || undefined}
      onChange={mask ? handleChange : onChange}
      onBlur={mask === "url" ? handleBlur : onBlur}
      className={inputClassName}
      {...rest}
    />
  );

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-[length:var(--text-sm)] font-medium text-[var(--ink)]">
          {label}
          {required && (
            <span className="ml-0.5 text-[var(--danger)]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div
        className={cn(
          "relative flex h-9 items-center",
          "rounded-[var(--radius-md)] border bg-[var(--card)] px-3",
          "transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
          hasError
            ? [
                "border-[var(--danger)]",
                "focus-within:ring-2 focus-within:ring-[var(--danger)] focus-within:border-transparent",
              ]
            : [
                "border-[var(--line)]",
                "focus-within:ring-2 focus-within:ring-[var(--brand)] focus-within:border-transparent",
              ],
        )}
      >
        {startIcon && (
          <span className="pointer-events-none absolute left-3 flex items-center text-[var(--muted)]">
            {startIcon}
          </span>
        )}

        {inputEl}

        {isPassword && revealable ? (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            className={cn(
              "absolute right-3 flex items-center rounded-[var(--radius-sm)] text-[var(--muted)] hover:text-[var(--ink)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
            )}
            aria-label={revealed ? hideLabel : revealLabel}
          >
            {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : (
          endIcon && (
            <span className="pointer-events-none absolute right-3 flex items-center text-[var(--muted)]">
              {endIcon}
            </span>
          )
        )}
      </div>

      {hasDesc && (
        <p
          id={descId}
          className={cn(
            "text-[length:var(--text-xs)]",
            hasError ? "text-[var(--danger)]" : "text-[var(--muted)]",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
