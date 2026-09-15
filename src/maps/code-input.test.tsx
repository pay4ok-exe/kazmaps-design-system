import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CodeInput } from "./code-input";

const cells = () => screen.getAllByRole("textbox");

describe("CodeInput", () => {
  it("рисует по ячейке на элемент и подписывает каждую", () => {
    render(<CodeInput values={["", "", ""]} onChange={vi.fn()} />);
    expect(cells()).toHaveLength(3);
    expect(screen.getByLabelText("Цифра 2 из 3")).toBeInTheDocument();
  });

  it("принимает только цифры и переводит фокус вперёд", async () => {
    const onChange = vi.fn();
    render(<CodeInput values={["", ""]} onChange={onChange} />);
    await userEvent.type(cells()[0], "7");
    expect(onChange).toHaveBeenCalledWith(0, "7");
    await userEvent.type(cells()[0], "a");
    expect(onChange).not.toHaveBeenCalledWith(0, "a");
  });

  it("возвращает фокус назад по Backspace в пустой ячейке", async () => {
    render(<CodeInput values={["1", ""]} onChange={vi.fn()} />);
    cells()[1].focus();
    await userEvent.keyboard("{Backspace}");
    expect(cells()[0]).toHaveFocus();
  });

  /* Обводка ячейки — единственное место во всём ките, где используется
     полуторная роль. Потерять её при рефакторинге легко, увидеть — трудно. */
  it("обводка полуторная, как в макете", () => {
    render(<CodeInput values={[""]} onChange={vi.fn()} />);
    expect(cells()[0].className).toContain("border-(length:--stroke-border-1_5)");
  });

  it("пустая ячейка без рамки, заполненная — с border/primary", () => {
    render(<CodeInput values={["", "5"]} onChange={vi.fn()} />);
    expect(cells()[0].className).toContain("border-transparent");
    expect(cells()[1].className).toContain("border-(--border-primary)");
  });

  it("invalid красит рамку и цифру ошибкой во всех ячейках", () => {
    render(<CodeInput values={["1", "2"]} onChange={vi.fn()} invalid />);
    for (const cell of cells()) {
      expect(cell.className).toContain("border-(--border-error)");
      expect(cell.className).toContain("text-(color:--text-danger)");
      expect(cell).toHaveAttribute("aria-invalid", "true");
    }
  });
});
