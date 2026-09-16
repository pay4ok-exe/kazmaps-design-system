"use client";

import { X } from "lucide-react";
import { type ReactNode, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { useFocusTrap } from "./use-focus-trap";

export type DialogSize = "sm" | "md";

const SIZE_CLASSES: Record<DialogSize, string> = {
  sm: "max-w-[400px]",
  md: "max-w-[440px]",
};

const subscribeNoop = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function DialogClose({ onClose, label }: { onClose: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClose}
      className="flex size-[28px] shrink-0 items-center justify-center rounded-(--dimension-corner-radius-8) bg-(--background-secondary) text-(color:--icon-secondary) transition-interactive focus-ring hover:bg-(--background-tertiary) hover:text-(color:--icon-primary) active:bg-(--background-tertiary) active:text-(color:--icon-tertiary)"
    >
      <X size={20} aria-hidden="true" />
    </button>
  );
}

export function Dialog({
  title,
  children,
  onClose,
  size = "md",
  closeLabel = "Закрыть",
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  size?: DialogSize;
  closeLabel?: string;
  className?: string;
}) {
  const panelRef = useFocusTrap(onClose);
  const onClient = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);
  if (!onClient) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="pointer-events-auto fixed inset-0 z-30 flex items-center justify-center p-4"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-(--overlay-modal-dialog)"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative w-full rounded-(--dimension-corner-radius-16) bg-(--background-primary) shadow-(--shadow-modal) outline-none ${SIZE_CLASSES[size]} ${className}`}
      >
        <header className="flex items-center gap-(--spacing-gap-8) px-(--spacing-padding-8) pt-(--spacing-padding-8)">
          <div className="min-w-0 flex-1 px-(--spacing-padding-8) py-(--spacing-padding-4)">
            <p className="truncate text-base leading-(--typography-line-height-20) text-(color:--text-primary) [font-weight:var(--font-weight-medium)]">
              {title}
            </p>
          </div>
          <DialogClose onClose={onClose} label={closeLabel} />
        </header>
        <div className="flex flex-col gap-(--spacing-gap-16) p-(--spacing-padding-16)">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
