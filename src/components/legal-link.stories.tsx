import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { LegalLink } from "./legal-link";

const meta: Meta<typeof LegalLink> = {
  title: "Components/LegalLink",
  component: LegalLink,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="LegalLink" /> };

export const Playground: StoryObj<typeof LegalLink> = {
  args: { children: "Условия", href: "https://kazmaps.dev" },
};
