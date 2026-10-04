import { test, expect } from "@playwright/test";

test.describe("PWA Auto Update Flow", () => {
  test("Shows update banner when in active session (mocked SW update)", async ({
    page,
  }) => {
    // Navigate and set local storage to skip onboarding
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
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

    // Navigate to a game route (active session)
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
    // Intercept reload to verify it happens
    // We expect the script to call reload, bounding test time to ensure it passed.
    await Promise.all([
      page.waitForEvent("framenavigated"),
      updateButton.click({ force: true }),
    ]);
  });

  test("Does not show banner, but auto-reloads if NOT in active session", async ({
    page,
  }) => {
    // Navigate and set local storage to skip onboarding
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
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

    // Navigate to home (not an active session)
    await page.goto("/#/");
    await page.reload();

    await expect(page.getByRole("banner")).toBeVisible();

    // Trigger mocked PWA update and wait for reload
    await Promise.all([
      page.waitForEvent("framenavigated"),
      page.evaluate(() => {
        if ((window as any).__TRIGGER_PWA_UPDATE) {
          (window as any).__TRIGGER_PWA_UPDATE();
        }
      }),
    ]);

    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeHidden();
  });
});
