import type { Meta, StoryObj } from "@storybook/react-vite";
import { Layers, MapPin } from "lucide-react";
import { useState } from "react";

import { Cases } from "./cases";
import { SegmentedRow } from "./segmented-row";

const meta: Meta<typeof SegmentedRow> = {
  title: "Components/SegmentedRow",
  component: SegmentedRow,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="SegmentedRow" /> };

export const Playground: StoryObj<typeof SegmentedRow> = {
  args: { label: "Слои" },
  argTypes: {
    items: { table: { disable: true } },
    activeId: { table: { disable: true } },
    onSelect: { table: { disable: true } },
  },
  render: function Render(args) {
    const [activeId, setActiveId] = useState<string | null>("a");
    return (
      <SegmentedRow
        {...args}
        activeId={activeId}
        onSelect={setActiveId}
        items={[
          { id: "a", label: "Карта", icon: <MapPin size={16} aria-hidden="true" /> },
          { id: "b", label: "Слои", icon: <Layers size={16} aria-hidden="true" /> },
        ]}
      />
    );
  },
};
