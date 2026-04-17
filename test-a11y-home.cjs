const { chromium } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("http://localhost:3001/");

  const results = await new AxeBuilder({ page }).analyze();

  const severeViolations = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical",
  );

  console.log(JSON.stringify(severeViolations, null, 2));

  await browser.close();
})();
