import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility (A11y) Standards", () => {
  test("Home page should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");

    // Wait until we are no longer in a navigation or splash state
    await page.waitForFunction(() => {
        return !document.querySelector('.splash-screen-or-loading') && document.querySelector('body');
    }, null, { timeout: 10000 }).catch(() => {});
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });

  test("Vocabulary Vault view should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/#/vault");

    // Wait until we are no longer in a navigation or splash state
    await page.waitForFunction(() => {
        return !document.querySelector('.splash-screen-or-loading') && document.querySelector('body');
    }, null, { timeout: 10000 }).catch(() => {});
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });

  test("Math Dashboard should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/#/calculus");

    // Wait until we are no longer in a navigation or splash state
    await page.waitForFunction(() => {
        return !document.querySelector('.splash-screen-or-loading') && document.querySelector('body');
    }, null, { timeout: 10000 }).catch(() => {});
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });
});
