import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Menu, MenuDivider } from "./menu";
import { MenuItem } from "./menu-item";

describe("Menu", () => {
  it("повторяет карточку макета: радиус 10, фон и тень HUD, паддинг 8, зазор 4", () => {
    const { container } = render(
      <Menu label="Профиль">
        <MenuItem icon={<svg />} label="Настройки" />
      </Menu>,
    );
    const className = container.firstElementChild?.className ?? "";
    expect(className).toContain("rounded-(--dimension-corner-radius-10)");
    expect(className).toContain("bg-(--background-primary)");
    expect(className).toContain("shadow-(--shadow-hud)");
    expect(className).toContain("p-(--spacing-padding-8)");
    expect(className).toContain("gap-(--spacing-gap-4)");
  });

  it("подписан для скринридера", () => {
    render(
      <Menu label="Профиль">
        <MenuItem icon={<svg />} label="Настройки" />
      </Menu>,
    );
    expect(screen.getByLabelText("Профиль")).toBeInTheDocument();
  });

  it("разделитель — восемь в высоту с линией по центру", () => {
    const { container } = render(<MenuDivider />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("role", "separator");
    expect(root?.className).toContain("h-2");
    expect(root?.firstElementChild?.className).toContain("bg-(--background-tertiary)");
    expect(root?.firstElementChild?.className).toContain("h-px");
  });
});
