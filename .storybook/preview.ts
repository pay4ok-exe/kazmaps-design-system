import type { Preview } from "@storybook/react-vite";

import "@fontsource-variable/inter";

import "./preview.css";

const preview: Preview = {
  globalTypes: {
    brand: {
      description: "Brand preset",
      toolbar: { title: "Brand", items: ["business", "booking", "maps"], dynamicTitle: true },
    },
    theme: {
      description: "Color theme",
      toolbar: { title: "Theme", items: ["dark", "light"], dynamicTitle: true },
    },
  },
  initialGlobals: { brand: "business", theme: "dark" },
  decorators: [
    (Story, ctx) => {
      const root = document.documentElement;
      const ownBrand = ctx.title.startsWith("Maps kit") || ctx.title.startsWith("Icons");
      const brand = String(ctx.globals.brand);
      root.setAttribute("data-brand", brand === "maps" && !ownBrand ? "business" : brand);
      root.setAttribute("data-theme", String(ctx.globals.theme));
      document.body.style.background = "var(--bg, var(--surface-base))";
      document.body.style.color = "var(--ink, var(--text-primary))";
      document.body.style.fontFamily = "var(--font-sans)";
      return Story();
    },
  ],
  parameters: { backgrounds: { disable: true }, layout: "padded" },
  tags: ["autodocs"],
};
export default preview;
