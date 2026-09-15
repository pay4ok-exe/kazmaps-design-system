import type { ReactNode, SVGProps } from "react";

/* Обёртка всех иконок набора. Все глифы макета нарисованы в поле 24×24
   (единственное исключение — _Compass Icon на 40, он в набор не входит).

   Цвет НЕ задаётся здесь: одноцветные иконки залиты currentColor и слушаются
   text-(color:--icon-*) у родителя, а многоцветные несут собственные роли
   weather/* и на currentColor не реагируют вовсе. Это различие видно в поле
   multicolour манифеста. */

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  /** Сторона в пикселях. По умолчанию 24 — размер, в котором глифы нарисованы. */
  size?: number;
  /**
   * Подпись для скринридера. Без неё иконка считается декоративной и скрывается:
   * подписывать каждую иконку внутри уже подписанной кнопки — это дубль в
   * озвучке, а не забота о доступности.
   */
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
