import { expect, test } from "@playwright/test";

const TABS = [
  "/felia-ta",
  "/bilantul-national",
  "/companii-de-stat",
  "/economie",
  "/societate",
  "/energie",
  "/piata-muncii",
  "/justitie",
];

test("every tab renders without crashing", async ({ page }) => {
  for (const path of TABS) {
    await page.goto(path);
    await expect(page).toHaveTitle(/Bugetul României/);
    await expect(page.getByText("Ceva nu a mers bine")).toHaveCount(0);
    await expect(page.locator("h2").first()).toBeVisible();
  }
});

test("new Eurostat tabs render their headings without a backend", async ({
  page,
}) => {
  await page.goto("/piata-muncii");
  await expect(page.getByText("Piața muncii").first()).toBeVisible();

  await page.goto("/justitie");
  await expect(page.getByText("Justiția în cifre").first()).toBeVisible();
});

test("salary tab renders the waterfall and KPIs from static data", async ({
  page,
}) => {
  await page.goto("/felia-ta");
  await expect(page.getByText("Situația ta fiscală")).toBeVisible();
  await expect(page.getByText("Salariu brut (lei/lună)")).toBeVisible();
  await expect(page.locator("svg.recharts-surface").first()).toBeVisible();
});

test("locale switcher toggles to English", async ({ page }) => {
  await page.goto("/felia-ta");
  await expect(page.locator("html")).toHaveAttribute("lang", "ro");
  await page.getByRole("button", { name: "EN" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByText("Your fiscal situation")).toBeVisible();
});
