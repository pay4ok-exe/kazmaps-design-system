import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";

import { Input } from "./input";

describe("Input", () => {
  it("wires label to input", () => {
    render(<Input label="Телефон" />);
    expect(screen.getByLabelText("Телефон")).toBeInTheDocument();
  });
  it("shows error text", () => {
    render(<Input label="Email" error="Неверный формат" />);
    expect(screen.getByText("Неверный формат")).toBeInTheDocument();
  });
  it("reveals password when revealable", async () => {
    render(<Input label="Пароль" type="password" revealable />);
    const input = screen.getByLabelText("Пароль");
    expect(input).toHaveAttribute("type", "password");
    await userEvent.click(screen.getByRole("button"));
    expect(input).toHaveAttribute("type", "text");
  });
  it("reveal button is keyboard reachable and toggles visibility", async () => {
    const user = userEvent.setup();
    render(<Input label="Пароль" type="password" revealable />);
    const input = screen.getByLabelText("Пароль");
    await user.tab();
    expect(input).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Показать пароль" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Скрыть пароль" })).toBeInTheDocument();
  });
  it("reveal button labels are overridable", async () => {
    const user = userEvent.setup();
    render(
      <Input
        label="Password"
        type="password"
        revealable
        revealLabel="Show password"
        hideLabel="Hide password"
      />,
    );
    const button = screen.getByRole("button", { name: "Show password" });
    await user.click(button);
    expect(screen.getByRole("button", { name: "Hide password" })).toBeInTheDocument();
  });

  it("forwards the ref to the single input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input label="Название" ref={ref} />);
    expect(ref.current).toBe(screen.getByLabelText("Название"));
  });

  it("keeps the bin mask digits-only and capped at 12", async () => {
    const onChange = vi.fn();
    render(<Input label="БИН" mask="bin" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("БИН"), "12ab34567890123");
    expect(screen.getByLabelText<HTMLInputElement>("БИН").value).toBe("123456789012");
  });
});
