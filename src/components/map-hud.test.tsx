import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Dialog } from "./dialog";
import { ForecastCard } from "./forecast-card";
import { IconButton } from "./icon-button";
import { ICON_BUTTON_STATE } from "./icon-button.states";
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

  it("витрина состояний берёт те же роли, что и компонент", () => {
    const { rerender } = render(<IconButton label="Я">+</IconButton>);
    let className = screen.getByRole("button", { name: "Я" }).className;
    expect(className).toContain(ICON_BUTTON_STATE.idle);

    rerender(
      <IconButton label="Я" active>
        +
      </IconButton>,
    );
    className = screen.getByRole("button", { name: "Я" }).className;
    expect(className).toContain(ICON_BUTTON_STATE.active);
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
});

describe("MapTrafficBadge", () => {
  it("уровень красит заливку, обводку и цифру из группы traffic", () => {
    render(<MapTrafficBadge level="red" value={7} label="Пробки" />);
    const ring = screen.getByText("7").className;
    expect(ring).toContain("bg-(--traffic-fill-red)");
    expect(ring).toContain("outline-(--traffic-border-red)");
    expect(ring).toContain("text-(color:--traffic-text-red)");
    expect(ring).toContain("outline-[length:var(--stroke-border-1_5)]");
    expect(ring).toContain("-outline-offset-[0.75px]");
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
  it("строки занимают всю ширину карточки, а карточка обрезает содержимое", () => {
    const { container } = render(
      <ForecastCard
        title="Пн"
        day="19 сент."
        icon={<span />}
        temperature="+20°"
        precipitation="10%"
      />,
    );
    expect(container.firstElementChild?.className).toContain("overflow-hidden");
    for (const text of ["Пн", "19 сент.", "+20°", "10%"]) {
      expect(screen.getByText(text).className, text).toContain("w-full");
    }
  });

  it("многоточие только у заголовка и дня — у погоды обрезка в макете выключена", () => {
    render(
      <ForecastCard
        title="Пн"
        day="19 сент."
        icon={<span />}
        temperature="+20°"
        precipitation="10%"
      />,
    );
    expect(screen.getByText("Пн").className).toContain("truncate");
    expect(screen.getByText("19 сент.").className).toContain("truncate");
    expect(screen.getByText("+20°").className).not.toContain("truncate");
    expect(screen.getByText("10%").className).not.toContain("truncate");
  });

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
    expect(screen.queryByText("19 сент.")).toBeNull();
    rerender(
      <ForecastCard
        title="Пн"
        day="19 сент."
        icon={<span />}
        temperature="+20°"
        precipitation="0%"
      />,
    );
    expect(screen.getByText("19 сент.")).toBeInTheDocument();
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
