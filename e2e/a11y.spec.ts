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
    await page.goto("/#/vault");
    await page.waitForSelector('text="Vocabulary Vault"');

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
    await page.waitForSelector('text="Math Dashboard"', { timeout: 10000 }).catch(() => {});

    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(severeViolations).toEqual([]);
  });
});
