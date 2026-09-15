import type { ReactNode } from "react";

import { TabAction } from "./tab-action";

/* Ряд пунктов _Tab Action (76:342). Сама разметка пункта — в tab-action.tsx:
   тот же пункт стоит в вертикальном рельсе NavRail, и держать его в двух
   местах значит гарантированно их разъехать. */

export interface SegmentedRowItem {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface SegmentedRowProps {
  items: SegmentedRowItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  label: string;
  className?: string;
}

export function SegmentedRow({
  items,
  activeId,
  onSelect,
  label,
  className = "",
}: SegmentedRowProps) {
  return (
    <div role="group" aria-label={label} className={`flex ${className}`}>
      {items.map((item) => (
        <TabAction
          key={item.id}
          label={item.label}
          icon={item.icon}
          active={item.id === activeId}
          selection="pressed"
          onSelect={() => {
            onSelect(item.id);
          }}
        />
      ))}
    </div>
  );
}
