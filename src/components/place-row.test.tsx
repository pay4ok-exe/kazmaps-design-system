import { render, screen } from "@testing-library/react";

import { PlaceRow } from "./place-row";

describe("PlaceRow idle ring", () => {
  it("keeps the idle ring transparent instead of the text colour", () => {
    render(<PlaceRow name="Кофейня" />);
    expect(screen.getByRole("button").className).toContain("inset-ring-transparent");
  });
});
