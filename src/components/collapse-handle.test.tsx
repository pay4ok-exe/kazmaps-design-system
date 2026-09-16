import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CollapseHandle } from "./collapse-handle";

const glyph = <svg width={20} height={20} aria-hidden="true" />;

const handle = (open: boolean) => {
  render(
    <CollapseHandle open={open} label="Свернуть панель">
      {glyph}
    </CollapseHandle>,
  );
  return screen.getByRole("button", { name: "Свернуть панель" });
};

describe("CollapseHandle", () => {
  it("скруглены только правые углы, как в макете", () => {
    expect(handle(true).className).toContain("rounded-r-(--dimension-corner-radius-8)");
  });

  it("размер не задан числом, а выведен из паддинга и обнимает содержимое", () => {
    const className = handle(true).className;
    expect(className).toContain("px-(--spacing-padding-2)");
    expect(className).toContain("py-(--spacing-padding-8)");
    expect(className).toContain("size-fit");
    expect(className).not.toMatch(/\b[hw]-\[/);
  });

  it("открытая панель залита background/primary и без кромки", () => {
    const className = handle(true).className;
    expect(className).toContain("bg-(--background-primary)");
    expect(className).not.toContain("inset-shadow-");
  });

  it("свёрнутая панель залита background/secondary и обведена с трёх сторон", () => {
    const className = handle(false).className;
    expect(className).toContain("bg-(--background-secondary)");
    // Кромка макета INSIDE и идёт по верху, правому краю и низу; слева её нет.
    // Три inset-тени вместо border: border съел бы ширину под иконку (24 − 2 − 2 − 1 < 20).
    expect(className).toContain("0_1px_0_0_var(--background-primary)");
    expect(className).toContain("0_-1px_0_0_var(--background-primary)");
    expect(className).toContain("-1px_0_0_0_var(--background-primary)");
  });

  it("тень макета — боковая", () => {
    expect(handle(true).className).toContain("shadow-(--shadow-hud-side)");
  });

  it("сообщает состояние панели", () => {
    expect(handle(true)).toHaveAttribute("aria-expanded", "true");
  });
});
