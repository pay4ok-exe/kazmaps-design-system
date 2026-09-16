import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MapCompass } from "./map-compass";

const dial = (c: HTMLElement) => c.querySelector("svg");
const letter = (c: HTMLElement) => c.querySelector("svg svg");

describe("MapCompass", () => {
  it("подписан и кликается", async () => {
    const onClick = vi.fn();
    render(<MapCompass label="Север" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Север" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("циферблат поворачивается против азимута", () => {
    const { container, rerender } = render(<MapCompass label="Север" heading={0} />);
    expect(dial(container)).toHaveStyle({ rotate: "0deg" });
    rerender(<MapCompass label="Север" heading={90} />);
    expect(dial(container)).toHaveStyle({ rotate: "-90deg" });
  });

  it("буква лежит в том же svg, которому задан поворот: отдельного неподвижного слоя у неё нет", () => {
    const { container } = render(<MapCompass label="Север" heading={90} />);
    expect(letter(container)?.closest("svg[style]")).toBe(dial(container));
  });

  it("буква стоит в центре по паддингу макета", () => {
    const { container } = render(<MapCompass label="Север" />);
    const n = letter(container);
    expect(n?.getAttribute("x")).toBe("12");
    expect(n?.getAttribute("y")).toBe("12");
    expect(n?.getAttribute("width")).toBe("16");
  });

  it("aligned подсвечивает букву акцентом", () => {
    const { rerender } = render(<MapCompass label="Север" heading={35} />);
    expect(screen.getByRole("button", { name: "Север" }).className).toContain(
      "text-(color:--icon-secondary)",
    );
    rerender(<MapCompass label="Север" heading={35} aligned />);
    expect(screen.getByRole("button", { name: "Север" }).className).toContain(
      "text-(color:--icon-accent)",
    );
  });

  it("без явного aligned состояние выводится из азимута", () => {
    const { rerender } = render(<MapCompass label="Север" heading={0} />);
    expect(screen.getByRole("button", { name: "Север" }).className).toContain(
      "text-(color:--icon-accent)",
    );
    rerender(<MapCompass label="Север" heading={360} />);
    expect(screen.getByRole("button", { name: "Север" }).className).toContain(
      "text-(color:--icon-accent)",
    );
    rerender(<MapCompass label="Север" heading={35} />);
    expect(screen.getByRole("button", { name: "Север" }).className).toContain(
      "text-(color:--icon-secondary)",
    );
  });

  it("держит размер макета", () => {
    render(<MapCompass label="Север" />);
    expect(screen.getByRole("button", { name: "Север" }).className).toContain("size-[40px]");
  });
});

describe("MapCompass без внешнего состояния", () => {
  it("клик возвращает компас на север сам", async () => {
    const { container } = render(<MapCompass label="Север" defaultHeading={90} />);
    expect(dial(container)).toHaveStyle({ rotate: "-90deg" });
    await userEvent.click(screen.getByRole("button", { name: "Север" }));
    expect(dial(container)).toHaveStyle({ rotate: "0deg" });
    expect(screen.getByRole("button", { name: "Север" }).className).toContain(
      "text-(color:--icon-accent)",
    );
  });

  it("под внешним heading клик компас не крутит — решает приложение", async () => {
    const onClick = vi.fn();
    const { container } = render(<MapCompass label="Север" heading={90} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Север" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(dial(container)).toHaveStyle({ rotate: "-90deg" });
  });
});

describe("MapCompass rotation", () => {
  it("crosses north by the short way instead of spinning a full turn", () => {
    const { container, rerender } = render(<MapCompass label="Север" heading={358} />);
    expect(dial(container)).toHaveStyle({ rotate: "-358deg" });
    rerender(<MapCompass label="Север" heading={2} />);
    expect(dial(container)).toHaveStyle({ rotate: "-362deg" });
  });

  it("тень лежит на шкале, а не на букве — так в макете", () => {
    const { container } = render(<MapCompass label="Север" heading={180} />);
    expect(dial(container)?.style.filter).toBe("");
    expect(container.querySelector("svg > g")?.getAttribute("style")).toContain("drop-shadow");
    expect(letter(container)?.getAttribute("style")).toBeNull();
  });
});
