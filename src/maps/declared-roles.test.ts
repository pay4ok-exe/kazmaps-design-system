import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const SRC = join(__dirname, "..");
const ENTRY = join(SRC, "maps/index.ts");
const STYLES = [
  "styles/core.css",
  "styles/theme.css",
  "styles/brands/maps.css",
  "styles/kits/maps.css",
];
const IMPORT = /(?:from\s+|import\s*\(?\s*)"(\.[^"]+)"/g;
const REFERENCE = /(?:var\(|\(|\(\w+:)--([a-z0-9][a-z0-9_-]*)/g;
const CSS_DECLARATION = /--([a-z0-9][a-z0-9_-]*)\s*:/g;
const INLINE_DECLARATION = /(?:["']--([a-z0-9][a-z0-9_-]*)["']\s*:|\[--([a-z0-9][a-z0-9_-]*):)/g;

function resolve(from: string, spec: string): string | null {
  const base = join(dirname(from), spec);
  const candidates = [`${base}.ts`, `${base}.tsx`, join(base, "index.ts"), join(base, "index.tsx")];
  return candidates.find((c) => existsSync(c)) ?? null;
}

function reachable(entry: string): string[] {
  const seen = new Set<string>();
  const queue = [entry];
  while (queue.length > 0) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    for (const m of readFileSync(file, "utf8").matchAll(IMPORT)) {
      const next = resolve(file, m[1]);
      if (next !== null) queue.push(next);
    }
  }
  return [...seen];
}

function names(text: string, pattern: RegExp): string[] {
  return [...text.matchAll(pattern)].map((m) => m[1] ?? m[2]).filter(Boolean);
}

describe("maps kit roles", () => {
  it("reference pattern covers var(), Tailwind shorthand and typed shorthand", () => {
    const fixture = 'a bg-[var(--one)] b-(--two) text-(color:--three) "var(--four, red)"';
    expect(names(fixture, REFERENCE)).toEqual(["one", "two", "three", "four"]);
  });

  it("every CSS variable read by the /maps entry is declared for the maps brand", () => {
    const files = reachable(ENTRY);
    const declared = new Set([
      ...STYLES.flatMap((p) => names(readFileSync(join(SRC, p), "utf8"), CSS_DECLARATION)),
      ...files.flatMap((f) => names(readFileSync(f, "utf8"), INLINE_DECLARATION)),
    ]);
    const missing = files.flatMap((f) =>
      [...new Set(names(readFileSync(f, "utf8"), REFERENCE))]
        .filter((n) => !n.startsWith("tw-") && !declared.has(n))
        .map((n) => `${relative(SRC, f)}: --${n}`),
    );
    expect(missing).toEqual([]);
  });
});
