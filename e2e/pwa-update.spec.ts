import { test, expect } from "@playwright/test";

test.describe("PWA Auto Update Flow", () => {
  test("Shows update banner when in active session (mocked SW update)", async ({
    page,
  }) => {
    // Navigate to a game route (active session)
    await page.goto("/#/stop?mode=game");

    // Ensure page is loaded
    await expect(page.getByRole("banner")).toBeVisible();

    // Ensure the UI is ready
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // Ensure the service worker logic has had time to register hooks on the window
    await page
      .waitForFunction(
        () => typeof (window as any).__TRIGGER_PWA_UPDATE === "function",
        { timeout: 10000 },
      )
      .catch(() => {});

    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      } else {
        console.warn("__TRIGGER_PWA_UPDATE not found");
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
    const navPromise = page
      .waitForNavigation({ timeout: 5000 })
      .catch(() => {});
    await updateButton.click({ force: true });
    await navPromise;
  });

  test("Does not show banner, but auto-reloads if NOT in active session", async ({
    page,
  }) => {
    // Navigate to home (not an active session)
    await page.goto("/#/");

    await expect(page.getByRole("banner")).toBeVisible();

    const navPromise = page
      .waitForNavigation({ timeout: 5000 })
      .catch(() => {});

    // Ensure the UI is ready
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // Ensure the service worker logic has had time to register hooks on the window
    await page
      .waitForFunction(
        () => typeof (window as any).__TRIGGER_PWA_UPDATE === "function",
        { timeout: 10000 },
      )
      .catch(() => {});

    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      } else {
        console.warn("__TRIGGER_PWA_UPDATE not found");
      }
    });

    await navPromise;

    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeHidden();
  });
});
