import type { ReactNode } from "react";

import { TabAction } from "./tab-action";

/* Замер макета: Nav bar (134:406), четыре варианта — по одному на активную
   вкладку. Рельс 64 шириной, паддинг 16 сверху и снизу, фон background/primary,
   раскладка вертикальная со SPACE_BETWEEN: основные действия прижаты вверх,
   второстепенные вниз. Внутри групп gap 20.

   Высота 1024 в макете — это высота холста варианта, а не свойство компонента:
   SPACE_BETWEEN работает только когда рельс тянется на всю доступную высоту,
   поэтому здесь h-full, а не число.

   Пункт — тот же _Tab Action, что и в SegmentedRow, поэтому его разметка
   лежит в tab-action.tsx и здесь только переиспользуется. Отличается лишь то,
   как сообщается выбор: ряд говорит о нажатии, рельс — о текущей странице. */

export interface NavRailItem {
  id: string;
  label: string;
  icon: ReactNode;
  onSelect: () => void;
}

export interface NavRailProps {
  items: NavRailItem[];
  /** Нижняя группа: в макете это «Установить приложение». */
  secondaryItems?: NavRailItem[];
  activeId: string | null;
  /** Назначение рельса для скринридера. */
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
