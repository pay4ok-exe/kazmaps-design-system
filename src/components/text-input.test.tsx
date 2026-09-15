import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TextInput } from "./text-input";

describe("TextInput", () => {
  it("связывает подпись с полем", () => {
    render(<TextInput label="Почта" value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Почта").tagName).toBe("INPUT");
  });

  it("ошибка не рисует подписи под полем", () => {
    const { container } = render(
      <TextInput label="Почта" value="abc" onChange={vi.fn()} invalid />,
    );
    expect(container.querySelector("p")).toBeNull();
    expect(screen.getByLabelText("Почта")).toHaveAttribute("aria-invalid", "true");
  });

  it("ошибка красит текст поля, а не только рамку", () => {
    const { container } = render(
      <TextInput label="Почта" value="abc" onChange={vi.fn()} invalid />,
    );
    expect(screen.getByLabelText("Почта").className).toContain("text-(color:--text-danger)");
    expect(container.firstElementChild?.querySelector("div")?.className).toContain(
      "inset-ring-(--border-error)",
    );
  });

  it("обводка внутренняя и проявляется на наведении и фокусе", () => {
    const { container } = render(<TextInput value="" onChange={vi.fn()} />);
    const shell = container.firstElementChild?.firstElementChild?.className ?? "";
    expect(shell).toContain("inset-ring-[length:var(--stroke-border-1)]");
    expect(shell).toContain("hover:inset-ring-(--border-secondary)");
    expect(shell).toContain("has-[input:focus]:inset-ring-(--border-focus)");
  });
});

describe("TextInput id and focus", () => {
  it("keeps the label linked when the caller passes its own id", () => {
    render(<TextInput id="mail" label="Почта" value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Почта")).toHaveAttribute("id", "mail");
  });

  it("an invalid field still shows a focus indicator", () => {
    const { container } = render(<TextInput value="" onChange={vi.fn()} invalid />);
    expect(container.firstElementChild?.firstElementChild?.className).toContain(
      "focus-ring-within",
    );
  });
});

describe("TextInput idle ring", () => {
  it("keeps the idle ring transparent instead of the text colour", () => {
    const { container } = render(<TextInput value="" onChange={vi.fn()} />);
    expect(container.firstElementChild?.firstElementChild?.className).toContain(
      "inset-ring-transparent",
    );
  });
});
