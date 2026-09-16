import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MenuItem } from "./menu-item";
import { MENU_ITEM_STATE } from "./menu-item.states";

const glyph = <svg data-testid="glyph" />;
const boldGlyph = <svg data-testid="bold" />;

const item = (props: Partial<Parameters<typeof MenuItem>[0]> = {}) =>
  render(<MenuItem icon={glyph} label="Избранные места" {...props} />);

const button = () => screen.getByRole("button", { name: /Избранные места/ });

describe("MenuItem", () => {
  it("повторяет оболочку макета: 32 из паддинга 6, зазор 8, радиус 4", () => {
    item();
    const className = button().className;
    expect(className).toContain("p-(--spacing-padding-6)");
    expect(className).toContain("gap-(--spacing-gap-8)");
    expect(className).toContain("rounded-(--dimension-corner-radius-4)");
    expect(className).not.toMatch(/\bh-\[/);
  });

  it("подпись 14/20 весом 450 и обрезается многоточием", () => {
    item();
    const className = screen.getByText("Избранные места").className;
    expect(className).toContain("text-sm");
    expect(className).toContain("leading-(--typography-line-height-20)");
    expect(className).toContain("[font-weight:var(--font-weight-book)]");
    expect(className).toContain("truncate");
  });

  it("обычный пункт вторичный, на наведении становится основным", () => {
    item();
    const className = screen.getByText("Избранные места").className;
    expect(className).toContain("text-(color:--text-secondary)");
    expect(className).toContain("group-hover:text-(color:--text-primary)");
  });

  it("активный пункт меняет глиф на жирный и красит его акцентом", () => {
    const { rerender } = item({ activeIcon: boldGlyph });
    expect(screen.getByTestId("glyph")).toBeInTheDocument();
    rerender(<MenuItem icon={glyph} activeIcon={boldGlyph} label="Избранные места" active />);
    expect(screen.getByTestId("bold")).toBeInTheDocument();
    expect(button()).toHaveAttribute("aria-current", "true");
    expect(screen.getByText("Избранные места").className).toContain("text-(color:--text-primary)");
  });

  it("счётчик рисуется только с count и синеет при непрочитанном", () => {
    const { rerender } = item();
    expect(screen.queryByText("5")).toBeNull();
    rerender(<MenuItem icon={glyph} label="Избранные места" count={5} />);
    expect(screen.getByText("5").className).toContain("text-(color:--text-secondary)");
    rerender(<MenuItem icon={glyph} label="Избранные места" count={5} unread />);
    expect(screen.getByText("5").className).toContain("text-(color:--text-accent)");
  });

  it("точка появляется только при непрочитанном", () => {
    const { container, rerender } = item();
    expect(container.querySelector("span.size-1\\.5")).toBeNull();
    rerender(<MenuItem icon={glyph} label="Избранные места" unread />);
    expect(container.querySelector("span.size-1\\.5")?.className).toContain("bg-(--icon-accent)");
  });

  it("шеврон рисуется только когда запрошен", () => {
    const { container, rerender } = item();
    expect(container.querySelector("[data-icon='chevron-right']")).toBeNull();
    rerender(<MenuItem icon={glyph} label="Избранные места" chevron />);
    expect(container.querySelector("[data-icon='chevron-right']")).not.toBeNull();
  });

  it("выключенный пункт третичный и не нажимается", async () => {
    const onSelect = vi.fn();
    item({ disabled: true, onSelect });
    expect(button()).toBeDisabled();
    expect(screen.getByText("Избранные места").className).toContain("text-(color:--text-tertiary)");
    await userEvent.click(button());
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("зовёт обработчик", async () => {
    const onSelect = vi.fn();
    item({ onSelect });
    await userEvent.click(button());
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
  it("витрина наведения бьёт по тем же частям, что красит компонент", () => {
    const { container } = item();
    expect(container.querySelector("[data-part='icon']")).not.toBeNull();
    expect(container.querySelector("[data-part='label']")).not.toBeNull();
    expect(MENU_ITEM_STATE.hoverPreview).toContain("data-part=icon");
    expect(MENU_ITEM_STATE.hoverPreview).toContain("data-part=label");
  });
});
