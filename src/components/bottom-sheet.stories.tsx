import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { BottomSheet } from "./bottom-sheet";
import { Overlay } from "./cases";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Overlay component="BottomSheet" /> };

export const Playground: StoryObj<typeof BottomSheet> = {
  args: { title: "Рядом", label: "Лист", ariaModal: false },
  argTypes: {
    snaps: { table: { disable: true } },
    snap: { table: { disable: true } },
    onSnapChange: { table: { disable: true } },
    onDismiss: { table: { disable: true } },
    onClose: { table: { disable: true } },
    header: { table: { disable: true } },
    children: { table: { disable: true } },
    ref: { table: { disable: true } },
    testId: { table: { disable: true } },
  },
  render: function Render(args) {
    const [snap, setSnap] = useState("half");
    return (
      <BottomSheet
        {...args}
        snaps={[
          { id: "peek", heightClassName: "h-[25vh]" },
          { id: "half", heightClassName: "h-[50vh]" },
          { id: "full", heightClassName: "h-[90vh]" },
        ]}
        snap={snap}
        onSnapChange={setSnap}
      >
        <div className="p-4">Содержимое листа</div>
      </BottomSheet>
    );
  },
};
