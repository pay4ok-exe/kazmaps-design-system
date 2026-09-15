import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Chip } from "./chip";

describe("Chip", () => {
  it("сообщает нажатое состояние и зовёт onClick", async () => {
    const onClick = vi.fn();
    render(<Chip label="Кафе" onClick={onClick} />);
    const chip = screen.getByRole("button", { name: "Кафе" });
    expect(chip).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(chip);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  /* Паддинг в макете несимметричный именно из-за иконочного чипа слева:
     2/6/2/2. Без иконки такого варианта в макете нет, и левая двойка там
     смотрелась бы обрезанной — поэтому паддинг становится симметричным. */
  it("иконка включает несимметричный паддинг макета", () => {
    render(<Chip label="Кафе" icon={<span data-testid="i" />} />);
    const className = screen.getByRole("button", { name: "Кафе" }).className;
    expect(className).toContain("pl-(--spacing-padding-2)");
    expect(className).toContain("pr-(--spacing-padding-6)");
  });

  it("без иконки паддинг симметричный", () => {
    render(<Chip label="Кафе" />);
    const className = screen.getByRole("button", { name: "Кафе" }).className;
    expect(className).toContain("px-(--spacing-padding-6)");
    expect(className).not.toContain("pl-(--spacing-padding-2)");
  });

  it("рамка в покое прозрачна и проявляется на наведении", () => {
    render(<Chip label="Кафе" />);
    const className = screen.getByRole("button", { name: "Кафе" }).className;
    expect(className).toContain("border-transparent");
    expect(className).toContain("hover:border-(--border-secondary)");
  });
});

describe("Chip: тон", () => {
  /* Welcome Label из секции Login — тот же чип с другой поверхностью и синей
     иконкой. Отдельным компонентом не заводили, потому что геометрия совпадает. */
  it("neutral повторяет Category Label, info — Welcome Label", () => {
    const { rerender } = render(<Chip label="Кафе" icon={<span />} />);
    let chip = screen.getByRole("button", { name: "Кафе" });
    expect(chip.className).toContain("bg-(--background-primary)");
    expect(chip.querySelector("span")?.className).toContain("bg-(--tag-gray)");

    rerender(<Chip label="Кафе" icon={<span />} tone="info" />);
    chip = screen.getByRole("button", { name: "Кафе" });
    expect(chip.className).toContain("bg-(--background-secondary)");
    expect(chip.querySelector("span")?.className).toContain("bg-(--tag-blue)");
  });
});
