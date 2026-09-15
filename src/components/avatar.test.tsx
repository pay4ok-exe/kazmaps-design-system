import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "./avatar";
import { AVATAR_STATE } from "./avatar.states";

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

describe("Avatar photo fallback", () => {
  it("tries a new photo url after the previous one failed", () => {
    const { container, rerender } = render(
      <Avatar label="Профиль" name="Аня" photoUrl="/broken.png" />,
    );
    fireEvent.error(container.querySelector("img")!);
    expect(container.querySelector("img")).toBeNull();
    rerender(<Avatar label="Профиль" name="Аня" photoUrl="/fresh.png" />);
    expect(container.querySelector("img")).toHaveAttribute("src", "/fresh.png");
  });
});

describe("Avatar initial ink", () => {
  it("draws the initial in fixed dark ink so it stays readable on tag fills in both themes", () => {
    render(<Avatar label="Профиль" name="Аня" />);
    const initial = screen.getByText("А");
    expect(initial.className).toContain("text-[#0f1214]");
    expect(initial.className).not.toContain("text-(color:--text-primary)");
  });
});
