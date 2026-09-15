import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MapCompass } from "./map-compass";
import { Avatar } from "./avatar";
import { AVATAR_STATE } from "./avatar.states";

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

describe("Avatar", () => {
  it("со снимком берёт паддинг 2, без снимка — 8", () => {
    const { rerender } = render(<Avatar label="Профиль" icon={<span />} />);
    expect(screen.getByRole("button", { name: "Профиль" }).className).toContain(
      "p-(--spacing-padding-8)",
    );
    rerender(<Avatar label="Профиль" photoUrl="/a.png" />);
    expect(screen.getByRole("button", { name: "Профиль" }).className).toContain(
      "p-(--spacing-padding-2)",
    );
  });

  it("кольцо появляется только на активном снимке", () => {
    const { container, rerender } = render(<Avatar label="Профиль" photoUrl="/a.png" />);
    expect(container.querySelector("img")?.className).not.toContain("ring-(--icon-accent)");
    rerender(<Avatar label="Профиль" photoUrl="/a.png" active />);
    expect(container.querySelector("img")?.className).toContain("ring-(--icon-accent)");
  });

  it("витрина состояний берёт те же роли, что и компонент", () => {
    const { rerender } = render(<Avatar label="Профиль" icon={<span />} />);
    expect(screen.getByRole("button", { name: "Профиль" }).className).toContain(AVATAR_STATE.idle);
    rerender(<Avatar label="Профиль" icon={<span />} active />);
    expect(screen.getByRole("button", { name: "Профиль" }).className).toContain(
      AVATAR_STATE.active,
    );
  });

  it("глиф светлеет на наведении и уходит в акцент при active", () => {
    const { rerender } = render(<Avatar label="Профиль" icon={<span />} />);
    let className = screen.getByRole("button", { name: "Профиль" }).className;
    expect(className).toContain("text-(color:--icon-primary)");
    expect(className).toContain("hover:text-(color:--icon-tertiary)");

    rerender(<Avatar label="Профиль" icon={<span />} active />);
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

describe("Avatar pressed state", () => {
  it("announces a pressed state only when active is passed", () => {
    const { rerender } = render(<Avatar label="Профиль" icon={<span />} />);
    expect(screen.getByRole("button", { name: "Профиль" })).not.toHaveAttribute("aria-pressed");
    rerender(<Avatar label="Профиль" icon={<span />} active={false} />);
    expect(screen.getByRole("button", { name: "Профиль" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});

describe("Avatar: запасной вариант с именем", () => {
  it("без снимка показывает первую букву имени", () => {
    render(<Avatar label="Профиль" name="айгерим" />);
    expect(screen.getByText("А")).toBeInTheDocument();
  });

  /* Цвет выводится из seed, а не из имени: у тёзок аватары должны различаться,
     а у одного человека — не прыгать при смене отображаемого имени. */
  it("цвет берётся из seed и устойчив", () => {
    const { container, rerender } = render(<Avatar label="Профиль" name="Аскар" seed="id-1" />);
    const first = container.querySelector("span[aria-hidden]")?.className;
    rerender(<Avatar label="Профиль" name="Аскар Иванов" seed="id-1" />);
    expect(container.querySelector("span[aria-hidden]")?.className).toBe(first);
    expect(first).toMatch(/bg-\(--tag-/);
  });

  it("снимок важнее имени, а глиф — только когда нет ни того ни другого", () => {
    const { container, rerender } = render(
      <Avatar label="Профиль" name="Аскар" photoUrl="/a.png" />,
    );
    expect(container.querySelector("img")).not.toBeNull();
    rerender(<Avatar label="Профиль" icon={<span data-testid="glyph" />} />);
    expect(screen.getByTestId("glyph")).toBeInTheDocument();
  });
});
