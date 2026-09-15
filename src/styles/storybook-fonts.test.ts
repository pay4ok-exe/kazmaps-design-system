import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const FONTS = join(__dirname, "..", "..", ".storybook", "fonts.css");

describe("storybook fonts", () => {
  const css = readFileSync(FONTS, "utf8");

  it("registers the brand families under their own names", () => {
    const families = new Set([...css.matchAll(/font-family:\s*"([^"]+)"/g)].map((m) => m[1]));
    expect([...families].sort()).toEqual(["Inter", "Lexend", "Manrope"]);
  });

  it("points every face at a font file that exists", () => {
    const urls = [...css.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1]);
    expect(urls.length).toBeGreaterThan(0);
    expect(urls.filter((u) => !existsSync(resolve(dirname(FONTS), u)))).toEqual([]);
  });
});
