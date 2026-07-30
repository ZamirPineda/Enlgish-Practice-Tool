import { expect, test, type Page } from "@playwright/test";

const COMPLETED_ONBOARDING_SETTINGS = {
  theme: "dark",
  reducedMotion: true,
  ttsAutoPlay: true,
  confirmDialogs: true,
  hasCompletedOnboarding: true,
};

const openApp = async (page: Page, deck?: Record<string, unknown>) => {
  await page.goto("/");
  await page.evaluate(
    ({ settings, seededDeck }) => {
      window.localStorage.setItem("app-settings", JSON.stringify(settings));
      if (seededDeck) {
        window.localStorage.setItem(
          "vocab-vault-deck",
          JSON.stringify(seededDeck),
        );
      } else {
        window.localStorage.removeItem("vocab-vault-deck");
      }
      window.localStorage.removeItem("vocab-vault-progress");
    },
    { settings: COMPLETED_ONBOARDING_SETTINGS, seededDeck: deck },
  );
  await page.reload();
};

test("loads app and navigates main routes", async ({ page }) => {
  await openApp(page);
  await expect(page.getByText("Stop Game")).toBeVisible();

  await page.goto("./#/study");
  await expect(page).toHaveURL(/#\/study/);
  await expect(page.getByText("Practice Mode")).toBeVisible();

  await page.goto("./#/vault");
  await expect(page).toHaveURL(/#\/vault/);
  await expect(
    page.getByRole("heading", { name: "Vocabulary Vault" }),
  ).toBeVisible();
});

test("adds item to Vault and keeps it after reload", async ({ page }) => {
  await openApp(page);
  await page.goto("./#/vault");
  await page.getByRole("button", { name: "+ Add Word" }).first().click();

  await page.getByPlaceholder("e.g. Ubiquitous").fill("E2E Persistence Word");
  await page
    .getByPlaceholder(
      "Write a meaning you can imagine, not only a synonym or translation.",
    )
    .fill("Word created by e2e test");
  await page.getByRole("button", { name: "Save Word" }).click();

  await page.getByRole("button", { name: /my collection/i }).click();
  await expect(page.getByText("E2E Persistence Word").first()).toBeVisible();
  await page.waitForFunction(() =>
    (window.localStorage.getItem("vocab-vault-deck") || "").includes(
      "E2E Persistence Word",
    ),
  );

  await page.reload();
  await page.waitForFunction(() =>
    (window.localStorage.getItem("vocab-vault-deck") || "").includes(
      "E2E Persistence Word",
    ),
  );
});

test("starts review session and completes 3 steps", async ({ page }) => {
  await openApp(page);
  await page.goto("./#/vault");
  const starterKit = page
    .locator("section")
    .filter({ hasText: "High-Frequency Starter Kit" });
  const addButtons = starterKit.getByRole("button", {
    name: /Add .* to deck/i,
  });
  for (let i = 0; i < 3; i += 1) {
    await addButtons.nth(i).click();
  }
  await expect(
    page.getByRole("button", { name: "Review Now (3)" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Review Now (3)" }).click();

  for (let step = 1; step <= 3; step += 1) {
    await expect(page.getByText(`Review ${step} / 3`)).toBeVisible();
    await page.getByRole("button", { name: /Show Answer/i }).click();
    await page.getByRole("button", { name: /Easy/i }).click();
  }

  await expect(
    page.getByRole("heading", { name: "Vocabulary Vault" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "All caught up!" }),
  ).toBeVisible();
});
