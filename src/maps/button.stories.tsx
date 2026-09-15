import type { Meta, StoryObj } from "@storybook/react-vite";
import { Star } from "lucide-react";

import { Button, type ButtonSize, type ButtonVariant } from "./button";

const meta: Meta<typeof Button> = {
  title: "Maps kit/Button",
  component: Button,
  globals: { brand: "maps" },
};
export default meta;

const MACKET: ButtonVariant[] = ["accent", "neutral", "danger"];
const OURS: ButtonVariant[] = ["outline", "outline-accent"];
const SIZES: ButtonSize[] = ["sm", "md", "lg"];

const icon = <Star size={16} aria-hidden="true" />;

function Row({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-(--spacing-gap-8)">
      <div>
        <h3 className="text-xs [font-weight:var(--font-weight-medium)] text-(color:--text-primary)">
          {title}
        </h3>
        {hint ? (
          <p className="text-[10px] leading-(--typography-line-height-12) text-(color:--text-tertiary)">
            {hint}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-(--spacing-gap-12)">{children}</div>
    </section>
  );
}

/* Сетка повторяет компонент-сет макета: типы по столбцам, наличие иконки и
   выключенность по строкам. Состояний Hover и Pressed здесь нет намеренно —
   это состояния взаимодействия, их видно только курсором. Отдельная история
   для них бессмысленна ещё и потому, что Hover в макете побайтово равен
   Default (docs/figma-deltas.md, пункт 1). */
export const ВсеВарианты: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-24)">
      <Row title="Из макета" hint="accent / neutral / danger">
        {MACKET.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </Row>
      <Row title="Из макета, с иконкой" hint="паддинг справа 10 вместо 12, gap 6, вес 450">
        {MACKET.map((variant) => (
          <Button key={variant} variant={variant} icon={icon}>
            {variant}
          </Button>
        ))}
      </Row>
      <Row title="Выключенные" hint="заливка action/disabled, текст text/tertiary">
        {MACKET.map((variant) => (
          <Button key={variant} variant={variant} disabled>
            {variant}
          </Button>
        ))}
      </Row>
      <Row
        title="Наши, вне макета"
        hint="outline — 45 вызовов из 77 в main-web, замены в макете нет"
      >
        {OURS.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
        {OURS.map((variant) => (
          <Button key={`${variant}-d`} variant={variant} disabled>
            {variant} disabled
          </Button>
        ))}
      </Row>
    </div>
  ),
};

/* В макете размер ровно один — 40px, это md. sm и lg остались от кита и
   источника не имеют: их высоты 34 и 44 не ложатся даже на шкалу
   dimension/height (28 → 40 → 64). */
export const Размеры: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-24)">
      {SIZES.map((size) => (
        <Row key={size} title={size} hint={size === "md" ? "из макета" : "источника нет"}>
          {MACKET.map((variant) => (
            <Button key={variant} size={size} variant={variant}>
              {variant}
            </Button>
          ))}
          <Button size={size} icon={icon}>
            с иконкой
          </Button>
        </Row>
      ))}
    </div>
  ),
};

export const НаВсюШирину: StoryObj = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-(--spacing-gap-8)">
      <Button fullWidth>accent</Button>
      <Button fullWidth variant="neutral" icon={icon}>
        neutral с иконкой
      </Button>
      <Button fullWidth variant="danger" disabled>
        danger выключен
      </Button>
    </div>
  ),
};

export const Песочница: StoryObj<typeof Button> = {
  args: { children: "Button", variant: "accent", size: "md", disabled: false, fullWidth: false },
  argTypes: {
    variant: { control: "inline-radio", options: [...MACKET, ...OURS] },
    size: { control: "inline-radio", options: SIZES },
  },
};
