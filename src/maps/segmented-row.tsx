import type { ReactNode } from "react";

import { TabAction } from "./tab-action";

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
