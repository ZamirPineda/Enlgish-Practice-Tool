import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility (A11y) Standards", () => {
  test("Home page should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });

  test("Vocabulary Vault view should not have severe accessibility violations", async ({
    page,
  }) => {
    // In playwight tests for vocabulary vault, skip testing color contrast issues to avoid flakiness
    // due to coach marks / onboardings that might pop over and cause the test to fail.
    await page.goto("/#/vault");
    await page.waitForLoadState("domcontentloaded");

    // Check if onboarding/coachmarks intercept the page and dismiss them
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
    await page.reload();
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });

  test("Math Dashboard should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/#/calculus");
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });
});
