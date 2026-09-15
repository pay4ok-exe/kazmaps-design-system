import { readFileSync } from "node:fs";
import { join } from "node:path";

const styles = join(__dirname);
const read = (p: string) => readFileSync(join(styles, p), "utf8");

const BRANDS = ["business", "booking", "maps"];
const TEXT = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl"];

const SHARED_SCALE: Record<string, string> = {
  "text-xs": "0.75rem",
  "text-sm": "0.875rem",
  "text-base": "1rem",
  "text-lg": "1.125rem",
  "text-xl": "1.25rem",
  "text-2xl": "1.5rem",
  "text-3xl": "1.875rem",
  "dimension-corner-radius-4": "4px",
  "dimension-corner-radius-6": "6px",
  "dimension-corner-radius-8": "8px",
  "dimension-corner-radius-12": "12px",
  "dimension-corner-radius-16": "16px",
  "dimension-corner-radius-max": "9999px",
  "font-weight-regular": "400",
  "font-weight-book": "450",
  "font-weight-medium": "500",
  "font-weight-strong": "550",
};

const KIT_STATIC: Record<string, string> = {
  "ease-standard": "cubic-bezier(0.4, 0, 0.2, 1)",
  "motion-fast": "140ms",
  "motion-panel": "240ms",
  "motion-shimmer": "1.6s",
  "shadow-column": "rgba(16, 24, 40, 0.05) 2px 0px 8px 0px",
  "shadow-button-sm": "rgba(16, 24, 40, 0.08) 0px 1px 3px 0px",
  "shadow-button-md": "rgba(16, 24, 40, 0.1) 0px 1px 3px 0px",
  "shadow-field": "rgba(0, 0, 0, 0.04) 0px 4px 4px 0px",
  "shadow-hud": "rgba(0, 0, 0, 0.12) 0px 4px 8px 0px",
  "shadow-hud-hover": "rgba(0, 0, 0, 0.24) 0px 4px 8px 0px",
  "shadow-hud-side": "rgba(0, 0, 0, 0.08) 4px 0px 8px 0px",
  "shadow-hud-badge": "rgba(0, 0, 0, 0.12) 0px 2px 8px 0px",
  "shadow-modal": "rgba(0, 0, 0, 0.08) 0px 4px 8px 0px",
  "shadow-sheet-top": "rgba(16, 24, 40, 0.14) 0px -4px 20px 0px",
  "shadow-dropdown": "rgba(16, 24, 40, 0.22) 0px 12px 32px 0px",
};

const FONT: Record<string, string> = {
  maps: "var(--font-inter), system-ui, sans-serif",
  business:
    '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  booking: '"Lexend", "Manrope", system-ui, -apple-system, sans-serif',
};

function baseBlock(css: string, brand: string): string {
  const start = css.indexOf(`[data-brand="${brand}"] {`);
  return css.slice(start, css.indexOf("\n}\n", start));
}

describe("brand scale", () => {
  it("core.css declares no text scale", () => {
    const core = read("core.css");
    for (const name of TEXT) expect(core).not.toContain(`--${name}:`);
  });

  it.each(BRANDS)("%s declares the shared numeric scale", (brand) => {
    const block = baseBlock(read(`brands/${brand}.css`), brand);
    for (const [name, value] of Object.entries(SHARED_SCALE)) {
      expect(block, name).toContain(`--${name}: ${value};`);
    }
  });

  it.each(BRANDS)("%s declares the kit statics", (brand) => {
    const block = baseBlock(read(`brands/${brand}.css`), brand);
    for (const [name, value] of Object.entries(KIT_STATIC)) {
      expect(block, name).toContain(`--${name}: ${value};`);
    }
  });

  it.each(BRANDS)("%s keeps its own font stack", (brand) => {
    const block = baseBlock(read(`brands/${brand}.css`), brand).replace(/\s+/g, " ");
    expect(block).toContain(`--font-sans: ${FONT[brand]};`);
  });

  it.each(BRANDS)("%s declares shimmer-peak per theme", (brand) => {
    const css = read(`brands/${brand}.css`);
    expect(css).toMatch(
      new RegExp(
        `\\[data-brand="${brand}"\\]\\[data-theme="light"\\] \\{[^}]*--shimmer-peak: 0\\.94;`,
      ),
    );
    expect(css).toMatch(
      new RegExp(
        `\\[data-brand="${brand}"\\]\\[data-theme="dark"\\] \\{[^}]*--shimmer-peak: 1\\.12;`,
      ),
    );
  });
});

describe("kit css", () => {
  it("ships the utilities the components read", () => {
    const kit = read("kit.css");
    for (const cls of [
      ".transition-interactive",
      ".transition-surface",
      ".animate-modal-in",
      ".animate-shimmer-placeholder",
      ".focus-ring:focus-visible",
      ".focus-ring-within:focus-within",
    ])
      expect(kit).toContain(cls);
    expect(kit).toContain("@keyframes modal-scale-fade-in");
    expect(kit).toContain("@keyframes shimmer-placeholder");
  });
});
