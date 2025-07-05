import { test, expect, Page, Locator } from "@playwright/test";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const header_elements: Elements[] = [
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
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Notino logo" }),
    name: "Notino logo",
  },
  {
    locator: (page: Page): Locator => page.getByTestId("search-bar"),
    name: "search-bar",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Minu konto" }),
    name: "my-notino-icon",
    attribute: {
      type: "href",
      value: "/mynotino/",
    },
  },
  {
    locator: (page: Page): Locator => page.getByTestId("header-link-wishlist"),
    name: "header-link-wishlist",
    attribute: {
      type: "href",
      value: "/wishlist/",
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Ostukorv" }),
    name: "cart",
    text: "Ostukorv",
    attribute: {
      type: "href",
      value: "/cart/",
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Soodusmüük"),
    name: "sale menu",
    text: "Soodusmüük",
  },
  {
    locator: (page: Page): Locator =>
      page.getByText("Parfüüm", { exact: true }),
    name: "perfume menu",
    text: "Parfüüm",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Make-up"),
    name: "Make-up menu",
    text: "Make-up",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Juuksehooldus"),
    name: "Hair menu",
    text: "Juuksehooldus",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Näohooldus"),
    name: "Skin menu",
    text: "Näohooldus",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Kehahooldus"),
    name: "Body menu",
    text: "Kehahooldus",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Suuhooldus"),
    name: "Oral care menu",
    text: "Suuhooldus",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Ema ja laps"),
    name: "Mother and child menu",
    text: "Ema ja laps",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Meestele"),
    name: "Men menu",
    text: "Meestele",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Dermakosmeetika"),
    name: "Dermocosmetics menu",
    text: "Dermakosmeetika",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Päike"),
    name: "Suncare menu",
    text: "Päike",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Elektriseadmed"),
    name: "Electrical appliance menu",
    text: "Elektriseadmed",
  },
  {
    locator: (page: Page): Locator => page.getByText("Premium"),
    name: "Premium menu",
    text: "Premium",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId("menu-wrapper").getByText("Kaubamärgid"),
    name: "Brands menu",
    text: "Kaubamärgid",
  },
  {
    locator: (page: Page): Locator =>
      page.getByTestId('menu-wrapper').getByText('Inspiratsioon').nth(1),
    name: "Inspiration menu",
    text: "Inspiratsioon",
  },
];

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.notino.ee/");
});

test.describe("Main page elements", () => {
  test("top bar elements visibility", async ({ page }) => {
    for (const { locator, name } of header_elements) {
      await test.step(`Check visibility of: ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    }
  });

  test("header elements text", async ({ page }) => {
    for (const { locator, name, text } of header_elements) {
      if (text) {
        await test.step(`Check href attribute of: ${name}`, async () => {
          await expect.soft(locator(page)).toHaveText(text);
        });
      }
    }
  });

  test("header elements link", async ({ page }) => {
    for (const { locator, name, attribute } of header_elements) {
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
