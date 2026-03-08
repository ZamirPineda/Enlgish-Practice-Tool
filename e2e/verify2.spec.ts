import { test, expect } from '@playwright/test';

test('capture StopGameBrowse component', async ({ page }) => {
  // Increase timeout
  test.setTimeout(60000);

  // Navigate to root (which redirects based on routing config)
  await page.goto('http://localhost:3000/#/stop');

  // Wait a bit to let the app initialize and modal to pop up
  await page.waitForTimeout(1000);

  // Dismiss onboarding modal if it exists
  const skipButton = page.getByRole('button', { name: 'Skip' });
  if (await skipButton.count() > 0) {
    await skipButton.click();
    await page.waitForTimeout(500); // Wait for modal to disappear
  }

  // Click on "GRAMMAR & LANGUAGE" filter
  const grammarButton = page.getByText('GRAMMAR & LANGUAGE');
  if (await grammarButton.count() > 0) {
    await grammarButton.click();
    await page.waitForTimeout(500);
  }

  // Type in the search to filter words to "Accept"
  const searchInput = page.getByPlaceholder('Search...');
  if (await searchInput.count() > 0) {
    await searchInput.fill('Accept');
    await page.waitForTimeout(500);
  }

  const expandButton = page.locator('button', { hasText: 'Show Family 👨‍👩‍👧‍👦' }).first();
  if (await expandButton.count() > 0) {
    await expandButton.click();
    await page.waitForTimeout(500);
  }

  // Take screenshot
  await page.screenshot({ path: '/tmp/stop_game_card_accessibility_final.png' });

  console.log("Screenshot saved!");
});
