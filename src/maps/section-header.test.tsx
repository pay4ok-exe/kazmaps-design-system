import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeader } from "./section-header";

describe("SectionHeader", () => {
  /* До замера это была мелкая подпись в верхнем регистре с разрядкой. В макете
     заголовок один и он крупный — 16/20 весом 500 цветом text/primary. */
  it("рисует заголовок кеглем макета, а не капсом", () => {
    render(<SectionHeader>Рядом</SectionHeader>);
    const className = screen.getByText("Рядом").className;
    expect(className).toContain("text-base");
    expect(className).toContain("leading-(--typography-line-height-20)");
    expect(className).toContain("text-(color:--text-primary)");
    expect(className).toContain("[font-weight:var(--font-weight-medium)]");
    expect(className).not.toContain("uppercase");
  });

  it("слот действий рисуется только когда передан", () => {
    const { rerender } = render(<SectionHeader>Рядом</SectionHeader>);
    expect(screen.queryByTestId("act")).toBeNull();
    rerender(<SectionHeader action={<button data-testid="act">Ещё</button>}>Рядом</SectionHeader>);
    expect(screen.getByTestId("act")).toBeInTheDocument();
  });
});
