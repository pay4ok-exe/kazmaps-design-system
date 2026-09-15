import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, type ButtonSize } from "./button";

describe("Button", () => {
  it("рендерит подпись и зовёт onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Нажми</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Нажми" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("по умолчанию type=button и размер md", () => {
    render(<Button>x</Button>);
    const button = screen.getByRole("button", { name: "x" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.className).toContain("h-(--dimension-height-40)");
  });

  it.each<[ButtonSize, string]>([
    ["sm", "h-[34px]"],
    ["md", "h-(--dimension-height-40)"],
    ["lg", "h-11"],
  ])("size=%s даёт класс %s независимо от варианта", (size, heightClass) => {
    render(
      <>
        <Button size={size} variant="outline">
          a
        </Button>
        <Button size={size} variant="accent">
          b
        </Button>
      </>,
    );
    expect(screen.getByRole("button", { name: "a" }).className).toContain(heightClass);
    expect(screen.getByRole("button", { name: "b" }).className).toContain(heightClass);
  });

  // Правый паддинг у иконочного варианта в макете меньше левого (10 против 12) —
  // ровно это и легко потерять при рефакторинге, поэтому проверяется явно.
  it("иконка включает асимметричный паддинг и gap макета", () => {
    render(
      <>
        <Button>без иконки</Button>
        <Button icon={<span data-testid="i" />}>с иконкой</Button>
      </>,
    );
    expect(screen.getByRole("button", { name: "без иконки" }).className).toContain(
      "px-(--spacing-padding-12)",
    );
    const withIcon = screen.getByRole("button", { name: "с иконкой" }).className;
    expect(withIcon).toContain("pl-(--spacing-padding-12)");
    expect(withIcon).toContain("pr-(--spacing-padding-10)");
    expect(withIcon).toContain("gap-(--spacing-gap-6)");
  });

  it.each<["accent" | "neutral" | "danger", string]>([
    ["accent", "--action-accent-primary"],
    ["neutral", "--action-neutral-primary"],
    ["danger", "--action-danger-primary"],
  ])("variant=%s заливается ролью %s поверх градиентной обводки", (variant, fill) => {
    render(<Button variant={variant}>{variant}</Button>);
    const className = screen.getByRole("button", { name: variant }).className;
    expect(className).toContain("btn-surface");
    expect(className).toContain(`[--btn-fill:var(${fill})]`);
  });

  it("fullWidth растягивает кнопку, type=submit пробрасывается", () => {
    render(
      <Button type="submit" fullWidth>
        Отправить
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Отправить" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button.className).toContain("w-full");
  });

  it("disabled гасит кнопку ролями макета, а не прозрачностью", () => {
    render(
      <Button variant="outline" disabled>
        x
      </Button>,
    );
    const className = screen.getByRole("button", { name: "x" }).className;
    expect(className).toContain("disabled:bg-(--action-disabled)");
    expect(className).toContain("disabled:text-(color:--text-tertiary)");
    expect(className).not.toContain("disabled:opacity-50");
  });
});
