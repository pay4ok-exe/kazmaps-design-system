import type { ComponentProps, ReactNode } from "react";

/* Замер макета: Profile (110:962), шесть вариантов Image(True|False) ×
   State(Default|Hover|Active). Круг 40, фон background/primary, тень
   --shadow-hud (на наведении --shadow-hud-hover).

   IconButton сюда не подошёл: паддинг зависит от содержимого — 2 под снимок и
   8 под глиф, — а у IconButton он один. Плюс снимок в состоянии Active
   получает кольцо, которого у IconButton нет вовсе.

   Со снимком: паддинг 2, картинка 36 кругом, в Active обводка 1 цветом
   icon/accent — и она единственная в макете выровнена НАРУЖУ (strokeAlign
   OUTSIDE): кольцо ложится снаружи снимка, не сжимая его. Поэтому ring, а не
   border и не inset-ring. Без снимка: паддинг 8, глиф 24 цветом icon/primary, на
   наведении icon/tertiary, в Active icon/accent.

   Внимание: на наведении глиф СВЕТЛЕЕТ, как и у Map Action типа Default.
   Так в макете — см. docs/figma-deltas.md, пункт 13. */

export function ProfileButton({
  photoUrl,
  photoAlt = "",
  icon,
  active,
  label,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  /** Снимок профиля. Без него рисуется глиф. */
  photoUrl?: string;
  photoAlt?: string;
  /** Глиф для варианта без снимка; в макете это User 24×24. */
  icon?: ReactNode;
  /** Профиль открыт. */
  active?: boolean;
  label: string;
}) {
  const withPhoto = photoUrl !== undefined;
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      {...rest}
      className={`flex size-[40px] items-center justify-center overflow-hidden rounded-(--dimension-corner-radius-max) bg-(--background-primary) shadow-(--shadow-hud) transition-interactive focus-ring hover:shadow-(--shadow-hud-hover) ${
        withPhoto ? "p-(--spacing-padding-2)" : "p-(--spacing-padding-8)"
      } ${
        active
          ? "text-(color:--icon-accent)"
          : "text-(color:--icon-primary) hover:text-(color:--icon-tertiary)"
      } ${className}`}
    >
      {withPhoto ? (
        <img
          src={photoUrl}
          alt={photoAlt}
          className={`size-full rounded-(--dimension-corner-radius-max) object-cover ${
            active ? "ring-[length:var(--stroke-border-1)] ring-(--icon-accent)" : ""
          }`}
        />
      ) : (
        icon
      )}
    </button>
  );
}
