import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MapCompass } from "./map-compass";
import { ProfileButton } from "./profile-button";

const dial = (c: HTMLElement) => c.querySelector("svg");

describe("MapCompass", () => {
  it("подписан и кликается", async () => {
    const onClick = vi.fn();
    render(<MapCompass label="Север" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Север" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  /* Циферблат крутится ПРОТИВ азимута: карта повёрнута на 90°, значит север
     уехал влево, и стрелка должна уехать туда же. Знак здесь легко потерять. */
  it("циферблат поворачивается против азимута", () => {
    const { container, rerender } = render(<MapCompass label="Север" />);
    expect(dial(container)).toHaveStyle({ rotate: "0deg" });
    rerender(<MapCompass label="Север" heading={90} />);
    expect(dial(container)).toHaveStyle({ rotate: "-90deg" });
  });

  /* Состояния меняют только цвет буквы N — циферблат во всех трёх одинаков. */
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

  // 40 с паддингом 12, а не 36/6 как у IconButton — иначе буква N не встанет.
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

  // Кольцо есть только у снимка и только в active — это вариант Image=True.
  it("кольцо появляется только на активном снимке", () => {
    const { container, rerender } = render(<ProfileButton label="Профиль" photoUrl="/a.png" />);
    expect(container.querySelector("img")?.className).not.toContain("border-(--icon-accent)");
    rerender(<ProfileButton label="Профиль" photoUrl="/a.png" active />);
    expect(container.querySelector("img")?.className).toContain("border-(--icon-accent)");
  });

  /* На наведении глиф СВЕТЛЕЕТ — так в макете, как и у Map Action типа
     Default. Выглядит недосмотром, но это замер (пункт 13 в figma-deltas). */
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
