import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SearchInput } from "./search-input";

describe("SearchInput", () => {
  it("отдаёт введённый текст", async () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} placeholder="Поиск" />);
    await userEvent.type(screen.getByPlaceholderText("Поиск"), "к");
    expect(onChange).toHaveBeenCalledWith("к");
  });

  /* Высота 36 в макете нигде не задана числом — она складывается из паддинга 8
     и иконки 20. Фиксация высоты классом развалила бы это при смене кегля. */
  it("высота остаётся производной от паддинга, а не задана числом", () => {
    const { container } = render(<SearchInput value="" onChange={vi.fn()} />);
    const className = container.firstElementChild?.className ?? "";
    expect(className).toContain("p-(--spacing-padding-8)");
    expect(className).not.toMatch(/\bh-(\[|\()/);
  });

  it("обводка внутренняя и проходит три состояния макета", () => {
    const { container } = render(<SearchInput value="" onChange={vi.fn()} />);
    const className = container.firstElementChild?.className ?? "";
    expect(className).toContain("inset-ring-(--border-secondary)");
    expect(className).toContain("hover:inset-ring-(--border-primary)");
    expect(className).toContain("has-[input:focus]:inset-ring-(--border-focus)");
  });

  it("тень есть в обычном виде и снята в плотном", () => {
    const { container, rerender } = render(<SearchInput value="" onChange={vi.fn()} />);
    expect(container.firstElementChild?.className).toContain("shadow-(--shadow-field)");
    rerender(<SearchInput value="" onChange={vi.fn()} compact />);
    expect(container.firstElementChild?.className).not.toContain("shadow-(--shadow-field)");
  });

  it("кнопка отправки появляется только с onSubmit", async () => {
    const onSubmit = vi.fn();
    const { rerender } = render(<SearchInput value="" onChange={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Искать" })).toBeNull();
    rerender(<SearchInput value="" onChange={vi.fn()} onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("button", { name: "Искать" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
