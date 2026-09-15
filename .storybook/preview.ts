import type { Preview } from "@storybook/react-vite";

import "@fontsource-variable/inter";

import "./preview.css";

const preview: Preview = {
  globalTypes: {
    brand: {
      description: "Brand preset",
      toolbar: { title: "Brand", items: ["maps", "business", "booking"], dynamicTitle: true },
    },
    theme: {
      description: "Color theme",
      toolbar: { title: "Theme", items: ["light", "dark"], dynamicTitle: true },
    },
  },
  initialGlobals: { brand: "maps", theme: "light" },
  decorators: [
    (Story, ctx) => {
      const root = document.documentElement;
      root.setAttribute("data-brand", String(ctx.globals.brand));
      root.setAttribute("data-theme", String(ctx.globals.theme));
      document.body.style.background = "var(--background-secondary)";
      document.body.style.color = "var(--text-primary)";
      document.body.style.fontFamily = "var(--font-sans)";
      return Story();
    },
  ],
  parameters: { backgrounds: { disable: true }, layout: "padded" },
  tags: ["autodocs"],
};
export default preview;
