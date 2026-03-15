import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const COMPLETED_ONBOARDING_SETTINGS = {
  theme: "dark",
  reducedMotion: true,
  ttsAutoPlay: true,
  confirmDialogs: true,
  hasCompletedOnboarding: true,
};

test.describe("Accessibility (A11y) Standards", () => {
  test("Home page should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate((settings) => {
      window.localStorage.setItem("app-settings", JSON.stringify(settings));
    }, COMPLETED_ONBOARDING_SETTINGS);
    await page.reload();

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });

  test("Vocabulary Vault view should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate((settings) => {
      window.localStorage.setItem("app-settings", JSON.stringify(settings));
    }, COMPLETED_ONBOARDING_SETTINGS);
    await page.goto("/#/vault");
    await expect(
      page.getByRole("heading", { name: "Vocabulary Vault" })
    ).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });

  test("Math Dashboard should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate((settings) => {
      window.localStorage.setItem("app-settings", JSON.stringify(settings));
    }, COMPLETED_ONBOARDING_SETTINGS);
    await page.goto("/#/calculus");
    await expect(
      page.getByRole("tab", { name: "Cálculo" })
    ).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });
});
