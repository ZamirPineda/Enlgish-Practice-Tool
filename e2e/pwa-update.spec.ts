import { test, expect } from "@playwright/test";

test.describe("PWA Auto Update Flow", () => {
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

    // Wait for any onboarding/modals to close if they intercept the click
    try {
      const skipBtn = page.getByRole("button", { name: "Skip" });
      if (await skipBtn.isVisible({ timeout: 1000 })) {
        await skipBtn.click();
      }
    } catch {
      // ignore
    }

    // Click on update
    // Intercept reload to verify it happens
    let didReload = false;
    page.on("framenavigated", () => {
      didReload = true;
    });

    await updateButton.click({ force: true });

    // Since window.location.reload() happens, let's wait a bit to verify nav or log
    // We expect the script to call reload, bounding test time to ensure it passed.
    await page.waitForTimeout(500);
    expect(didReload).toBe(true);
  });

  test("Does not show banner, but auto-reloads if NOT in active session", async ({
    page,
  }) => {
    // Navigate to home (not an active session)
    await page.goto("/#/");

    await expect(page.getByRole("banner")).toBeVisible();

    // Set a flag to intercept reload or monitor it
    let didReload = false;
    // Listen for navigation events specifically capturing reloads
    page.on("framenavigated", (frame) => {
      if (frame === page.mainFrame()) {
        didReload = true;
      }
    });

    // Mock window.location.reload to be absolutely certain it fires and avoid actual navigation race conditions
    await page.evaluate(() => {
      (window as any).__RELOAD_CALLED = false;
      window.location.reload = () => {
        (window as any).__RELOAD_CALLED = true;
      };
    });

    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    // It should immediately reload instead of showing banner
    await page.waitForTimeout(500);

    // Check if reload was called using our mock since framenavigated might abort early
    const reloadCalled = await page.evaluate(() => (window as any).__RELOAD_CALLED);
    expect(reloadCalled || didReload).toBe(true);

    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeHidden();
  });
});
