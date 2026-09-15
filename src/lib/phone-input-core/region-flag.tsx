import { cn } from "../cn";

const REGIONAL_INDICATOR_A = 0x1f1e6;

export const flagEmoji = (iso: string): string =>
  String.fromCodePoint(
    ...Array.from(iso.toUpperCase(), (c) => REGIONAL_INDICATOR_A + c.charCodeAt(0) - 65),
  );

export function RegionFlag({
  iso,
  size = 20,
  className,
}: {
  iso: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0 leading-(--typography-line-height-16)", className)}
      style={{ fontSize: size, fontFamily: '"Twemoji Country Flags", var(--font-sans)' }}
    >
      {flagEmoji(iso)}
    </span>
  );
}
