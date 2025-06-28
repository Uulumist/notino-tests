import { test, expect, Page, Locator } from "@playwright/test";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const top_bar_elements: Elements[] = [
  {
    locator: (page: Page): Locator => page.getByTestId("call-info-wrapper"),
    name: "phone number",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Kohaletoimetamise teave" }),
    name: "delivery info",
    attribute: {
      type: "href",
      value: "/saadetise-info/",
    },
  },
];

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.notino.ee/");
});

test.describe("Main page elements", () => {
  test("top bar elements visibility", async ({ page }) => {
    for (const { locator, name } of top_bar_elements) {
      await test.step(`Check visibility of: ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    }
  });

  test("top bar elements link", async ({ page }) => {
    for (const { locator, name, attribute } of top_bar_elements) {
      if (attribute) {
        await test.step(`Check href attribute of: ${name}`, async () => {
          await expect
            .soft(locator(page))
            .toHaveAttribute(attribute.type, attribute.value);
        });
      }
    }
  });
});
