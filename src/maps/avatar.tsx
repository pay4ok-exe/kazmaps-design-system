"use client";

import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";

import { AVATAR_STATE } from "./avatar.states";

const PALETTE = [
  "bg-(--tag-blue)",
  "bg-(--tag-teal)",
  "bg-(--tag-green)",
  "bg-(--tag-orange)",
  "bg-(--tag-magenta)",
  "bg-(--tag-purple)",
] as const;

function paletteFor(seed: string): string {
  let acc = 0;
  for (let i = 0; i < seed.length; i += 1) acc += seed.charCodeAt(i);
  return PALETTE[acc % PALETTE.length];
}

export interface AvatarProps {
  photoUrl?: string | null;
  photoAlt?: string;
  name?: string;
  seed?: string;
  icon?: ReactNode;
  active?: boolean;
  label: string;
  className?: string;
}

export function Avatar({
  photoUrl,
  photoAlt = "",
  name,
  seed,
  icon,
  active,
  label,
  className = "",
  ...rest
}: ComponentProps<"button"> & AvatarProps) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const withPhoto = Boolean(photoUrl) && !photoFailed;
  const initial = name?.trim().charAt(0).toUpperCase();
  const withInitial = !withPhoto && Boolean(initial);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      {...rest}
      className={`flex size-[40px] items-center justify-center overflow-hidden rounded-(--dimension-corner-radius-max) bg-(--background-primary) shadow-(--shadow-hud) transition-interactive focus-ring hover:shadow-(--shadow-hud-hover) ${
        withPhoto || withInitial ? "p-(--spacing-padding-2)" : "p-(--spacing-padding-8)"
      } ${active ? AVATAR_STATE.active : AVATAR_STATE.idle} ${className}`}
    >
      {withPhoto ? (
        <img
          src={photoUrl ?? undefined}
          alt={photoAlt}
          onError={() => {
            setPhotoFailed(true);
          }}
          className={`size-full rounded-(--dimension-corner-radius-max) object-cover ${
            active ? "ring-[length:var(--stroke-border-1)] ring-(--icon-accent)" : ""
          }`}
        />
      ) : withInitial ? (
        <span
          aria-hidden="true"
          className={`flex size-full items-center justify-center rounded-(--dimension-corner-radius-max) text-base leading-(--typography-line-height-20) text-(color:--text-primary) [font-weight:var(--font-weight-medium)] ${paletteFor(seed ?? name ?? "")} ${
            active ? "ring-[length:var(--stroke-border-1)] ring-(--icon-accent)" : ""
          }`}
        >
          {initial}
        </span>
      ) : (
        icon
      )}
    </button>
  );
}
