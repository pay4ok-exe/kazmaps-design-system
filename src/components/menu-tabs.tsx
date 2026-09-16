"use client";

import type { ReactNode } from "react";

import { PillTabs, type PillTabsOption } from "./pill-tabs";

export interface MenuTabsProps {
  title: string;
  icon?: ReactNode;
  options: PillTabsOption[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function MenuTabs({
  title,
  icon,
  options,
  activeId,
  onSelect,
  className = "",
}: MenuTabsProps) {
  return (
    <div className={`flex flex-col gap-(--spacing-gap-4) ${className}`}>
      <div className="flex items-center gap-(--spacing-gap-4) pt-(--spacing-padding-4) pr-(--spacing-padding-8) pb-(--spacing-padding-4) pl-(--spacing-padding-6)">
        <p className="min-w-0 flex-1 truncate text-xs leading-(--typography-line-height-16) text-(color:--text-secondary) [font-weight:var(--font-weight-medium)]">
          {title}
        </p>
        {icon == null ? null : (
          <span className="flex size-4 shrink-0 items-center justify-center text-(color:--icon-tertiary)">
            {icon}
          </span>
        )}
      </div>
      <PillTabs
        size="menu"
        label={title}
        options={options}
        activeId={activeId}
        onSelect={onSelect}
      />
    </div>
  );
}
