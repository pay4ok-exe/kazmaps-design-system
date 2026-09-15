import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MapCompass } from "./map-compass";

const dial = (c: HTMLElement) => c.querySelector("svg");

describe("MapCompass", () => {
  it("подписан и кликается", async () => {
    const onClick = vi.fn();
    render(<MapCompass label="Север" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Север" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("циферблат поворачивается против азимута", () => {
    const { container, rerender } = render(<MapCompass label="Север" />);
    expect(dial(container)).toHaveStyle({ rotate: "0deg" });
    rerender(<MapCompass label="Север" heading={90} />);
    expect(dial(container)).toHaveStyle({ rotate: "-90deg" });
  });

  it("aligned подсвечивает букву акцентом", () => {
    const { rerender } = render(<MapCompass label="Север" />);
    expect(screen.getByRole("button", { name: "Север" }).className).toContain(
      "text-(color:--icon-secondary)",
    );
    rerender(<MapCompass label="Север" aligned />);
    expect(screen.getByRole("button", { name: "Север" }).className).toContain(
      "text-(color:--icon-accent)",
    );
  });

  it("держит размер и паддинг макета", () => {
    render(<MapCompass label="Север" />);
    const className = screen.getByRole("button", { name: "Север" }).className;
    expect(className).toContain("size-[40px]");
    expect(className).toContain("p-(--spacing-padding-12)");
  });
});

describe("MapCompass rotation", () => {
  it("crosses north by the short way instead of spinning a full turn", () => {
    const { container, rerender } = render(<MapCompass label="Север" heading={358} />);
    expect(dial(container)).toHaveStyle({ rotate: "-358deg" });
    rerender(<MapCompass label="Север" heading={2} />);
    expect(dial(container)).toHaveStyle({ rotate: "-362deg" });
  });

  it("keeps the glyph shadow outside the rotating layer", () => {
    const { container } = render(<MapCompass label="Север" heading={180} />);
    expect(dial(container)?.style.filter).toBe("");
    expect(dial(container)?.parentElement?.style.filter).toContain("drop-shadow");
  });
});
