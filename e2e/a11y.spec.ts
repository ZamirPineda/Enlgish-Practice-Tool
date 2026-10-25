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
    await page.waitForLoadState("domcontentloaded");
    await page.evaluate(() => {
      window.localStorage.setItem('english-pal-app-settings', JSON.stringify({"hasCompletedOnboarding": true, "hasSeenVaultCoachmark": true, "hasSeenCoachmarks": true}));
    });
    await page.goto("/#/vault");
    await page.reload();
    await page.waitForLoadState("domcontentloaded");
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
    await page.waitForLoadState("domcontentloaded");
    await page.evaluate(() => {
      window.localStorage.setItem('english-pal-app-settings', JSON.stringify({"hasCompletedOnboarding": true, "hasSeenVaultCoachmark": true, "hasSeenCoachmarks": true}));
      window.localStorage.setItem('english-pal-math-disclaimer-seen', "true");
      window.localStorage.setItem('hasSeenMathDisclaimer', "true");
    });
    await page.goto("/#/calculus");
    await page.reload();
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });
});
