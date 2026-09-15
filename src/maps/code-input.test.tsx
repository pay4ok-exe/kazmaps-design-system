import { fireEvent, render, screen } from "@testing-library/react";
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
     полуторная роль, и она ВНУТРЕННЯЯ: высота 48 складывается из паддинга 12,
     строки 24 и паддинга 12, а обводка лежит поверх паддинга. border здесь
     подрезал бы строку на три пикселя. */
  it("обводка полуторная, как в макете", () => {
    render(<CodeInput values={[""]} onChange={vi.fn()} />);
    expect(cells()[0].className).toContain("inset-ring-[length:var(--stroke-border-1_5)]");
    expect(cells()[0].className).toContain("py-(--spacing-padding-12)");
    expect(cells()[0].className).not.toMatch(/\bh-\[/);
  });

  it("пустая ячейка без рамки, заполненная — с border/primary", () => {
    render(<CodeInput values={["", "5"]} onChange={vi.fn()} />);
    expect(cells()[0].className).not.toContain("inset-ring-(--border-primary)");
    expect(cells()[1].className).toContain("inset-ring-(--border-primary)");
  });

  it("invalid красит рамку и цифру ошибкой во всех ячейках", () => {
    render(<CodeInput values={["1", "2"]} onChange={vi.fn()} invalid />);
    for (const cell of cells()) {
      expect(cell.className).toContain("inset-ring-(--border-error)");
      expect(cell.className).toContain("text-(color:--text-danger)");
      expect(cell).toHaveAttribute("aria-invalid", "true");
    }
  });
});

describe("CodeInput input sources", () => {
  it("spreads a multi-digit value from one-time-code autofill across the cells", () => {
    const onChange = vi.fn();
    render(<CodeInput values={["", "", "", ""]} onChange={onChange} />);
    fireEvent.change(cells()[0], { target: { value: "1234" } });
    expect(onChange.mock.calls).toEqual([
      [0, "1"],
      [1, "2"],
      [2, "3"],
      [3, "4"],
    ]);
  });

  it("typing into a filled cell replaces its digit", async () => {
    const onChange = vi.fn();
    render(<CodeInput values={["3", ""]} onChange={onChange} />);
    await userEvent.type(cells()[0], "7");
    expect(onChange).toHaveBeenCalledWith(0, "7");
  });
});

describe("CodeInput idle ring", () => {
  it("keeps the empty cell ring transparent instead of the text colour", () => {
    render(<CodeInput values={["", "5"]} onChange={vi.fn()} />);
    expect(cells()[0].className).toContain("inset-ring-transparent");
    expect(cells()[1].className).not.toContain("inset-ring-transparent");
  });
});
