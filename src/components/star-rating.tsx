import { IconStarBold } from "../icons/generated";

export interface StarRatingProps {
  value: number;
  className?: string;
}

export function StarRating({ value, className = "" }: StarRatingProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[12px] font-semibold text-(color:--text-primary) ${className}`}
    >
      <IconStarBold size={12} className="text-(color:--rating-star)" />
      {value.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
    </span>
  );
}
