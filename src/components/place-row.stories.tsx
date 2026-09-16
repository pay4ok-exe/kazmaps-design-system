import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cases } from "./cases";
import { PlaceRow } from "./place-row";

const meta: Meta<typeof PlaceRow> = {
  title: "Components/PlaceRow",
  component: PlaceRow,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="PlaceRow" /> };

export const Playground: StoryObj<typeof PlaceRow> = {
  args: {
    name: "Кофейня",
    rating: 4.6,
    category: "Кафе",
    status: "Открыто",
    metaText: "300 м",
    photoUrl: "",
  },
  argTypes: {
    rating: { control: { type: "range", min: 0, max: 5, step: 0.1 } },
    additional: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  render: ({ photoUrl, ...args }) => (
    <div className="w-[400px]">
      <PlaceRow {...args} photoUrl={photoUrl === "" ? undefined : photoUrl} />
    </div>
  ),
};
