import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility (A11y) Standards", () => {
  // Pre-seed localStorage to bypass modals
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.evaluate(() => {
      localStorage.setItem(
        "app-settings",
        JSON.stringify({
          hasCompletedOnboarding: true,
          hasSeenVaultCoachmark: true,
          hasSeenCoachmarks: true,
        }),
      );
    });
    await page.reload(); // Ensure local storage change is picked up
  });

  test("Home page should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) =>
        (v.impact === "serious" || v.impact === "critical") &&
        v.id !== "color-contrast",
    );
    expect(severeViolations).toEqual([]);
  });

  test("Vocabulary Vault view should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/#/vault");
    await page.waitForLoadState("domcontentloaded");

    // Wait a bit to ensure rendering is complete
    await page.waitForTimeout(1000);

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) =>
        (v.impact === "serious" || v.impact === "critical") &&
        v.id !== "color-contrast",
    );
    expect(severeViolations).toEqual([]);
  });

  test("Math Dashboard should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/#/calculus");
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) =>
        (v.impact === "serious" || v.impact === "critical") &&
        v.id !== "color-contrast",
    );

    expect(severeViolations).toEqual([]);
  });
});
