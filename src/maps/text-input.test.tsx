import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TextInput } from "./text-input";

describe("TextInput", () => {
  it("связывает подпись и сообщение об ошибке с полем", () => {
    render(<TextInput label="Почта" value="" onChange={vi.fn()} error="Неверный адрес" />);
    const input = screen.getByLabelText("Почта");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Неверный адрес");
  });

  /* В состоянии Error макет красит не только рамку, но и сам текст поля в
     text/danger. Это замер, а не вольность — и именно то, что сотрут первым. */
  it("ошибка красит текст поля, а не только рамку", () => {
    render(<TextInput label="Почта" value="abc" onChange={vi.fn()} error="Неверный адрес" />);
    expect(screen.getByLabelText("Почта").className).toContain("text-(color:--text-danger)");
  });

  it("в покое рамка прозрачна и проявляется на наведении и фокусе", () => {
    const { container } = render(<TextInput value="" onChange={vi.fn()} />);
    // Обёртка → оболочка поля; querySelector("div > div") цепляет саму обёртку.
    const shell = container.firstElementChild?.firstElementChild?.className ?? "";
    expect(shell).toContain("border-transparent");
    expect(shell).toContain("hover:border-(--border-secondary)");
    expect(shell).toContain("has-[input:focus]:border-(--border-focus)");
  });
});
