import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IconButton } from "./icon-button";
import { IconButtonGroup } from "./icon-button-group";

const zoom = (
  <IconButtonGroup label="Масштаб">
    <IconButton label="Приблизить">+</IconButton>
    <IconButton label="Отдалить">−</IconButton>
  </IconButtonGroup>
);

describe("IconButtonGroup", () => {
  it("подписан как группа и держит кнопки", () => {
    render(zoom);
    expect(screen.getByRole("group", { name: "Масштаб" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("радиус и тень на группе, у кнопок сняты", () => {
    render(zoom);
    const group = screen.getByRole("group", { name: "Масштаб" });
    expect(group.className).toContain("rounded-(--dimension-corner-radius-10)");
    expect(group.className).toContain("shadow-(--shadow-hud)");
    expect(group.className).toContain("[&>button]:rounded-none");
    expect(group.className).toContain("[&>button]:shadow-none");
    expect(group.className).toContain("[&>button:hover]:shadow-none");
  });

  it("does not clip the focus outline of its buttons and rounds the outer corners instead", () => {
    const { rerender } = render(zoom);
    let className = screen.getByRole("group", { name: "Масштаб" }).className;
    expect(className).not.toContain("overflow-hidden");
    expect(className).toContain("w-fit");
    expect(className).toContain("[&>button:first-child]:rounded-t-(--dimension-corner-radius-10)");
    expect(className).toContain("[&>button:last-child]:rounded-b-(--dimension-corner-radius-10)");
    expect(className).toContain("[&>button]:relative");
    expect(className).toContain("[&>button:focus-visible]:z-10");
    rerender(
      <IconButtonGroup label="Масштаб" direction="horizontal">
        <IconButton label="Приблизить">+</IconButton>
      </IconButtonGroup>,
    );
    className = screen.getByRole("group", { name: "Масштаб" }).className;
    expect(className).toContain("[&>button:first-child]:rounded-l-(--dimension-corner-radius-10)");
    expect(className).toContain("[&>button:last-child]:rounded-r-(--dimension-corner-radius-10)");
  });

  it("направление переключается", () => {
    const { rerender } = render(zoom);
    expect(screen.getByRole("group", { name: "Масштаб" }).className).toContain("flex-col");
    rerender(
      <IconButtonGroup label="Масштаб" direction="horizontal">
        <IconButton label="Приблизить">+</IconButton>
      </IconButtonGroup>,
    );
    expect(screen.getByRole("group", { name: "Масштаб" }).className).toContain("flex-row");
  });
});
