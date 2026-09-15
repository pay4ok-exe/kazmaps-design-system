import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ICON_MANIFEST } from "./generated/manifest";
import { IconCloud, IconMoon, IconSun } from "./generated";

const ROOT = join(__dirname, "..", "..");
const brandCss = readFileSync(join(ROOT, "src/styles/brands/maps.css"), "utf8");

describe("иконки: генерация", () => {
  it("на каждый svg приходится компонент", () => {
    const svgs = readdirSync(join(ROOT, "src/icons/svg")).filter((f) => f.endsWith(".svg"));
    expect(ICON_MANIFEST).toHaveLength(svgs.length);
  });

  /* SVG пишет атрибуты через дефис, а React такие имена молча выбрасывает.
     Без fill-rule фигуры с дырками заливаются сплошняком — заметить это на
     глаз трудно, поэтому проверяем разметку. */
  it("атрибуты переведены в camelCase", () => {
    for (const { slug } of ICON_MANIFEST) {
      const src = readFileSync(join(ROOT, `src/icons/generated/${slug}.tsx`), "utf8");
      expect(src, slug).not.toMatch(/\s(fill|clip|stroke)-[a-z]+=/);
    }
  });
});

describe("иконки: цвет", () => {
  /* Литералы погоды — это значения ролей СВЕТЛОЙ темы. Если они останутся в
     разметке, тёмная тема сломается молча: облако будет светло-голубым на
     тёмном фоне. */
  it("многоцветные ссылаются на роли, а не на литералы", () => {
    for (const { slug, multicolour } of ICON_MANIFEST) {
      if (!multicolour) continue;
      const src = readFileSync(join(ROOT, `src/icons/generated/${slug}.tsx`), "utf8");
      expect(src, slug).toMatch(/fill="var\(--weather-/);
      expect(src, slug).not.toMatch(/fill="#[0-9a-fA-F]{6}"/);
    }
  });

  it("роли погоды, на которые ссылаются иконки, объявлены в бренде", () => {
    for (const { slug } of ICON_MANIFEST) {
      const src = readFileSync(join(ROOT, `src/icons/generated/${slug}.tsx`), "utf8");
      for (const [, role] of src.matchAll(/var\((--weather-[a-z]+)\)/g)) {
        expect(brandCss, `${slug} → ${role}`).toContain(`${role}:`);
      }
    }
  });

  it("одноцветные красятся currentColor", () => {
    for (const { slug, multicolour } of ICON_MANIFEST) {
      if (multicolour) continue;
      const src = readFileSync(join(ROOT, `src/icons/generated/${slug}.tsx`), "utf8");
      expect(src, slug).toContain('fill="currentColor"');
    }
  });
});

describe("иконки: доступность", () => {
  it("без title иконка декоративная и скрыта от скринридера", () => {
    const { container } = render(<IconSun />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role");
  });

  it("с title становится картинкой с подписью", () => {
    const { container } = render(<IconMoon title="Ночь" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("role", "img");
    expect(svg).toHaveAttribute("aria-label", "Ночь");
    expect(svg).not.toHaveAttribute("aria-hidden");
  });

  it("размер по умолчанию 24 и переопределяется пропом", () => {
    const { container, rerender } = render(<IconCloud />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "24");
    rerender(<IconCloud size={32} />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "32");
  });
});
