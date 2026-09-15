import { render } from "@testing-library/react";

import { flagEmoji, RegionFlag } from "./region-flag";

describe("RegionFlag", () => {
  it("builds the flag from regional indicator symbols", () => {
    expect(flagEmoji("KZ")).toBe("🇰🇿");
    expect(flagEmoji("us")).toBe("🇺🇸");
  });

  it("renders the emoji as decorative text for any region", () => {
    const { container } = render(<RegionFlag iso="GE" />);
    const el = container.firstElementChild;
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).toHaveTextContent("🇬🇪");
    expect(container.querySelector("svg")).toBeNull();
  });

  it("puts the flag font first so Windows can be polyfilled", () => {
    const { container } = render(<RegionFlag iso="KZ" size={16} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.fontFamily).toContain("Twemoji Country Flags");
    expect(el.style.fontSize).toBe("16px");
  });
});
