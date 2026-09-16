import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { NavBar } from "./nav-bar";
import { TAB_ACTION_STATE } from "./tab-action.states";

const item = (id: string, label: string, onSelect = vi.fn()) => ({
  id,
  label,
  icon: <span />,
  onSelect,
});

describe("NavBar", () => {
  it("зовёт обработчик пункта и подписывает рельс", async () => {
    const onSelect = vi.fn();
    render(
      <NavBar
        label="Разделы"
        activeId="search"
        items={[item("search", "Поиск"), item("routes", "Маршруты", onSelect)]}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Разделы" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Маршруты" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("активный пункт помечен aria-current, а не aria-pressed", () => {
    render(<NavBar label="Разделы" activeId="search" items={[item("search", "Поиск")]} />);
    const button = screen.getByRole("button", { name: "Поиск" });
    expect(button).toHaveAttribute("aria-current", "page");
    expect(button).not.toHaveAttribute("aria-pressed");
  });

  it("нижняя группа рисуется только когда передана", () => {
    const { rerender } = render(
      <NavBar label="Разделы" activeId="search" items={[item("search", "Поиск")]} />,
    );
    expect(screen.queryByRole("button", { name: "Установить" })).toBeNull();
    rerender(
      <NavBar
        label="Разделы"
        activeId="search"
        items={[item("search", "Поиск")]}
        secondaryItems={[item("install", "Установить")]}
      />,
    );
    expect(screen.getByRole("button", { name: "Установить" })).toBeInTheDocument();
  });

  it("тянется на всю высоту, а не фиксирует её числом", () => {
    const { container } = render(
      <NavBar label="Разделы" activeId="search" items={[item("search", "Поиск")]} />,
    );
    const className = container.firstElementChild?.className ?? "";
    expect(className).toContain("h-full");
    expect(className).toContain("justify-between");
    expect(className).not.toMatch(/h-\[\d/);
  });
  it("без внешнего activeId панель сама отмечает нажатую вкладку", async () => {
    const onSelect = vi.fn();
    render(
      <NavBar
        label="Разделы"
        defaultActiveId="search"
        items={[item("search", "Поиск"), item("routes", "Маршруты", onSelect)]}
      />,
    );
    expect(screen.getByRole("button", { name: "Поиск" })).toHaveAttribute("aria-current", "page");
    await userEvent.click(screen.getByRole("button", { name: "Маршруты" }));
    expect(screen.getByRole("button", { name: "Маршруты" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Поиск" })).not.toHaveAttribute("aria-current");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("под внешним activeId выбор остаётся за приложением", async () => {
    const onSelect = vi.fn();
    render(
      <NavBar
        label="Разделы"
        activeId="search"
        items={[item("search", "Поиск"), item("routes", "Маршруты", onSelect)]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Маршруты" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Поиск" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Маршруты" })).not.toHaveAttribute("aria-current");
  });

  it("витрина состояний берёт те же роли, что и компонент", () => {
    const { rerender } = render(
      <NavBar label="Разделы" activeId={null} items={[item("search", "Поиск")]} />,
    );
    const glyph = () =>
      screen.getByRole("button", { name: "Поиск" }).querySelector("span")?.className ?? "";
    expect(glyph()).toContain(TAB_ACTION_STATE.idle);
    rerender(<NavBar label="Разделы" activeId="search" items={[item("search", "Поиск")]} />);
    expect(glyph()).toContain(TAB_ACTION_STATE.active);
  });
});
