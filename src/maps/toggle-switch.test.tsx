import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ToggleSwitch } from "./toggle-switch";

const OPTIONS = [
  { id: "map", label: "Карта" },
  { id: "list", label: "Список" },
];

const indicator = (container: HTMLElement) => container.querySelector("span[aria-hidden='true']");

describe("ToggleSwitch", () => {
  it("сообщает выбранный пункт и зовёт onSelect", async () => {
    const onSelect = vi.fn();
    render(<ToggleSwitch options={OPTIONS} activeId="map" onSelect={onSelect} label="Вид" />);
    expect(screen.getByRole("button", { name: "Карта" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Список" })).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(screen.getByRole("button", { name: "Список" }));
    expect(onSelect).toHaveBeenCalledWith("list");
  });

  it("группа подписана для скринридера", () => {
    render(<ToggleSwitch options={OPTIONS} activeId="map" onSelect={vi.fn()} label="Вид" />);
    expect(screen.getByRole("group", { name: "Вид" })).toBeInTheDocument();
  });

  /* Ширина и сдвиг индикатора считаются от числа пунктов, а не зашиты под два:
     проверяем обе формулы, потому что ошибка в них не роняет тесты рендера,
     а тихо смещает подложку мимо подписи. */
  it("индикатор занимает долю трека по числу пунктов", () => {
    const { container } = render(
      <ToggleSwitch options={OPTIONS} activeId="map" onSelect={vi.fn()} label="Вид" />,
    );
    expect(indicator(container)).toHaveStyle({
      width: "calc((100% - 2 * var(--spacing-padding-2) - 1 * var(--spacing-gap-2)) / 2)",
    });
  });

  it("индикатор едет на позицию выбранного пункта", () => {
    const { container, rerender } = render(
      <ToggleSwitch options={OPTIONS} activeId="map" onSelect={vi.fn()} label="Вид" />,
    );
    expect(indicator(container)).toHaveStyle({
      translate: "calc(0 * (100% + var(--spacing-gap-2)))",
    });

    rerender(<ToggleSwitch options={OPTIONS} activeId="list" onSelect={vi.fn()} label="Вид" />);
    expect(indicator(container)).toHaveStyle({
      translate: "calc(1 * (100% + var(--spacing-gap-2)))",
    });
  });

  it("без совпадения по activeId индикатор не рисуется", () => {
    const { container } = render(
      <ToggleSwitch options={OPTIONS} activeId="нет такого" onSelect={vi.fn()} label="Вид" />,
    );
    expect(indicator(container)).toBeNull();
  });

  // Hover и Active в макете — одно состояние подписи, поэтому невыбранный пункт
  // на наведении красится в тот же text/primary, что и выбранный.
  it("невыбранный пункт на наведении красится как выбранный", () => {
    render(<ToggleSwitch options={OPTIONS} activeId="map" onSelect={vi.fn()} label="Вид" />);
    const inactive = screen.getByRole("button", { name: "Список" }).className;
    expect(inactive).toContain("text-(color:--text-tertiary)");
    expect(inactive).toContain("hover:text-(color:--text-primary)");
  });
});
