import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PillTabs } from "./pill-tabs";

const OPTIONS = [
  { id: "map", label: "Карта" },
  { id: "list", label: "Список" },
];

const indicator = (container: HTMLElement) => container.querySelector("span[aria-hidden='true']");

describe("PillTabs", () => {
  it("сообщает выбранный пункт и зовёт onSelect", async () => {
    const onSelect = vi.fn();
    render(<PillTabs options={OPTIONS} activeId="map" onSelect={onSelect} label="Вид" />);
    expect(screen.getByRole("button", { name: "Карта" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Список" })).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(screen.getByRole("button", { name: "Список" }));
    expect(onSelect).toHaveBeenCalledWith("list");
  });

  it("группа подписана для скринридера", () => {
    render(<PillTabs options={OPTIONS} activeId="map" onSelect={vi.fn()} label="Вид" />);
    expect(screen.getByRole("group", { name: "Вид" })).toBeInTheDocument();
  });

  it("индикатор занимает долю трека по числу пунктов", () => {
    const { container } = render(
      <PillTabs options={OPTIONS} activeId="map" onSelect={vi.fn()} label="Вид" />,
    );
    expect(indicator(container)).toHaveStyle({
      width: "calc((100% - 2 * var(--spacing-padding-2) - 1 * var(--spacing-gap-2)) / 2)",
    });
  });

  it("индикатор едет на позицию выбранного пункта", () => {
    const { container, rerender } = render(
      <PillTabs options={OPTIONS} activeId="map" onSelect={vi.fn()} label="Вид" />,
    );
    expect(indicator(container)).toHaveStyle({
      translate: "calc(0 * (100% + var(--spacing-gap-2)))",
    });

    rerender(<PillTabs options={OPTIONS} activeId="list" onSelect={vi.fn()} label="Вид" />);
    expect(indicator(container)).toHaveStyle({
      translate: "calc(1 * (100% + var(--spacing-gap-2)))",
    });
  });

  it("без совпадения по activeId индикатор не рисуется", () => {
    const { container } = render(
      <PillTabs options={OPTIONS} activeId="нет такого" onSelect={vi.fn()} label="Вид" />,
    );
    expect(indicator(container)).toBeNull();
  });

  it("невыбранный пункт на наведении красится как выбранный", () => {
    render(<PillTabs options={OPTIONS} activeId="map" onSelect={vi.fn()} label="Вид" />);
    const inactive = screen.getByRole("button", { name: "Список" }).className;
    expect(inactive).toContain("text-(color:--text-tertiary)");
    expect(inactive).toContain("hover:text-(color:--text-primary)");
  });
  it("контейнер несёт обе заливки макета", () => {
    const { container } = render(
      <PillTabs
        label="Вид"
        activeId="map"
        onSelect={vi.fn()}
        options={[
          { id: "map", label: "Карта" },
          { id: "list", label: "Список" },
        ]}
      />,
    );
    const className = container.firstElementChild?.className ?? "";
    // В макете у Toggle Switch две заливки: background/toggle и поверх неё
    // background/toggle-2 в 3 % — вторая ложится слоем фона-картинки.
    expect(className).toContain("bg-(--background-toggle)");
    expect(className).toContain("--background-toggle-2");
  });
});
