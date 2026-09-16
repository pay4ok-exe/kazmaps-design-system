import type { Meta, StoryObj } from "@storybook/react-vite";
import { Route } from "lucide-react";

import { Cases } from "./cases";
import { ListRow, type ListRowProps } from "./list-row";

const meta: Meta<typeof ListRow> = {
  title: "Components/ListRow",
  component: ListRow,
};
export default meta;

export const AllVariants: StoryObj = { render: () => <Cases component="ListRow" /> };

type ListRowArgs = ListRowProps & { withIcon: boolean };

export const Playground: StoryObj<ListRowArgs> = {
  args: { title: "Маршруты", subtitle: "3 сохранённых", href: "", withIcon: true },
  argTypes: {
    icon: { table: { disable: true } },
    trailing: { table: { disable: true } },
    onClick: { table: { disable: true } },
    target: { table: { disable: true } },
    rel: { table: { disable: true } },
  },
  render: ({ withIcon, href, ...args }) => (
    <ListRow
      {...args}
      href={href === "" ? undefined : href}
      icon={withIcon ? <Route size={16} aria-hidden="true" /> : undefined}
    />
  ),
};
