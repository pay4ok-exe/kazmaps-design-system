import type { ReactNode } from "react";

import { TabAction } from "./tab-action";

export interface NavRailItem {
  id: string;
  label: string;
  icon: ReactNode;
  onSelect: () => void;
}

export interface NavRailProps {
  items: NavRailItem[];
  secondaryItems?: NavRailItem[];
  activeId: string | null;
  label: string;
  className?: string;
}

export function NavRail({
  items,
  secondaryItems = [],
  activeId,
  label,
  className = "",
}: NavRailProps) {
  return (
    <nav
      aria-label={label}
      className={`flex h-full w-(--dimension-width-64) flex-col justify-between bg-(--background-primary) py-(--spacing-padding-16) ${className}`}
    >
      <div className="flex flex-col gap-(--spacing-gap-20)">
        {items.map((item) => (
          <TabAction
            key={item.id}
            label={item.label}
            icon={item.icon}
            active={item.id === activeId}
            selection="current"
            onSelect={item.onSelect}
          />
        ))}
      </div>
      {secondaryItems.length === 0 ? null : (
        <div className="flex flex-col gap-(--spacing-gap-20)">
          {secondaryItems.map((item) => (
            <TabAction
              key={item.id}
              label={item.label}
              icon={item.icon}
              active={item.id === activeId}
              selection="current"
              onSelect={item.onSelect}
            />
          ))}
        </div>
      )}
    </nav>
  );
}
