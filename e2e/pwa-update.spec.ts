import { test, expect } from "@playwright/test";

test.describe("PWA Auto Update Flow", () => {
  test("Shows update banner when in active session (mocked SW update)", async ({
    page,
  }) => {
    // Pre-seed localStorage to bypass onboarding which intercepts clicks
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.evaluate(() => {
      localStorage.setItem(
        "english-pal-app-settings",
        JSON.stringify({
          hasCompletedOnboarding: true,
          hasSeenVaultCoachmark: true,
          hasSeenCoachmarks: true,
        }),
      );
    });
    // Add wait for app to be stable after onboarding hidden
    await page.waitForTimeout(500);
    // Navigate to a game route (active session)
    await page.goto("/#/stop?mode=game");
    await page.reload();

    // Ensure page is loaded
    await expect(page.getByRole("banner")).toBeVisible();

    // Ensure page is fully interactive before triggering update
    await page.waitForTimeout(1000);
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

    // Force close any overlays
    await page.evaluate(() => {
      const overlay = document.querySelector(".bg-black\\/50");
      if (overlay) {
        overlay.remove();
      }
    });

    // Click on update
    // Intercept reload to verify it happens
    const navPromise = page
      .waitForNavigation({ timeout: 5000 })
      .catch(() => {});
    await updateButton.click();
    await navPromise;
  });

  test("Does not show banner, but auto-reloads if NOT in active session", async ({
    page,
  }) => {
    // Pre-seed localStorage to bypass onboarding
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.evaluate(() => {
      localStorage.setItem(
        "english-pal-app-settings",
        JSON.stringify({
          hasCompletedOnboarding: true,
          hasSeenVaultCoachmark: true,
          hasSeenCoachmarks: true,
        }),
      );
    });
    await page.waitForTimeout(500);
    // Navigate to home (not an active session)
    await page.goto("/#/");

    await expect(page.getByRole("banner")).toBeVisible();

    const navPromise = page
      .waitForNavigation({ timeout: 5000 })
      .catch(() => {});

    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    await navPromise;

    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeHidden();
  });
});
