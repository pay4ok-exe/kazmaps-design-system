"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { TabAction } from "./tab-action";

export interface NavBarItem {
  id: string;
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  onSelect: () => void;
}

export interface NavBarProps {
  items: NavBarItem[];
  secondaryItems?: NavBarItem[];
  activeId?: string | null;
  defaultActiveId?: string | null;
  label: string;
  className?: string;
}

export function NavBar({
  items,
  secondaryItems = [],
  activeId: activeIdProp,
  defaultActiveId = null,
  label,
  className = "",
}: NavBarProps) {
  const controlled = activeIdProp !== undefined;
  const [ownActiveId, setOwnActiveId] = useState(defaultActiveId);
  const activeId = controlled ? activeIdProp : ownActiveId;

  const select = (item: NavBarItem) => {
    if (!controlled) setOwnActiveId(item.id);
    item.onSelect();
  };

  const group = (list: NavBarItem[]) => (
    <div className="flex flex-col gap-(--spacing-gap-20)">
      {list.map((item) => (
        <TabAction
          key={item.id}
          label={item.label}
          icon={item.id === activeId ? (item.activeIcon ?? item.icon) : item.icon}
          active={item.id === activeId}
          selection="current"
          onSelect={() => {
            select(item);
          }}
        />
      ))}
    </div>
  );

  return (
    <nav
      aria-label={label}
      className={`flex h-full w-(--dimension-width-64) flex-col justify-between bg-(--background-primary) py-(--spacing-padding-16) ${className}`}
    >
      {group(items)}
      {secondaryItems.length === 0 ? null : group(secondaryItems)}
    </nav>
  );
}
