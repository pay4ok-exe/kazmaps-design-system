import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PasswordInput } from "./password-input";

const field = () => screen.getByLabelText("Пароль");

describe("PasswordInput", () => {
  it("прячет пароль и открывает его по глазу", async () => {
    render(<PasswordInput label="Пароль" value="secret" onChange={vi.fn()} />);
    expect(field()).toHaveAttribute("type", "password");
    await userEvent.click(screen.getByRole("button", { name: "Показать пароль" }));
    expect(field()).toHaveAttribute("type", "text");
    await userEvent.click(screen.getByRole("button", { name: "Скрыть пароль" }));
    expect(field()).toHaveAttribute("type", "password");
  });

  it("сообщает состояние кнопки", async () => {
    render(<PasswordInput label="Пароль" value="secret" onChange={vi.fn()} />);
    const button = () => screen.getByRole("button", { name: /пароль/i });
    expect(button()).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(button());
    expect(button()).toHaveAttribute("aria-pressed", "true");
  });

  it("глаз ростом со строку (20), а площадь нажатия добирает псевдоэлемент вне потока — поле остаётся 36 как у TextInput", () => {
    render(<PasswordInput label="Пароль" value="secret" onChange={vi.fn()} />);
    const className = screen.getByRole("button", { name: "Показать пароль" }).className;
    expect(className).toContain("size-5");
    expect(className).toContain("before:-inset-2");
  });
});
