import type { Meta, StoryObj } from "@storybook/react-vite";
import { Star } from "lucide-react";

import { Button, type ButtonVariant } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};
export default meta;

const MACKET: ButtonVariant[] = ["accent", "neutral", "danger"];
const OURS: ButtonVariant[] = ["outline", "outline-accent"];

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

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-gap-24)">
      <Row title="From the design" hint="accent / neutral / danger">
        {MACKET.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </Row>
      <Row
        title="From the design, with icon"
        hint="right padding 10 instead of 12, gap 6, weight 450"
      >
        {MACKET.map((variant) => (
          <Button key={variant} variant={variant} icon={icon}>
            {variant}
          </Button>
        ))}
      </Row>
      <Row title="Disabled" hint="action/disabled fill, text/tertiary label">
        {MACKET.map((variant) => (
          <Button key={variant} variant={variant} disabled>
            {variant}
          </Button>
        ))}
      </Row>
      <Row
        title="Ours, not in the design"
        hint="outline — 45 of 77 call sites in main-web, no counterpart in the design"
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

export const FullWidth: StoryObj = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-(--spacing-gap-8)">
      <Button fullWidth>accent</Button>
      <Button fullWidth variant="neutral" icon={icon}>
        neutral with icon
      </Button>
      <Button fullWidth variant="danger" disabled>
        danger disabled
      </Button>
    </div>
  ),
};

export const Playground: StoryObj<typeof Button> = {
  args: { children: "Button", variant: "accent", disabled: false, fullWidth: false },
  argTypes: { variant: { control: "inline-radio", options: [...MACKET, ...OURS] } },
};
