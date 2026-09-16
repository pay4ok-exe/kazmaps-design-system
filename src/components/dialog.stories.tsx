import type { Meta, StoryObj } from "@storybook/react-vite";
import { Overlay } from "./cases";
import { Dialog } from "./dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Overlay component="Dialog" /> };

export const Playground: StoryObj<typeof Dialog> = {
  args: {
    title: "Удалить маршрут?",
    subtitle: "Действие нельзя отменить",
    size: "md",
    closeLabel: "Закрыть",
    showHeader: true,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    children: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
  render: (args) => (
    <Dialog {...args} onClose={() => undefined}>
      <p className="text-[13.5px]">Маршрут исчезнет из списка.</p>
    </Dialog>
  ),
};
