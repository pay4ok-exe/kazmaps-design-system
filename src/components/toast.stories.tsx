import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";

import { Overlay } from "./cases";
import { ToastProvider, useToast } from "./toast";

const meta: Meta<typeof ToastProvider> = {
  title: "Components/Toast",
  component: ToastProvider,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Overlay component="Toast" /> };

type ToastArgs = { message: string; withAction: boolean; durationMs: number };

function Show({ message, withAction, durationMs }: ToastArgs) {
  const show = useToast();
  useEffect(() => {
    show(message, {
      action: withAction ? { label: "Открыть", onClick: () => undefined } : undefined,
      durationMs,
    });
  }, [show, message, withAction, durationMs]);
  return null;
}

export const Playground: StoryObj<ToastArgs> = {
  args: { message: "Маршрут сохранён", withAction: true, durationMs: 60_000 },
  argTypes: { durationMs: { control: { type: "range", min: 1000, max: 60_000, step: 1000 } } },
  render: (args) => (
    <ToastProvider>
      <Show {...args} />
    </ToastProvider>
  ),
};
