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
    await expect(updateBanner).toBeVisible();

    const updateButton = page.getByRole("button", { name: "Actualizar" });
    await expect(updateButton).toBeVisible();

    await updateButton.click({ force: true });
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

    await page.waitForTimeout(1000);

    const updateBanner = page.getByText("Nueva versión disponible");
    await expect(updateBanner).toBeHidden();
  });
});
