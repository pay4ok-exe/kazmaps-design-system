"use client";

import { ChevronDown } from "lucide-react";
import { useId } from "react";
import InputMask from "react-input-mask-format";

import { DEFAULT_REGION, type RegionCode } from "../data/regions";
import {
  DEFAULT_LABELS,
  type PhoneInputLabels,
  type PhoneValue,
  RegionFlag,
  usePhoneMask,
} from "../lib/phone-input-core";
import { RegionPicker } from "./region-picker";

export type { PhoneValue };

export type PhoneInputProps = {
  value?: string;
  defaultValue?: string;
  defaultRegion?: RegionCode;
  onChange?: (value: PhoneValue) => void;
  onRegionChange?: (region: RegionCode) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  regions?: RegionCode[];
  locale?: "ru" | "en";
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  name?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  labels?: Partial<PhoneInputLabels>;
  className?: string;
};

export function PhoneInput({
  value: valueProp,
  defaultValue,
  defaultRegion = DEFAULT_REGION,
  onChange,
  onRegionChange,
  onFocus,
  onBlur,
  regions: regionCodes,
  locale = "ru",
  label,
  hint,
  error,
  required,
  disabled,
  readOnly,
  id: idProp,
  name,
  autoFocus,
  autoComplete = "tel-national",
  labels: labelsProp,
  className = "",
}: PhoneInputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descId = `${id}-desc`;
  const pickerId = `${id}-picker`;
  const labels = { ...DEFAULT_LABELS, ...labelsProp };

  const {
    region,
    mask,
    formatted,
    open,
    setOpen,
    available,
    inputRef,
    containerRef,
    beforeMaskedStateChange,
    handleChange,
    selectRegion,
    closePicker,
  } = usePhoneMask({
    value: valueProp,
    defaultValue,
    defaultRegion,
    regions: regionCodes,
    onChange,
    onRegionChange,
  });

  const hasError = Boolean(error);
  const description = error ?? hint;
  const hasDesc = Boolean(description);

  return (
    <div className={className}>
      {label == null ? null : (
        <label
          htmlFor={id}
          className="mb-(--spacing-gap-4) block text-xs leading-(--typography-line-height-16) text-(color:--text-secondary) [font-weight:var(--font-weight-medium)]"
        >
          {label}
          {required ? (
            <span className="ml-0.5 text-(color:--text-danger)" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <div
          className={`flex items-center gap-(--spacing-gap-8) overflow-hidden rounded-(--dimension-corner-radius-10) border-(length:--stroke-border-1) border-solid bg-(--background-secondary) py-(--spacing-padding-4) pr-(--spacing-padding-8) pl-(--spacing-padding-4) transition-surface ${
            hasError
              ? "border-(--border-error)"
              : "border-transparent hover:border-(--border-secondary) has-[input:focus]:border-(--border-focus)"
          } ${disabled ? "opacity-50" : ""}`}
        >
          <button
            type="button"
            disabled={Boolean(disabled) || Boolean(readOnly)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? `${pickerId}-list` : undefined}
            aria-label={`${labels.region}: ${locale === "en" ? region.nameEn : region.name}`}
            title={locale === "en" ? region.nameEn : region.name}
            onMouseDown={(event) => {
              if (open) event.preventDefault();
            }}
            onClick={() => {
              setOpen((v) => !v);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setOpen(true);
              }
            }}
            className="flex shrink-0 items-center gap-(--spacing-gap-4) rounded-(--dimension-corner-radius-6) bg-(--background-primary) py-(--spacing-padding-6) pr-(--spacing-padding-6) pl-(--spacing-padding-8) text-xs leading-(--typography-line-height-16) text-(color:--text-primary) focus-ring"
          >
            <RegionFlag iso={region.iso} size={16} />
            <span className="tabular-nums">+{region.dial}</span>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          <InputMask
            ref={inputRef}
            mask={mask}
            maskPlaceholder={region.mask ? "_" : null}
            value={formatted}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
            readOnly={readOnly}
            beforeMaskedStateChange={beforeMaskedStateChange}
          >
            <input
              id={id}
              name={name}
              type="tel"
              inputMode="tel"
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              required={required}
              placeholder={region.mask ? region.mask.replace(/9/g, "_") : undefined}
              aria-describedby={hasDesc ? descId : undefined}
              aria-invalid={hasError || undefined}
              className={`min-w-0 flex-1 bg-transparent text-base leading-(--typography-line-height-20) outline-none [font-weight:var(--font-weight-regular)] placeholder:text-(color:--text-tertiary) ${hasError ? "text-(color:--text-danger)" : "text-(color:--text-primary)"}`}
            />
          </InputMask>
        </div>

        {open ? (
          <RegionPicker
            id={pickerId}
            regions={available}
            value={region.iso}
            locale={locale}
            labels={labels}
            onSelect={selectRegion}
            onClose={closePicker}
          />
        ) : null}
      </div>

      {hasDesc ? (
        <p
          id={descId}
          className={`mt-(--spacing-gap-4) text-xs leading-(--typography-line-height-16) ${
            hasError ? "text-(color:--text-danger)" : "text-(color:--text-tertiary)"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
