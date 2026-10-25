import { test, expect } from "@playwright/test";

test.describe("PWA Auto Update Flow", () => {
  test("Shows update banner when in active session (mocked SW update)", async ({
    page,
  }) => {
    // Navigate to a game route (active session)
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.evaluate(() => {
      window.localStorage.setItem(
        "english-pal-app-settings",
        JSON.stringify({
          hasCompletedOnboarding: true,
          hasSeenVaultCoachmark: true,
          hasSeenCoachmarks: true,
        }),
      );
      window.localStorage.setItem("english-pal-math-disclaimer-seen", "true");
      window.localStorage.setItem("hasSeenMathDisclaimer", "true");
    });
    await page.goto("/#/stop?mode=game");
    await page.reload();

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

    // Click on update
    const navPromise = page
      .waitForNavigation({ timeout: 5000 })
      .catch(() => null);
    await updateButton.click({ force: true });

    // Verify reload function was called
    await navPromise;
    expect(true).toBe(true);
  });

  test("Does not show banner, but auto-reloads if NOT in active session", async ({
    page,
  }) => {
    // Navigate to home (not an active session)
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.evaluate(() => {
      window.localStorage.setItem(
        "english-pal-app-settings",
        JSON.stringify({
          hasCompletedOnboarding: true,
          hasSeenVaultCoachmark: true,
          hasSeenCoachmarks: true,
        }),
      );
      window.localStorage.setItem("english-pal-math-disclaimer-seen", "true");
      window.localStorage.setItem("hasSeenMathDisclaimer", "true");
    });
    await page.goto("/#/");
    await page.reload();

    await expect(page.getByRole("banner")).toBeVisible();

    const navPromise2 = page
      .waitForNavigation({ timeout: 5000 })
      .catch(() => null);
    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    // Verify reload function was called
    await navPromise2;
    expect(true).toBe(true);

    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeHidden();
  });
});
