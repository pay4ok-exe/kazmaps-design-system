import type { ReactNode, SVGProps } from "react";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: number;
  title?: string;
}

export function Icon({
  size = 24,
  title,
  name,
  multicolour = false,
  children,
  ...rest
}: IconProps & { name: string; multicolour?: boolean; children: ReactNode }) {
  const decorative = title === undefined;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      data-icon={name}
      data-multicolour={multicolour ? "" : undefined}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={title}
      {...rest}
    >
      {children}
    </svg>
  );
}
