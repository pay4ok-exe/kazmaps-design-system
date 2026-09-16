import { readFileSync } from "node:fs";
import { join } from "node:path";

import { expect, test, type Page } from "@playwright/test";

const THEMES = ["light", "dark"] as const;
const BRANDS = ["maps", "business", "booking"] as const;
const BRAND_SLICE = new Set([
  "components-button--all-variants",
  "components-placerow--all-variants",
  "components-textinput--all-variants",
  "components-phoneinput--all-variants",
  "components-iconbuttongroup--all-variants",
]);
const INTERACTIVE = /--(playground|live)$/;

type IndexEntry = { id: string; type: string };
const index = JSON.parse(
  readFileSync(join(process.cwd(), "storybook-static", "index.json"), "utf8"),
) as { entries: Record<string, IndexEntry> };

const STORIES = Object.values(index.entries)
  .filter((e) => e.type === "story" && /^(components|icons)/.test(e.id) && !INTERACTIVE.test(e.id))
  .map((e) => e.id);

for (const id of STORIES) {
  for (const brand of BRANDS) {
    if (brand !== "maps" && !BRAND_SLICE.has(id)) continue;
    for (const theme of THEMES) {
      test(`${id} — ${brand} ${theme}`, async ({ page }) => {
        if (id === "components-bottomsheet--all-variants") {
          await page.setViewportSize({ width: 390, height: 700 });
        }
        await page.goto(
          `/iframe.html?viewMode=story&id=${id}&globals=brand:${brand};theme:${theme}`,
        );
        if (id === "components-dialog--all-variants") {
          await expect(page.getByRole("dialog").first()).toBeVisible();
        } else {
          await expect(page.locator("#storybook-root > *").first()).toBeVisible();
        }
        if (id === "components-toast--all-variants") {
          await page.getByRole("status").waitFor();
        }
        await expect(page).toHaveScreenshot(`${brand}-${id.replace("--", "-")}-${theme}.png`, {
          fullPage: true,
        });
      });
    }
  }
}

for (const brand of BRANDS) {
  for (const theme of THEMES) {
    test(`phone-input-picker — ${brand} ${theme}`, async ({ page }) => {
      await page.goto(
        `/iframe.html?viewMode=story&id=components-phoneinput--playground&globals=brand:${brand};theme:${theme}`,
      );
      await expect(page.getByLabel("Номер телефона")).toBeVisible();
      await page.getByRole("button", { name: /Регион/ }).click();
      await expect(page.getByRole("listbox")).toBeVisible();
      const name =
        brand === "maps"
          ? `phone-input-picker-${theme}.png`
          : `${brand}-phone-input-picker-${theme}.png`;
      await expect(page).toHaveScreenshot(name, { fullPage: true });
    });
  }
}

test("inside strokes do not add to the measured heights", async ({ page }) => {
  const heights = async (id: string, selector: string) => {
    await page.goto(`/iframe.html?viewMode=story&id=${id}&globals=brand:maps;theme:light`);
    await expect(page.locator("#storybook-root > *").first()).toBeVisible();
    return page
      .locator(selector)
      .evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().height)));
  };
  expect(new Set(await heights("components-chip--all-variants", "#storybook-root button"))).toEqual(
    new Set([28]),
  );
  expect(
    new Set(await heights("components-textinput--all-variants", "#storybook-root input")),
  ).toEqual(new Set([20]));
  expect(
    new Set(
      await heights("components-textinput--all-variants", "#storybook-root div:has(> input)"),
    ),
  ).toEqual(new Set([36]));
  expect(
    new Set(
      await heights("components-searchinput--all-variants", "#storybook-root div:has(> input)"),
    ),
  ).toEqual(new Set([36]));
  expect(
    await heights(
      "components-searchinput--all-variants",
      "#storybook-root div:has(> input) > button",
    ),
  ).toEqual([34]);
  expect(await heights("components-placerow--all-variants", "#storybook-root button")).toEqual([
    72,
  ]);
  expect(
    new Set(await heights("components-codeinput--all-variants", "#storybook-root input")),
  ).toEqual(new Set([48]));
});

async function readBackgroundPrimary(page: Page): Promise<string> {
  return page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--background-primary").trim(),
  );
}

test.describe("maps follows the system theme", () => {
  test.use({ colorScheme: "dark" });

  test("no data-theme falls back to the system dark scheme", async ({ page }) => {
    await page.goto(
      "/iframe.html?viewMode=story&id=components-toggle--all-variants&globals=brand:maps;canvas:brand",
    );
    await expect(page.locator("#storybook-root > *").first()).toBeVisible();
    await page.evaluate(() => document.documentElement.removeAttribute("data-theme"));
    await expect.poll(() => readBackgroundPrimary(page)).toBe("#222528");
  });

  test("explicit data-theme=light overrides the system dark scheme", async ({ page }) => {
    await page.goto(
      "/iframe.html?viewMode=story&id=components-toggle--all-variants&globals=brand:maps;canvas:brand",
    );
    await expect(page.locator("#storybook-root > *").first()).toBeVisible();
    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "light"));
    await expect.poll(() => readBackgroundPrimary(page)).toBe("#fff");
  });
});
