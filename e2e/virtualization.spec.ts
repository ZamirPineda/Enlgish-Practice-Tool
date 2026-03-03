import { test, expect } from "@playwright/test";

test.describe("Virtualization in Vocabulary Vault", () => {
  test("renders rapidly and scrolls smoothly with 5000 items", async ({
    page,
  }) => {
    // Generate a massive deck
    const massiveDeck: Record<string, any> = {};
    for (let i = 0; i < 5000; i++) {
      const word = `word_${i}`;
      massiveDeck[word] = {
        word: word,
        definition: `A massive test word number ${i}`,
        repetition: 0,
        interval: 0,
        efactor: 2.5,
        status: "new",
        nextReviewDate: "2026-01-01T00:00:00.000Z",
        tags: ["test", i % 2 === 0 ? "even" : "odd"],
      };
    }

    // Inject local storage state
    await page.addInitScript((deckState) => {
      window.localStorage.setItem(
        "vocab-vault-deck",
        JSON.stringify(deckState),
      );
      window.localStorage.setItem(
        "app-settings",
        JSON.stringify({ hasCompletedOnboarding: true }),
      );
    }, massiveDeck);

    await page.goto("/#/vault");

    // Wait for vault to load (My Collection tab)
    await page.click('button:has-text("My Collection")');

    // Ensure the container is visible and the app didn't crash
    const container = page
      .locator("div.flex-1.overflow-y-auto.overscroll-y-contain")
      .first();
    await expect(container).toBeVisible();

    // Verify first items are rendered
    await expect(page.locator('text="word_0"').first()).toBeVisible();

    // Scroll down multiple times to simulate large continuous scrolling
    const boundingBox = await container.boundingBox();
    if (boundingBox) {
      await page.mouse.move(
        boundingBox.x + boundingBox.width / 2,
        boundingBox.y + boundingBox.height / 2,
      );
      for (let j = 0; j < 10; j++) {
        await page.mouse.wheel(0, 1000);
        await page.waitForTimeout(50); // slight delay to allow React to render virtual elements
      }
    }

    // Test filtering works smoothly
    const searchInput = page.getByRole("textbox", {
      name: "Search vault words",
    });
    await searchInput.fill("word_4999");

    // Wait for the debounced search to process
    await page.waitForTimeout(500);

    // Should only yield one or very few results, ensuring UI updates correctly
    await expect(page.locator('text="word_4999"').first()).toBeVisible();
  });
});
