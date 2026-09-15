import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CollapseHandle } from "./collapse-handle";
import { Dialog } from "./dialog";
import { ForecastCard } from "./forecast-card";
import { IconButton } from "./icon-button";
import { LegalLink } from "./legal-link";
import { MapTrafficBadge } from "./map-traffic-badge";
import { WeatherBadge } from "./weather-badge";

describe("IconButton", () => {
  it("несёт тень HUD и усиливает её на наведении", () => {
    render(<IconButton label="Приблизить">+</IconButton>);
    const className = screen.getByRole("button", { name: "Приблизить" }).className;
    expect(className).toContain("shadow-(--shadow-hud)");
    expect(className).toContain("hover:shadow-(--shadow-hud-hover)");
  });

  it("состояния красят иконку тремя ролями макета", () => {
    const { rerender } = render(<IconButton label="Я">+</IconButton>);
    let className = screen.getByRole("button", { name: "Я" }).className;
    expect(className).toContain("text-(color:--icon-tertiary)");
    expect(className).toContain("hover:text-(color:--icon-primary)");

    rerender(
      <IconButton label="Я" active>
        +
      </IconButton>,
    );
    className = screen.getByRole("button", { name: "Я" }).className;
    expect(className).toContain("text-(color:--icon-accent)");
  });

  it("без уровня заливки нет, а обводка и цифра уходят в icon/secondary", () => {
    render(<MapTrafficBadge level={null} value={3} label="Пробки" />);
    const ring = screen.getByText("3").className;
    expect(ring).toContain("outline-(--icon-secondary)");
    expect(ring).not.toMatch(/bg-\(--traffic/);
    expect(screen.getByRole("button", { name: "Пробки" })).toHaveAttribute("aria-pressed", "false");
  });
});

describe("WeatherBadge", () => {
  it("градус и знак градуса красятся по-разному", () => {
    render(<WeatherBadge icon={<span />} temperature="18" aria-label="Погода" />);
    expect(screen.getByText("18").className).toContain("text-(color:--text-secondary)");
    expect(screen.getByText("°").className).toContain("text-(color:--text-tertiary)");
  });

  it("берёт тень со смещением 2, а не общую HUD", () => {
    const { container } = render(<WeatherBadge icon={<span />} temperature="18" />);
    expect(container.firstElementChild?.className).toContain("shadow-(--shadow-hud-badge)");
  });
});

describe("ForecastCard", () => {
  it("текущий утяжеляет заголовок и поднимает контраст осадков", () => {
    const { rerender } = render(
      <ForecastCard title="14:00" icon={<span />} temperature="+20°" precipitation="0%" current />,
    );
    expect(screen.getByText("14:00").className).toContain(
      "[font-weight:var(--font-weight-medium)]",
    );
    expect(screen.getByText("0%").className).toContain("text-(color:--text-secondary)");

    rerender(<ForecastCard title="15:00" icon={<span />} temperature="+20°" precipitation="0%" />);
    expect(screen.getByText("15:00").className).toContain(
      "[font-weight:var(--font-weight-regular)]",
    );
    expect(screen.getByText("0%").className).toContain("text-(color:--text-tertiary)");
  });

  it("строка дня появляется только в недельном виде", () => {
    const { rerender } = render(
      <ForecastCard title="Пн" icon={<span />} temperature="+20°" precipitation="0%" />,
    );
    expect(screen.queryByText("понедельник")).toBeNull();
    rerender(
      <ForecastCard
        title="Пн"
        day="понедельник"
        icon={<span />}
        temperature="+20°"
        precipitation="0%"
      />,
    );
    expect(screen.getByText("понедельник")).toBeInTheDocument();
  });
});

describe("CollapseHandle", () => {
  it("несёт боковую тень и сообщает состояние панели", () => {
    render(
      <CollapseHandle label="Свернуть" open>
        ‹
      </CollapseHandle>,
    );
    const button = screen.getByRole("button", { name: "Свернуть" });
    expect(button.className).toContain("shadow-(--shadow-hud-side)");
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("закрытая полоска меняет поверхность и получает обводку", () => {
    render(<CollapseHandle label="Развернуть">›</CollapseHandle>);
    const className = screen.getByRole("button", { name: "Развернуть" }).className;
    expect(className).toContain("bg-(--background-secondary)");
    expect(className).toContain("inset-ring-(--background-primary)");
  });
});

describe("LegalLink", () => {
  it("в покое text/primary, на наведении text/link, тени нет", () => {
    render(<LegalLink href="/legal">Условия</LegalLink>);
    const className = screen.getByRole("link", { name: "Условия" }).className;
    expect(className).toContain("text-(color:--text-primary)");
    expect(className).toContain("hover:text-(color:--text-link)");
    expect(className).not.toContain("shadow-");
  });
});

describe("Dialog close", () => {
  it("без тени, hover и press делят заливку и различаются глифом", () => {
    render(
      <Dialog title="Заголовок" onClose={() => undefined}>
        тело
      </Dialog>,
    );
    const className = screen.getByRole("button", { name: "Закрыть" }).className;
    expect(className).toContain("bg-(--background-secondary)");
    expect(className).toContain("hover:bg-(--background-tertiary)");
    expect(className).toContain("active:bg-(--background-tertiary)");
    expect(className).toContain("hover:text-(color:--icon-primary)");
    expect(className).toContain("active:text-(color:--icon-tertiary)");
    expect(className).not.toContain("shadow-");
  });
});

describe("IconButton pressed state", () => {
  it("is a plain action unless active is passed", () => {
    const { rerender } = render(<IconButton label="Приблизить">+</IconButton>);
    expect(screen.getByRole("button", { name: "Приблизить" })).not.toHaveAttribute("aria-pressed");
    rerender(
      <IconButton label="Приблизить" active={false}>
        +
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "Приблизить" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
