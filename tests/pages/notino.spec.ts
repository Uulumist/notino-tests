import { test} from "@playwright/test";
import { MainPage } from "../models/MainPage";

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.openMainPage();
});

test.describe("Main page elements", () => {
  test("header elements visibility", async () => {
    await mainPage.headerElementsVisibility();
  });

  test("header elements text", async () => {
    await mainPage.headerElementsText();
  });

  test("header elements link", async () => {
    await mainPage.headerElementsAttribute();
  });
});
