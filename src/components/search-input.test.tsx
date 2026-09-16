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

  it("фокус показывает только рамку макета, без второго кольца", () => {
    const { container } = render(<SearchInput value="" onChange={vi.fn()} />);
    expect(container.firstElementChild?.className).not.toContain("focus-ring-within");
  });

  it("тень макета стоит всегда", () => {
    const { container } = render(<SearchInput value="" onChange={vi.fn()} />);
    expect(container.firstElementChild?.className).toContain("shadow-(--shadow-field)");
  });

  it("в поле нет ничего, кроме иконки и ввода", () => {
    const { container } = render(<SearchInput value="кофе" onChange={vi.fn()} />);
    expect(screen.queryByRole("button")).toBeNull();
    expect(container.firstElementChild?.children).toHaveLength(2);
  });

  it("крестик очистки браузера скрыт", () => {
    render(<SearchInput value="кофе" onChange={vi.fn()} placeholder="Поиск" />);
    expect(screen.getByPlaceholderText("Поиск").className).toContain(
      "[&::-webkit-search-cancel-button]:hidden",
    );
  });
});
