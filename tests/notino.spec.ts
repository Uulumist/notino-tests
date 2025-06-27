import { test, expect } from "@playwright/test";

const elements = [
  {
    locator: (page) =>
      page.getByRole("link", { name: "Tootenäidiseid täis ilukarp" }),
  },
  {
    locator: (page) => page.getByRole("link", { name: "Meiega leiad oma" }),
  },
  {
    locator: (page) => page.getByTestId("call-info-wrapper"),
  },
  {
    locator: (page) =>
      page.getByRole("link", { name: "Kohaletoimetamise teave" }),
  },
];

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.notino.ee/");
});

test.describe("Main page elements", () => {

  test("top bar elements", async ({ page }) => {
    for (const { locator } of elements) {
      await test.step("top bar", async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    }
  });
});