"use client";

import type { ComponentProps } from "react";
import { useEffect, useId, useRef, useState } from "react";

import { IconCheckmark, IconChevronDown } from "../icons/generated";

export type SelectFieldOption = { value: string; label: string };

export type SelectFieldProps = Omit<ComponentProps<"button">, "onChange" | "value" | "children"> & {
  value: string;
  onChange: (value: string) => void;
  options: SelectFieldOption[];
  label?: string;
  bordered?: boolean;
  className?: string;
};

const RING_CLASSES = {
  quiet: "inset-ring-transparent hover:inset-ring-(--border-secondary)",
  bordered: "inset-ring-(--border-secondary) hover:inset-ring-(--border-primary)",
};

export function SelectField({
  value,
  onChange,
  options,
  label,
  bordered = false,
  className = "",
  id: idProp,
  disabled,
  onClick,
  onKeyDown,
  ...rest
}: SelectFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const listId = `${id}-list`;
  const optionId = (index: number) => `${id}-option-${String(index)}`;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(Math.max(0, selectedIndex));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector(`[data-index="${String(active)}"]`)?.scrollIntoView?.({
      block: "nearest",
    });
  }, [open, active]);

  const openAt = (index: number) => {
    setActive(Math.max(0, index));
    setOpen(true);
  };

  const commit = (index: number) => {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (open) setOpen(false);
    else openAt(selectedIndex);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.key === "Escape") {
      if (!open) return;
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openAt(selectedIndex);
      }
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      commit(active);
    }
  };

  const selected = options[selectedIndex];

  return (
    <div className={className}>
      {!label?.trim() ? null : (
        <label
          htmlFor={id}
          className="mb-(--spacing-gap-4) block text-xs leading-(--typography-line-height-16) text-(color:--text-secondary) [font-weight:var(--font-weight-medium)]"
        >
          {label}
        </label>
      )}
      <div ref={rootRef} className="relative">
        <button
          ref={triggerRef}
          id={id}
          {...rest}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-activedescendant={open && options.length > 0 ? optionId(active) : undefined}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={`flex h-(--dimension-height-28) w-full items-center gap-(--spacing-gap-4) rounded-(--dimension-corner-radius-6) inset-ring-[length:var(--stroke-border-1)] bg-(--background-primary) py-(--spacing-padding-6) pr-(--spacing-padding-6) pl-(--spacing-padding-8) transition-interactive focus-ring disabled:cursor-not-allowed ${
            open
              ? "inset-ring-(--border-focus)"
              : bordered
                ? RING_CLASSES.bordered
                : RING_CLASSES.quiet
          }`}
        >
          <span
            className={`min-w-0 flex-1 truncate text-left text-xs leading-(--typography-line-height-16) [font-weight:var(--font-weight-regular)] ${
              disabled === true
                ? "text-(color:--text-tertiary)"
                : open
                  ? "text-(color:--text-primary)"
                  : "text-(color:--text-secondary)"
            }`}
          >
            {selected?.label ?? ""}
          </span>
          <IconChevronDown
            size={16}
            className={`shrink-0 transition-interactive ${
              disabled === true
                ? "text-(color:--icon-tertiary)"
                : open
                  ? "rotate-180 text-(color:--icon-accent)"
                  : "text-(color:--icon-primary)"
            }`}
          />
        </button>

        {open ? (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label ?? rest["aria-label"]}
            className="absolute top-[calc(100%+var(--spacing-gap-4))] left-0 z-30 m-0 flex max-h-[268px] w-full list-none flex-col gap-(--spacing-gap-4) overflow-y-auto rounded-(--dimension-corner-radius-10) bg-(--background-primary) p-(--spacing-padding-8) shadow-(--shadow-modal) animate-modal-in"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  id={optionId(index)}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  onPointerDown={(event) => {
                    event.preventDefault();
                  }}
                  onClick={() => {
                    commit(index);
                  }}
                  onMouseEnter={() => {
                    setActive(index);
                  }}
                  className={`flex cursor-pointer items-center gap-(--spacing-gap-8) rounded-(--dimension-corner-radius-4) p-(--spacing-padding-6) text-xs leading-(--typography-line-height-16) [font-weight:var(--font-weight-regular)] ${
                    index === active ? "bg-(--background-secondary)" : ""
                  } ${isSelected ? "text-(color:--text-primary)" : "text-(color:--text-secondary)"}`}
                >
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  <span className="flex size-4 shrink-0 items-center justify-center text-(color:--icon-accent)">
                    {isSelected ? <IconCheckmark size={16} /> : null}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
