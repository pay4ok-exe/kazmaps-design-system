import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SelectField } from "./select-field";

const OPTIONS = [
  { value: "almaty", label: "Алматы" },
  { value: "astana", label: "Астана" },
  { value: "shymkent", label: "Шымкент" },
];

const setup = (props: Partial<Parameters<typeof SelectField>[0]> = {}) =>
  render(
    <SelectField label="Город" value="almaty" onChange={vi.fn()} options={OPTIONS} {...props} />,
  );

const trigger = () => screen.getByRole("combobox", { name: /Город/ });

describe("SelectField", () => {
  it("нативного select больше нет — это кнопка со списком", () => {
    const { container } = setup();
    expect(container.querySelector("select")).toBeNull();
    expect(trigger()).toHaveAttribute("aria-haspopup", "listbox");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("показывает подпись выбранного", () => {
    setup();
    expect(trigger()).toHaveTextContent("Алматы");
  });

  it("открывается кликом и отдаёт выбор", async () => {
    const onChange = vi.fn();
    setup({ onChange });
    await userEvent.click(trigger());
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(screen.getByRole("option", { name: /Астана/ }));
    expect(onChange).toHaveBeenCalledWith("astana");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("выбранный пункт помечен для скринридера", async () => {
    setup();
    await userEvent.click(trigger());
    expect(screen.getByRole("option", { name: /Алматы/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("option", { name: /Астана/ })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("стрелка открывает список и ведёт по нему, Enter выбирает", async () => {
    const onChange = vi.fn();
    setup({ onChange });
    trigger().focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("astana");
  });

  it("End ведёт в конец списка, Home — в начало", async () => {
    const onChange = vi.fn();
    setup({ onChange });
    trigger().focus();
    await userEvent.keyboard("{ArrowDown}{End}{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("shymkent");
  });

  it("Escape закрывает и оставляет выбор прежним", async () => {
    const onChange = vi.fn();
    setup({ onChange });
    trigger().focus();
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Escape}");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("активный пункт назван через aria-activedescendant", async () => {
    setup();
    await userEvent.click(trigger());
    const activeId = trigger().getAttribute("aria-activedescendant");
    expect(activeId).not.toBeNull();
    expect(document.getElementById(activeId ?? "")).toHaveAttribute("role", "option");
  });

  it("закрытое поле повторяет макет: 28, радиус 6, текст 12/16", () => {
    setup();
    const className = trigger().className;
    expect(className).toContain("h-(--dimension-height-28)");
    expect(className).toContain("rounded-(--dimension-corner-radius-6)");
    expect(within(trigger()).getByText("Алматы").className).toContain("text-xs");
  });

  it("обводка следует варианту Stroke макета", () => {
    const { rerender } = setup();
    expect(trigger().className).toContain("inset-ring-transparent");
    rerender(
      <SelectField label="Город" value="almaty" onChange={vi.fn()} options={OPTIONS} bordered />,
    );
    expect(trigger().className).toContain("inset-ring-(--border-secondary)");
  });

  it("выключенное поле не открывается", async () => {
    setup({ disabled: true });
    expect(trigger()).toBeDisabled();
    await userEvent.click(trigger());
    expect(screen.queryByRole("listbox")).toBeNull();
  });
});
