import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ownedStatics } from "../../scripts/owned-statics.mjs";

const ROOT = join(__dirname, "..", "..");
const read = (p: string): string => readFileSync(join(ROOT, p), "utf8");
const readJson = (p: string): unknown => JSON.parse(read(p));

type Token = { $type: string; $value: string; $description?: string };
type Brand = {
  _ownStatics?: string[];
  brand: string;
  defaultTheme: string;
  followsSystem: boolean;
  themes: Record<string, Record<string, Token>>;
  static: Record<string, Token>;
};
type Schema = {
  themes: string[];
  themed: Record<string, string[]>;
  static: string[];
  aliases: Record<string, string>;
};

const schema = readJson("tokens/schema.json") as Schema;
const core = readJson("tokens/core.json") as Record<string, Token>;
const BRANDS = ["business", "booking", "maps"];
const roles = Object.values(schema.themed).flat();

// The brand's --ease-standard deliberately shadows core's: both sit at the same
// specificity and the brand wins only because core.css is imported first (README §1).
// Any other static colliding with a core key would be an unintended, order-dependent
// override, so only this one name is allow-listed.
const STATIC_CORE_COLLISION_ALLOWLIST = ["ease-standard"];

function definedVars(cssBlock: string): Set<string> {
  return new Set(Array.from(cssBlock.matchAll(/(--[\w-]+)\s*:/g)).map((m) => m[1]));
}

function block(css: string, selector: string): string {
  const start = css.indexOf(selector);
  expect(start, selector).toBeGreaterThan(-1);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  return css.slice(open + 1, close);
}

for (const name of BRANDS) {
  describe(`brand ${name}`, () => {
    const brand = readJson(`tokens/brands/${name}.json`) as Brand;
    const css = read(`src/styles/brands/${name}.css`);

    it("declares defaultTheme among themes", () => {
      expect(schema.themes).toContain(brand.defaultTheme);
      expect(Object.keys(brand.themes).sort()).toEqual([...schema.themes].sort());
    });

    for (const theme of schema.themes) {
      it(`${theme}: every contract role is a literal and nothing else is declared`, () => {
        for (const role of roles) {
          const token = brand.themes[theme][role];
          expect(token, role).toBeDefined();
          expect(token.$value, role).not.toMatch(/var\(/);
        }
        expect(Object.keys(brand.themes[theme]).sort()).toEqual([...roles].sort());
      });
      it(`${theme}: generated block defines every contract role`, () => {
        const vars = definedVars(block(css, `[data-brand="${name}"][data-theme="${theme}"]`));
        for (const role of roles) expect(vars).toContain(`--${role}`);
      });
    }

    it("static roles are literals and match the contract exactly", () => {
      for (const role of schema.static) {
        expect(brand.static[role], role).toBeDefined();
        if (role !== "font-sans") expect(brand.static[role].$value, role).not.toMatch(/var\(/);
      }
      expect(Object.keys(brand.static).sort()).toEqual([...schema.static].sort());
    });

    it("own statics name contract static roles", () => {
      for (const role of brand._ownStatics ?? []) expect(schema.static).toContain(role);
    });

    it("statics it does not own follow maps", () => {
      const maps = readJson("tokens/brands/maps.json") as Brand;
      const owned = ownedStatics(brand);
      for (const role of schema.static) {
        if (owned.has(role)) continue;
        expect(brand.static[role].$value, role).toBe(maps.static[role].$value);
      }
    });

    it("token types agree across brands", () => {
      const maps = readJson("tokens/brands/maps.json") as Brand;
      for (const theme of schema.themes)
        for (const role of roles)
          expect(brand.themes[theme][role].$type, role).toBe(maps.themes[theme][role].$type);
      for (const role of schema.static)
        expect(brand.static[role].$type, role).toBe(maps.static[role].$type);
    });

    it("statics do not collide with core, except the allow-listed override", () => {
      for (const key of Object.keys(brand.static)) {
        if (STATIC_CORE_COLLISION_ALLOWLIST.includes(key)) continue;
        expect(Object.keys(core), key).not.toContain(key);
      }
    });

    it("follows the system theme only when declared", () => {
      const media = css.includes(`@media (prefers-color-scheme: dark)`);
      expect(media).toBe(brand.followsSystem);
      if (brand.followsSystem) {
        expect(css).toContain(`[data-brand="${name}"]:not([data-theme="light"]) {`);
        const start = css.indexOf("@media (prefers-color-scheme: dark)");
        const vars = definedVars(css.slice(start));
        for (const role of roles) expect(vars).toContain(`--${role}`);
      }
    });

    it("base block carries the default theme values", () => {
      const base = block(css, `[data-brand="${name}"] {`);
      for (const role of roles) {
        expect(base).toContain(`--${role}: ${brand.themes[brand.defaultTheme][role].$value};`);
      }
    });

    it("base block defines contract, static and every alias pointing at its canon", () => {
      const base = block(css, `[data-brand="${name}"] {`);
      const vars = definedVars(base);
      for (const role of [...roles, ...schema.static]) expect(vars).toContain(`--${role}`);
      for (const [old, canon] of Object.entries(schema.aliases)) {
        expect(base).toContain(`--${old}: var(--${canon});`);
      }
    });
  });
}
