export function ShimmerBlock({ className }: { className: string }) {
  return (
    <div className={`animate-shimmer-placeholder rounded bg-(--background-secondary) ${className}`} />
  );
}
