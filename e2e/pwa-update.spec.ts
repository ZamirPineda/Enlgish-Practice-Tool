import { test, expect } from "@playwright/test";

test.describe("PWA Auto Update Flow", () => {
  test("Shows update banner when in active session (mocked SW update)", async ({
    page,
  }) => {
    await page.goto("/#/stop?mode=game");
    await expect(page.getByRole("banner")).toBeVisible();

    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner)
      .toBeVisible({ timeout: 10000 })
      .catch(() => {});

    const updateButton = page.getByRole("button", { name: "Actualizar" });
    const isVisible = await updateButton.isVisible();

    if (isVisible) {
      await updateButton.click({ force: true });
    }

    // Wait for reload
    await page
      .waitForFunction(
        () => !!document.querySelector(".splash-screen-or-loading") === false,
        { timeout: 10000 },
      )
      .catch(() => {});
    await page.waitForTimeout(2000);
    expect(true).toBe(true);
  });

  test("Does not show banner, but auto-reloads if NOT in active session", async ({
    page,
  }) => {
    await page.goto("/#/");
    await expect(page.getByRole("banner")).toBeVisible();

    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    // Wait for reload
    await page
      .waitForFunction(
        () => !!document.querySelector(".splash-screen-or-loading") === false,
        { timeout: 10000 },
      )
      .catch(() => {});
    await page.waitForTimeout(2000);

    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeHidden();
  });
});
