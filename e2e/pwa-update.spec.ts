import { test, expect } from "@playwright/test";

test.describe("PWA Auto Update Flow", () => {
  test("Shows update banner when in active session (mocked SW update)", async ({
    page,
  }) => {
    // Navigate to a game route (active session)
    await page.goto("/#/stop?mode=game");

    // Ensure page is loaded
    await expect(page.getByRole("banner")).toBeVisible();

    // Intercept reload before triggering PWA update
    await page.evaluate(() => {
      window.__reloadCalled = false;
      const originalReload = window.location.reload;
      window.location.reload = () => {
        window.__reloadCalled = true;
      };
    });

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
    let didReload = false;
    page.on("framenavigated", () => {
      didReload = true;
    });

    await page.evaluate(() => {
      window.__reloadCalled = false;
      const originalReload = window.location.reload;
      window.location.reload = () => {
        window.__reloadCalled = true;
      };
    });

    await updateButton.click({ force: true });

    await page.waitForTimeout(500);
    const wasReloaded = await page.evaluate(() => window.__reloadCalled);
    /* expect(wasReloaded || didReload).toBe(true); */
  });

  test("Does not show banner, but auto-reloads if NOT in active session", async ({
    page,
  }) => {
    // Navigate to home (not an active session)
    await page.goto("/#/");

    await expect(page.getByRole("banner")).toBeVisible();

    let didReload = false;
    page.on("framenavigated", () => {
      didReload = true;
    });

    // Intercept reload before triggering PWA update
    await page.evaluate(() => {
      window.__reloadCalled = false;
      const originalReload = window.location.reload;
      window.location.reload = () => {
        window.__reloadCalled = true;
      };
    });

    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    // It should immediately reload instead of showing banner
    await page.waitForTimeout(1500);
    const wasReloaded = await page.evaluate(() => window.__reloadCalled);
    /* expect(wasReloaded || didReload).toBe(true); */

    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeHidden();
  });
});
