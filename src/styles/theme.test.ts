import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..");
const read = (p: string): string => readFileSync(join(ROOT, p), "utf8");
type Token = { $type: string; $value: string };
type Schema = { themed: Record<string, string[]> };
type Brand = { defaultTheme: string; themes: Record<string, Record<string, Token>> };
const schema = JSON.parse(read("tokens/schema.json")) as Schema;
const maps = JSON.parse(read("tokens/brands/maps.json")) as Brand;
const roles = Object.values(schema.themed).flat();
const isColor = (role: string) => maps.themes[maps.defaultTheme][role].$type === "color";

describe("theme.css", () => {
  const css = read("src/styles/theme.css");

  it("maps every color role into the tailwind color namespace", () => {
    for (const role of roles.filter(isColor)) {
      expect(css).toContain(`--color-${role}: var(--${role});`);
    }
  });

  it("leaves non-color roles out of the color namespace", () => {
    for (const role of roles.filter((r) => !isColor(r))) {
      expect(css).not.toContain(`--color-${role}:`);
    }
    expect(css).not.toMatch(/--radius-|--shadow-|--font-/);
  });

  it("is exported by the package together with the brand files and the kit css", () => {
    const pkg = JSON.parse(read("package.json")) as { exports: Record<string, string> };
    expect(pkg.exports["./styles/theme.css"]).toBe("./dist/styles/theme.css");
    expect(pkg.exports["./styles/kit.css"]).toBe("./dist/styles/kit.css");
    for (const brand of ["business", "booking", "maps"]) {
      expect(pkg.exports[`./styles/brands/${brand}.css`]).toBe(`./dist/styles/brands/${brand}.css`);
    }
  });
});
