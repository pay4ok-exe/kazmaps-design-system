import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { QrCode } from "./qr-code";

const meta: Meta<typeof QrCode> = {
  title: "Components/QrCode",
  component: QrCode,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="QrCode" /> };

export const Playground: StoryObj<typeof QrCode> = {
  args: { value: "https://kazmaps.dev", label: "QR-код" },
};
