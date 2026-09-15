import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MapCompass } from "./map-compass";
import { ProfileButton } from "./profile-button";
import { PROFILE_BUTTON_STATE } from "./profile-button.states";

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

describe("ProfileButton", () => {
  it("со снимком берёт паддинг 2, без снимка — 8", () => {
    const { rerender } = render(<ProfileButton label="Профиль" icon={<span />} />);
    expect(screen.getByRole("button", { name: "Профиль" }).className).toContain(
      "p-(--spacing-padding-8)",
    );
    rerender(<ProfileButton label="Профиль" photoUrl="/a.png" />);
    expect(screen.getByRole("button", { name: "Профиль" }).className).toContain(
      "p-(--spacing-padding-2)",
    );
  });

  it("кольцо появляется только на активном снимке", () => {
    const { container, rerender } = render(<ProfileButton label="Профиль" photoUrl="/a.png" />);
    expect(container.querySelector("img")?.className).not.toContain("ring-(--icon-accent)");
    rerender(<ProfileButton label="Профиль" photoUrl="/a.png" active />);
    expect(container.querySelector("img")?.className).toContain("ring-(--icon-accent)");
  });

  it("витрина состояний берёт те же роли, что и компонент", () => {
    const { rerender } = render(<ProfileButton label="Профиль" icon={<span />} />);
    expect(screen.getByRole("button", { name: "Профиль" }).className).toContain(
      PROFILE_BUTTON_STATE.idle,
    );
    rerender(<ProfileButton label="Профиль" icon={<span />} active />);
    expect(screen.getByRole("button", { name: "Профиль" }).className).toContain(
      PROFILE_BUTTON_STATE.active,
    );
  });

  it("глиф светлеет на наведении и уходит в акцент при active", () => {
    const { rerender } = render(<ProfileButton label="Профиль" icon={<span />} />);
    let className = screen.getByRole("button", { name: "Профиль" }).className;
    expect(className).toContain("text-(color:--icon-primary)");
    expect(className).toContain("hover:text-(color:--icon-tertiary)");

    rerender(<ProfileButton label="Профиль" icon={<span />} active />);
    className = screen.getByRole("button", { name: "Профиль" }).className;
    expect(className).toContain("text-(color:--icon-accent)");
    expect(screen.getByRole("button", { name: "Профиль" })).toHaveAttribute("aria-pressed", "true");
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

describe("ProfileButton pressed state", () => {
  it("announces a pressed state only when active is passed", () => {
    const { rerender } = render(<ProfileButton label="Профиль" icon={<span />} />);
    expect(screen.getByRole("button", { name: "Профиль" })).not.toHaveAttribute("aria-pressed");
    rerender(<ProfileButton label="Профиль" icon={<span />} active={false} />);
    expect(screen.getByRole("button", { name: "Профиль" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
