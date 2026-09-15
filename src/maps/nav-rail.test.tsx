import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { NavRail } from "./nav-rail";

const item = (id: string, label: string, onSelect = vi.fn()) => ({
  id,
  label,
  icon: <span />,
  onSelect,
});

describe("NavRail", () => {
  it("зовёт обработчик пункта и подписывает рельс", async () => {
    const onSelect = vi.fn();
    render(
      <NavRail
        label="Разделы"
        activeId="search"
        items={[item("search", "Поиск"), item("routes", "Маршруты", onSelect)]}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Разделы" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Маршруты" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  /* Рельс сообщает о ТЕКУЩЕЙ СТРАНИЦЕ, а ряд — о нажатии. Оба рисуют один и тот
     же _Tab Action, и перепутать семантику легко. */
  it("активный пункт помечен aria-current, а не aria-pressed", () => {
    render(<NavRail label="Разделы" activeId="search" items={[item("search", "Поиск")]} />);
    const button = screen.getByRole("button", { name: "Поиск" });
    expect(button).toHaveAttribute("aria-current", "page");
    expect(button).not.toHaveAttribute("aria-pressed");
  });

  it("нижняя группа рисуется только когда передана", () => {
    const { rerender } = render(
      <NavRail label="Разделы" activeId="search" items={[item("search", "Поиск")]} />,
    );
    expect(screen.queryByRole("button", { name: "Установить" })).toBeNull();
    rerender(
      <NavRail
        label="Разделы"
        activeId="search"
        items={[item("search", "Поиск")]}
        secondaryItems={[item("install", "Установить")]}
      />,
    );
    expect(screen.getByRole("button", { name: "Установить" })).toBeInTheDocument();
  });

  /* Высота 1024 в макете — размер холста варианта. SPACE_BETWEEN работает только
     когда рельс тянется на всю высоту, поэтому число сюда переносить нельзя. */
  it("тянется на всю высоту, а не фиксирует её числом", () => {
    const { container } = render(
      <NavRail label="Разделы" activeId="search" items={[item("search", "Поиск")]} />,
    );
    const className = container.firstElementChild?.className ?? "";
    expect(className).toContain("h-full");
    expect(className).toContain("justify-between");
    expect(className).not.toMatch(/h-\[\d/);
  });
});
