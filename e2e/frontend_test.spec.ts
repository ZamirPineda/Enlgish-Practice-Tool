import { test, expect } from '@playwright/test';

test('verify frontend UI changes', async ({ page }) => {
  await page.goto('http://localhost:3000/#/stop?mode=browse');

  // Try to find the WordFamilyViewer on a card
  // Wait for network/loading
  await page.waitForFunction(() => !document.querySelector('.splash-screen-or-loading'));

  // Take a screenshot of the browse view.
  await page.screenshot({ path: 'frontend_screenshot.png' });
});
