from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to app
        page.goto("http://localhost:3000/Enlgish-Practice-Tool/")

        # Wait for "STOP Game Library" to be visible
        page.wait_for_selector("text=STOP Game Library")

        # Wait for a card to appear (e.g. looking for a known word or just any card)
        # We can look for "Adjectives" category card if it exists, or just wait for text "A1" or similar
        # Based on StopGameBrowse, it renders cards.
        # Let's wait for a card with class including "rounded-2xl" inside the grid
        # Or simpler: wait for text "Abundance" or similar if data is static.
        # The default letter is 'A'.
        # Let's try to click the first card detail (the main div).

        # Wait for any card content
        card = page.wait_for_selector(".font-bold.truncate.text-lg", state="visible")
        card_text = card.inner_text()
        print(f"Found card: {card_text}")

        # Click the card to open modal
        # The click handler is on the parent div of the text
        card.click()

        # Wait for modal to appear
        # Modal has role="dialog"
        modal = page.wait_for_selector('div[role="dialog"]', state="visible")
        print("Modal opened")

        # Check focus
        # We need to wait a tiny bit for the useEffect to run?
        # Playwright auto-waits for visibility, but focus is instant in useEffect.
        # Let's check active element
        active_role = page.evaluate("document.activeElement.getAttribute('role')")
        print(f"Active element role: {active_role}")

        if active_role == 'dialog':
            print("SUCCESS: Focus moved to dialog")
        else:
            print(f"FAILURE: Focus is on {page.evaluate('document.activeElement.tagName')}")

        # Take screenshot
        page.screenshot(path="verification_modal.png")
        print("Screenshot saved to verification_modal.png")

        # Test Escape
        page.keyboard.press("Escape")

        # Wait for modal to disappear
        page.wait_for_selector('div[role="dialog"]', state="hidden")
        print("Modal closed on Escape")

        browser.close()

if __name__ == "__main__":
    run()
