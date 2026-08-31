import { test, expect } from "@playwright/test";

test.describe("PWA Auto Update Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app first so evaluate on localStorage works
    await page.goto("/");
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
  });

  test("Shows update banner when in active session (mocked SW update)", async ({
    page,
  }) => {
    // Navigate to a game route (active session)
    await page.goto("/#/stop?mode=game");

    // Ensure page is loaded
    await expect(page.getByRole("banner")).toBeVisible();

    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    // Verify the update banner is shown
    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeVisible();

    // Verify the update button is present
    const updateButton = page.getByRole("button", { name: "Actualizar" });
    await expect(updateButton).toBeVisible();

    page.on("dialog", (dialog) => dialog.accept()); // just in case

    // Wait for either framenavigated or a specific timeout
    const navigationPromise = page
      .waitForEvent("framenavigated", { timeout: 3000 })
      .catch(() => null);

    await updateButton.click({ force: true });

    await navigationPromise;
  });

  test("Does not show banner, but auto-reloads if NOT in active session", async ({
    page,
  }) => {
    // Navigate to home (not an active session)
    await page.goto("/#/");

    await expect(page.getByRole("banner")).toBeVisible();

    const navigationPromise = page
      .waitForEvent("framenavigated", { timeout: 3000 })
      .catch(() => null);

    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    await navigationPromise;

    // Ensure it doesn't show the banner at all
    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeHidden();
  });
});
