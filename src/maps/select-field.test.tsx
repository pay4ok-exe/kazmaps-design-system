import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SelectField } from "./select-field";

const OPTIONS = [
  { value: "almaty", label: "Алматы" },
  { value: "astana", label: "Астана" },
];

describe("SelectField", () => {
  it("рендерит варианты и отдаёт выбранное значение", async () => {
    const onChange = vi.fn();
    render(<SelectField value="almaty" onChange={onChange} options={OPTIONS} label="Город" />);
    const select = screen.getByLabelText("Город");
    expect(select).toHaveValue("almaty");
    await userEvent.selectOptions(select, "astana");
    expect(onChange).toHaveBeenCalledWith("astana");
  });

  it("связывает подпись с полем", () => {
    render(<SelectField value="almaty" onChange={vi.fn()} options={OPTIONS} label="Город" />);
    expect(screen.getByLabelText("Город").tagName).toBe("SELECT");
  });

  /* Stroke в макете меняет не наличие рамки, а её заметность в покое: при
     Stroke=False рамка прозрачна и проявляется на наведении. Прозрачная, а не
     отсутствующая — иначе текст сдвинется на пиксель в момент наведения. */
  it("bordered=false держит рамку прозрачной и проявляет её на наведении", () => {
    const { container } = render(
      <SelectField value="almaty" onChange={vi.fn()} options={OPTIONS} />,
    );
    const className = container.querySelector("select")?.className ?? "";
    expect(className).toContain("border-transparent");
    expect(className).toContain("hover:border-(--border-secondary)");
  });

  it("bordered=true показывает рамку сразу и темнит её на наведении", () => {
    const { container } = render(
      <SelectField value="almaty" onChange={vi.fn()} options={OPTIONS} bordered />,
    );
    const className = container.querySelector("select")?.className ?? "";
    expect(className).toContain("border-(--border-secondary)");
    expect(className).toContain("hover:border-(--border-primary)");
    expect(className).not.toContain("border-transparent");
  });

  it("на фокусе меняет рамку, текст и цвет шеврона", () => {
    const { container } = render(
      <SelectField value="almaty" onChange={vi.fn()} options={OPTIONS} />,
    );
    const select = container.querySelector("select")?.className ?? "";
    expect(select).toContain("focus:border-(--border-focus)");
    expect(select).toContain("focus:text-(color:--text-primary)");

    const chevron = container.querySelector("svg")?.getAttribute("class") ?? "";
    expect(chevron).toContain("peer-focus:text-(color:--icon-accent)");
  });

  it("шеврон скрыт от скринридера и не перехватывает клик", () => {
    const { container } = render(
      <SelectField value="almaty" onChange={vi.fn()} options={OPTIONS} />,
    );
    const chevron = container.querySelector("svg");
    expect(chevron).toHaveAttribute("aria-hidden", "true");
    expect(chevron?.getAttribute("class")).toContain("pointer-events-none");
  });
});
