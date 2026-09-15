import type { ComponentProps, ReactNode } from "react";

export function ProfileButton({
  photoUrl,
  photoAlt = "",
  icon,
  active,
  label,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  photoUrl?: string;
  photoAlt?: string;
  icon?: ReactNode;
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
