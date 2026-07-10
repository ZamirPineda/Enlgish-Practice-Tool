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
    await page.goto("/");
    await page.evaluate(() =>
      localStorage.setItem(
        "app-settings",
        JSON.stringify({
          hasCompletedOnboarding: true,
          hasSeenVaultCoachmark: true,
        }),
      ),
    );
    await page.goto("/#/vault");
    await page.reload();
    // Wait for the main vault container to be visible instead of networkidle which times out
    await page.waitForSelector("text='Vocabulary Vault'", { timeout: 10000 });
    // Additional wait to let any potential loading spinners disappear
    await page
      .waitForFunction(
        () => !document.querySelector(".splash-screen-or-loading"),
        { timeout: 5000 },
      )
      .catch(() => {});
    await page.waitForTimeout(1000);

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
    await page.evaluate(() =>
      localStorage.setItem(
        "app-settings",
        JSON.stringify({
          hasCompletedOnboarding: true,
          hasSeenVaultCoachmark: true,
        }),
      ),
    );
    await page.goto("/#/calculus");
    await page.reload();
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });
});
