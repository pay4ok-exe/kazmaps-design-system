export interface LogoLockupProps {
  className?: string;
}

function Pin() {
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="text-(color:--action-accent-primary)"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M12 2C7.03 2 3 6.03 3 11c0 6.75 9 13 9 13s9-6.25 9-13c0-4.97-4.03-9-9-9zm0 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
      />
    </svg>
  );
}

export function LogoLockup({ className = "" }: LogoLockupProps) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Pin />
      <span className="text-[17px] font-bold tracking-[-0.2px] text-(color:--text-primary)">
        KazMaps
      </span>
    </span>
  );
}
