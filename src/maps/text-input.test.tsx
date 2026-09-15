import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TextInput } from "./text-input";

describe("TextInput", () => {
  it("связывает подпись с полем", () => {
    render(<TextInput label="Почта" value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Почта").tagName).toBe("INPUT");
  });

  /* Текста ошибки у поля нет и не должно появиться: в KazMaps его показывает
     тост. Поле несёт только визуальное состояние. */
  it("ошибка не рисует подписи под полем", () => {
    const { container } = render(
      <TextInput label="Почта" value="abc" onChange={vi.fn()} invalid />,
    );
    expect(container.querySelector("p")).toBeNull();
    expect(screen.getByLabelText("Почта")).toHaveAttribute("aria-invalid", "true");
  });

  /* В состоянии Error макет красит не только рамку, но и сам текст поля в
     text/danger. Это замер, а не вольность — и именно то, что сотрут первым. */
  it("ошибка красит текст поля, а не только рамку", () => {
    const { container } = render(
      <TextInput label="Почта" value="abc" onChange={vi.fn()} invalid />,
    );
    expect(screen.getByLabelText("Почта").className).toContain("text-(color:--text-danger)");
    expect(container.firstElementChild?.querySelector("div")?.className).toContain(
      "inset-ring-(--border-error)",
    );
  });

  it("обводка внутренняя и проявляется на наведении и фокусе", () => {
    const { container } = render(<TextInput value="" onChange={vi.fn()} />);
    // Обёртка → оболочка поля; querySelector("div > div") цепляет саму обёртку.
    const shell = container.firstElementChild?.firstElementChild?.className ?? "";
    expect(shell).toContain("inset-ring-[length:var(--stroke-border-1)]");
    expect(shell).toContain("hover:inset-ring-(--border-secondary)");
    expect(shell).toContain("has-[input:focus]:inset-ring-(--border-focus)");
  });
});
