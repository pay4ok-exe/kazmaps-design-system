import type { Preview } from "@storybook/react-vite";

import "@fontsource-variable/inter";

import "./preview.css";

// Страница «Components - Web» в Figma: фон #a7a7a7, секции залиты белым на 25 %.
const FIGMA_CANVAS = "color-mix(in srgb, #ffffff 25%, #a7a7a7)";

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
    canvas: {
      description: "Canvas background",
      toolbar: {
        title: "Canvas",
        items: [
          { value: "figma", title: "Figma canvas" },
          { value: "brand", title: "Brand background" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: "maps", theme: "light", canvas: "figma" },
  decorators: [
    (Story, ctx) => {
      const root = document.documentElement;
      root.setAttribute("data-brand", String(ctx.globals.brand));
      root.setAttribute("data-theme", String(ctx.globals.theme));
      document.body.style.background =
        ctx.globals.canvas === "figma" ? FIGMA_CANVAS : "var(--background-secondary)";
      document.body.style.color = "var(--text-primary)";
      document.body.style.fontFamily = "var(--font-sans)";
      return Story();
    },
  ],
  parameters: { backgrounds: { disable: true }, layout: "padded" },
  tags: ["autodocs"],
};
export default preview;
