import { readFileSync } from "node:fs";
import { join } from "node:path";

import { expect, test } from "@playwright/test";

const THEMES = ["light", "dark"] as const;
const INTERACTIVE = /--(песочница|live)$/;

type IndexEntry = { id: string; type: string };
const index = JSON.parse(
  readFileSync(join(process.cwd(), "storybook-static", "index.json"), "utf8"),
) as { entries: Record<string, IndexEntry> };

const STORIES = Object.values(index.entries)
  .filter((e) => e.type === "story" && /^(maps-kit|icons)/.test(e.id) && !INTERACTIVE.test(e.id))
  .map((e) => e.id);

for (const id of STORIES) {
  for (const theme of THEMES) {
    test(`${id} — ${theme}`, async ({ page }) => {
      if (id === "maps-kit--bottom-sheet") {
        await page.setViewportSize({ width: 390, height: 700 });
      }
      await page.goto(`/iframe.html?viewMode=story&id=${id}&globals=brand:maps;theme:${theme}`);
      if (id === "maps-kit--dialog") {
        await expect(page.getByRole("dialog").first()).toBeVisible();
      } else {
        await expect(page.locator("#storybook-root > *").first()).toBeVisible();
      }
      if (id === "maps-kit--toast") {
        await page.getByRole("status").waitFor();
      }
      await expect(page).toHaveScreenshot(`${id.replace("--", "-")}-${theme}.png`, {
        fullPage: true,
      });
    });
  }
}

for (const theme of THEMES) {
  test(`maps kit phone-input-picker — ${theme}`, async ({ page }) => {
    await page.goto(
      `/iframe.html?viewMode=story&id=maps-kit-phoneinput--live&globals=brand:maps;theme:${theme}`,
    );
    await expect(page.getByLabel("Номер телефона")).toBeVisible();
    await page.getByRole("button", { name: /Регион/ }).click();
    await expect(page.getByRole("listbox")).toBeVisible();
    await expect(page).toHaveScreenshot(`maps-kit-phone-input-picker-${theme}.png`, {
      fullPage: true,
    });
  });
}

test("inside strokes do not add to the measured heights", async ({ page }) => {
  const heights = async (id: string, selector: string) => {
    await page.goto(`/iframe.html?viewMode=story&id=${id}&globals=brand:maps;theme:light`);
    await expect(page.locator("#storybook-root > *").first()).toBeVisible();
    return page
      .locator(selector)
      .evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().height)));
  };
  expect(new Set(await heights("maps-kit--chip", "#storybook-root button"))).toEqual(new Set([28]));
  expect(new Set(await heights("maps-kit--text-input", "#storybook-root input"))).toEqual(
    new Set([20]),
  );
  expect(
    new Set(await heights("maps-kit--text-input", "#storybook-root div:has(> input)")),
  ).toEqual(new Set([36]));
  expect(
    new Set(await heights("maps-kit--search-input", "#storybook-root div:has(> input)")),
  ).toEqual(new Set([36]));
  expect(
    await heights("maps-kit--search-input", "#storybook-root div:has(> input) > button"),
  ).toEqual([34]);
  expect(await heights("maps-kit--place-row", "#storybook-root button")).toEqual([72]);
});
