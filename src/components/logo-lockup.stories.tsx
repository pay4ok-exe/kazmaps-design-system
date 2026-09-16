import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { LogoLockup } from "./logo-lockup";

const meta: Meta<typeof LogoLockup> = {
  title: "Components/LogoLockup",
  component: LogoLockup,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="LogoLockup" /> };

export const Playground: StoryObj<typeof LogoLockup> = { args: {} };
