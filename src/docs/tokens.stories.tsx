import type { Meta, StoryObj } from "@storybook/react-vite";

import schema from "../../tokens/schema.json";
import booking from "../../tokens/brands/booking.json";
import business from "../../tokens/brands/business.json";
import maps from "../../tokens/brands/maps.json";

type Token = { $type: string; $value: string; $description?: string };
type Brand = {
  brand: string;
  defaultTheme: string;
  _pending?: string;
  themes: Record<string, Record<string, Token>>;
  static: Record<string, Token>;
};

const BRANDS: Brand[] = [maps, business, booking];
const isColor = (role: string) =>
  maps.themes.light[role as keyof typeof maps.themes.light].$type === "color";
const GROUPS = Object.entries(schema.themed)
  .map(([group, roles]) => [group, roles.filter(isColor)] as const)
  .filter(([, roles]) => roles.length > 0);

function Swatch({ role }: { role: string }) {
  return (
    <div className="rounded-(--dimension-corner-radius-8) bg-(--background-primary) p-(--spacing-padding-8) inset-ring-[length:var(--stroke-border-1)] inset-ring-(--border-secondary)">
      <div
        className="h-10 rounded-(--dimension-corner-radius-4) inset-ring-[length:var(--stroke-border-1)] inset-ring-(--border-secondary)"
        style={{ background: `var(--${role})` }}
      />
      <code className="mt-1 block text-xs text-(color:--text-secondary)">--{role}</code>
    </div>
  );
}

function Palette() {
  return (
    <div className="flex flex-col gap-(--spacing-gap-24)">
      {GROUPS.map(([group, roles]) => (
        <section key={group}>
          <h3 className="mb-2 text-sm text-(color:--text-secondary)">{group}</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-(--spacing-gap-12)">
            {roles.map((role) => (
              <Swatch key={role} role={role} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Statics() {
  return (
    <table className="text-sm text-(color:--text-primary)">
      <thead>
        <tr>
          <th className="text-left">Роль</th>
          {BRANDS.map((b) => (
            <th key={b.brand} className="text-left">
              {b.brand}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {schema.static.map((role) => (
          <tr key={role}>
            <td>
              <code>--{role}</code>
            </td>
            {BRANDS.map((b) => (
              <td key={b.brand}>
                <code>{b.static[role].$value}</code>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Pending() {
  const rows = BRANDS.flatMap((b) =>
    Object.entries(b.themes).flatMap(([theme, tokens]) =>
      Object.entries(tokens)
        .filter(([, t]) => t.$description)
        .map(([role, t]) => ({
          key: `${b.brand}-${theme}-${role}`,
          brand: b.brand,
          theme,
          role,
          ...t,
        })),
    ),
  );
  return (
    <div className="flex flex-col gap-(--spacing-gap-16) text-sm text-(color:--text-primary)">
      <ul>
        {BRANDS.filter((b) => b._pending).map((b) => (
          <li key={b.brand}>
            <strong>{b.brand}</strong>: {b._pending}
          </li>
        ))}
      </ul>
      <table>
        <thead>
          <tr>
            <th>Бренд</th>
            <th>Тема</th>
            <th>Роль</th>
            <th>Значение</th>
            <th>Заметка</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <td>{r.brand}</td>
              <td>{r.theme}</td>
              <td>
                <code>--{r.role}</code>
              </td>
              <td>
                <code>{r.$value}</code>
              </td>
              <td>{r.$description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const meta: Meta<typeof Palette> = { title: "Foundations/Tokens", component: Palette };
export default meta;
export const Colors: StoryObj<typeof Palette> = {};
export const StaticRoles: StoryObj<typeof Statics> = { render: () => <Statics /> };
export const PendingFromDesigner: StoryObj<typeof Pending> = { render: () => <Pending /> };
