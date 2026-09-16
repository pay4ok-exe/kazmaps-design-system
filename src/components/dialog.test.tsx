import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Dialog } from "./dialog";

function panel(name: string): HTMLElement {
  const node = screen
    .getByRole("dialog", { name })
    .querySelector<HTMLElement>("div[tabindex='-1']");
  if (node === null) throw new Error("панель диалога не найдена");
  return node;
}

describe("Dialog", () => {
  it("по умолчанию ограничен 440px", () => {
    render(
      <Dialog title="Тест" onClose={() => undefined}>
        <p>тело</p>
      </Dialog>,
    );
    expect(panel("Тест").className).toContain("max-w-[440px]");
    expect(panel("Тест").className).toContain("w-full");
  });

  it("size=sm даёт 400px, а className дописывается, не подменяя ширину", () => {
    render(
      <Dialog title="Тест" size="sm" className="p-0" onClose={() => undefined}>
        <p>тело</p>
      </Dialog>,
    );
    expect(panel("Тест").className).toContain("max-w-[400px]");
    expect(panel("Тест").className).toContain("p-0");
    expect(panel("Тест").className).not.toContain("max-w-[440px]");
  });

  it("панель повторяет макет: радиус 16, фон и модальная тень", () => {
    render(
      <Dialog title="Тест" onClose={() => undefined}>
        <p>тело</p>
      </Dialog>,
    );
    const className = panel("Тест").className;
    expect(className).toContain("rounded-(--dimension-corner-radius-16)");
    expect(className).toContain("bg-(--background-primary)");
    expect(className).toContain("shadow-(--shadow-modal)");
  });

  it("шапка без нижнего отступа, заголовок 16/20 весом 500", () => {
    render(
      <Dialog title="Заголовок" onClose={() => undefined}>
        <p>тело</p>
      </Dialog>,
    );
    const header = screen.getByRole("dialog", { name: "Заголовок" }).querySelector("header");
    expect(header?.className).toContain("px-(--spacing-padding-8)");
    expect(header?.className).toContain("pt-(--spacing-padding-8)");
    expect(header?.className).not.toMatch(/\bpb-/);
    const title = screen.getByText("Заголовок");
    expect(title.className).toContain("text-base");
    expect(title.className).toContain("leading-(--typography-line-height-20)");
    expect(title.className).toContain("[font-weight:var(--font-weight-medium)]");
  });

  it("в шапке только заголовок и закрытие", () => {
    render(
      <Dialog title="Заголовок" onClose={() => undefined}>
        <p>тело</p>
      </Dialog>,
    );
    const header = screen.getByRole("dialog", { name: "Заголовок" }).querySelector("header");
    expect(header?.children).toHaveLength(2);
  });

  it("кнопка закрытия проходит три состояния макета", () => {
    render(
      <Dialog title="Тест" closeLabel="Закрыть" onClose={() => undefined}>
        <p>тело</p>
      </Dialog>,
    );
    const className = screen.getByRole("button", { name: "Закрыть" }).className;
    expect(className).toContain("size-[28px]");
    expect(className).toContain("rounded-(--dimension-corner-radius-8)");
    expect(className).toContain("bg-(--background-secondary)");
    expect(className).toContain("text-(color:--icon-secondary)");
    expect(className).toContain("hover:bg-(--background-tertiary)");
    expect(className).toContain("hover:text-(color:--icon-primary)");
    expect(className).toContain("active:text-(color:--icon-tertiary)");
  });

  it("Escape и клик по подложке зовут onClose", async () => {
    const onClose = vi.fn();
    render(
      <Dialog title="Тест" onClose={onClose}>
        <p>тело</p>
      </Dialog>,
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
    const backdrop = screen
      .getByRole("dialog", { name: "Тест" })
      .querySelector<HTMLElement>("button[aria-hidden='true']");
    if (backdrop === null) throw new Error("подложка не найдена");
    await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
