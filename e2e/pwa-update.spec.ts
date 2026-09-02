import { test, expect } from "@playwright/test";

test.describe("PWA Auto Update Flow", () => {
  // Pre-seed localStorage to bypass modals
  test.beforeEach(async ({ page }) => {
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
    await page.reload();
  });

  test("Shows update banner when in active session (mocked SW update)", async ({
    page,
  }) => {
    // Navigate to a game route (active session)
    await page.goto("/#/stop?mode=game");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000); // Give the react app time to map the window global

    // Ensure page is loaded
    await expect(page.getByRole("banner")).toBeVisible();

    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    // Wait a brief moment for state to update
    await page.waitForTimeout(1000);

    // Verify the update banner is shown
    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeVisible({ timeout: 10000 });

    // Verify the update button is present
    const updateButton = page.getByRole("button", { name: "Actualizar" });
    await expect(updateButton).toBeVisible();

    // Click on update
    // Intercept reload to verify it happens
    let didReload = false;
    page.on("framenavigated", () => {
      didReload = true;
    });

    await updateButton.click({ force: true });

    // Since window.location.reload() happens, let's wait a bit to verify nav or log
    // We expect the script to call reload, bounding test time to ensure it passed.
    await page.waitForTimeout(1000);
    expect(didReload).toBe(true);
  });

  test("Does not show banner, but auto-reloads if NOT in active session", async ({
    page,
  }) => {
    // Navigate to home (not an active session)
    await page.goto("/#/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000); // Give the react app time to map the window global

    await expect(page.getByRole("banner")).toBeVisible();

    let didReload = false;
    page.on("framenavigated", () => {
      didReload = true;
    });

    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    // It should immediately reload instead of showing banner
    await page.waitForTimeout(2000); // wait slightly longer for reload hook to fire
    expect(didReload).toBe(true);

    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeHidden();
  });
});
