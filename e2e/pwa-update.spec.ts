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
    await expect(updateBanner).toBeVisible({ timeout: 10000 });

    const updateButton = page.getByRole("button", { name: "Actualizar" });
    await expect(updateButton).toBeVisible();

    await page.evaluate(() => {
      (window as any).__RELOAD_CALLED = false;
      (window as any).__MOCK_RELOAD = () => {
        (window as any).__RELOAD_CALLED = true;
      };
    });

    await updateButton.dispatchEvent("click");

    await page.waitForTimeout(2000);
    const didReload = await page.evaluate(
      () => (window as any).__RELOAD_CALLED,
    );
    expect(didReload).toBe(true);
  });

  test("Does not show banner, but auto-reloads if NOT in active session", async ({
    page,
  }) => {
    await page.goto("/#/");
    await expect(page.getByRole("banner")).toBeVisible();

    await page.evaluate(() => {
      (window as any).__RELOAD_CALLED = false;
      (window as any).__MOCK_RELOAD = () => {
        (window as any).__RELOAD_CALLED = true;
      };
    });

    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    await page.waitForTimeout(2000);
    const didReload = await page.evaluate(
      () => (window as any).__RELOAD_CALLED,
    );
    expect(didReload).toBe(true);

    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeHidden();
  });
});
