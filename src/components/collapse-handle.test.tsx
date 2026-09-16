import { render, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CollapseHandle } from "./collapse-handle";

const handle = (open: boolean) => {
  const { container } = render(<CollapseHandle open={open} label="Свернуть панель" />);
  return {
    button: within(container).getByRole("button", { name: "Свернуть панель" }),
    icon: container.querySelector("svg"),
  };
};

describe("CollapseHandle", () => {
  it("скруглены только правые углы, как в макете", () => {
    expect(handle(true).button.className).toContain("rounded-r-(--dimension-corner-radius-8)");
  });

  it("размер не задан числом, а выведен из паддинга и обнимает содержимое", () => {
    const className = handle(true).button.className;
    expect(className).toContain("px-(--spacing-padding-2)");
    expect(className).toContain("py-(--spacing-padding-8)");
    expect(className).toContain("size-fit");
    expect(className).not.toMatch(/\b[hw]-\[/);
  });

  it("открытая панель залита background/primary и без кромки", () => {
    const className = handle(true).button.className;
    expect(className).toContain("bg-(--background-primary)");
    expect(className).not.toContain("inset-shadow-");
  });

  it("свёрнутая панель залита background/secondary, а кромку макета дают три inset-тени по верху, правому краю и низу: border съел бы ширину под глиф", () => {
    const className = handle(false).button.className;
    expect(className).toContain("bg-(--background-secondary)");
    expect(className).toContain("0_1px_0_0_var(--background-primary)");
    expect(className).toContain("0_-1px_0_0_var(--background-primary)");
    expect(className).toContain("-1px_0_0_0_var(--background-primary)");
  });

  it("тень макета — боковая", () => {
    expect(handle(true).button.className).toContain("shadow-(--shadow-hud-side)");
  });

  it("сообщает состояние панели", () => {
    expect(handle(true).button).toHaveAttribute("aria-expanded", "true");
  });

  it("шеврон разворачивается вслед за состоянием, как вариант макета", () => {
    expect(handle(true).icon).toHaveAttribute("data-icon", "chevron-left");
    expect(handle(false).icon).toHaveAttribute("data-icon", "chevron-right");
  });

  it("глиф двадцатый и скрыт от скринридера — имя несёт кнопка", () => {
    const { icon } = handle(true);
    expect(icon).toHaveAttribute("width", "20");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
