import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SegmentedRow } from "./segmented-row";

const ITEMS = [
  { id: "map", label: "Карта", icon: <span data-testid="i-map" /> },
  { id: "layers", label: "Слои", icon: <span data-testid="i-layers" /> },
];

const chipOf = (name: string) =>
  screen.getByRole("button", { name }).querySelector("span")?.className ?? "";

describe("SegmentedRow", () => {
  it("сообщает выбранный пункт и зовёт onSelect", async () => {
    const onSelect = vi.fn();
    render(<SegmentedRow items={ITEMS} activeId="map" onSelect={onSelect} label="Слои" />);
    expect(screen.getByRole("button", { name: "Карта" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Слои" }));
    expect(onSelect).toHaveBeenCalledWith("layers");
  });

  it("акцентом заливается чип, а не кнопка", () => {
    render(<SegmentedRow items={ITEMS} activeId="map" onSelect={vi.fn()} label="Слои" />);
    expect(chipOf("Карта")).toContain("bg-(--action-accent-primary)");
    expect(chipOf("Карта")).toContain("text-(color:--icon-white)");
    expect(screen.getByRole("button", { name: "Карта" }).className).not.toContain(
      "bg-(--action-accent-primary)",
    );
  });

  it("невыбранный чип светится акцентом только на наведении", () => {
    render(<SegmentedRow items={ITEMS} activeId="map" onSelect={vi.fn()} label="Слои" />);
    expect(chipOf("Слои")).toContain("bg-(--background-secondary)");
    expect(chipOf("Слои")).toContain("text-(color:--icon-secondary)");
    expect(chipOf("Слои")).toContain("group-hover:text-(color:--icon-accent)");
  });

  it("выбранная подпись тяжелее невыбранной", () => {
    render(<SegmentedRow items={ITEMS} activeId="map" onSelect={vi.fn()} label="Слои" />);
    expect(screen.getByRole("button", { name: "Карта" }).className).toContain(
      "[font-weight:var(--font-weight-strong)]",
    );
    expect(screen.getByRole("button", { name: "Слои" }).className).toContain(
      "[font-weight:var(--font-weight-book)]",
    );
  });
});
