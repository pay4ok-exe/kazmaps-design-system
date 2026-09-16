import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MenuTabs } from "./menu-tabs";

const OPTIONS = [
  { id: "map", label: "Карта" },
  { id: "sat", label: "Спутник" },
];

const setup = (extra: Partial<Parameters<typeof MenuTabs>[0]> = {}) =>
  render(<MenuTabs title="Тема" options={OPTIONS} activeId="map" onSelect={vi.fn()} {...extra} />);

describe("MenuTabs", () => {
  it("заголовок называет группу вкладок", () => {
    setup();
    expect(screen.getByText("Тема")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Тема" })).toBeInTheDocument();
  });

  it("передаёт выбор наружу", async () => {
    const onSelect = vi.fn();
    setup({ onSelect });
    await userEvent.click(screen.getByRole("button", { name: "Спутник" }));
    expect(onSelect).toHaveBeenCalledWith("sat");
  });

  it("вкладки идут компактным размером макета", () => {
    setup();
    expect(screen.getByRole("group", { name: "Тема" }).className).toContain(
      "rounded-(--dimension-corner-radius-8)",
    );
  });

  it("иконка рисуется только когда передана", () => {
    const { container, rerender } = setup();
    expect(container.querySelector("span.size-4")).toBeNull();
    rerender(
      <MenuTabs title="Тема" icon={<svg />} options={OPTIONS} activeId="map" onSelect={vi.fn()} />,
    );
    expect(container.querySelector("span.size-4")?.className).toContain(
      "text-(color:--icon-tertiary)",
    );
  });

  it("заголовок 12/16 весом 500 и обрезается многоточием", () => {
    setup();
    const className = screen.getByText("Тема").className;
    expect(className).toContain("text-xs");
    expect(className).toContain("leading-(--typography-line-height-16)");
    expect(className).toContain("[font-weight:var(--font-weight-medium)]");
    expect(className).toContain("truncate");
  });
});
