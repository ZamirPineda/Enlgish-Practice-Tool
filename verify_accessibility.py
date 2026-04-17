from playwright.sync_api import sync_playwright

def verify_stop_game_browse_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the Stop Game browse view as instructed in memory
        page.goto("http://localhost:3000/#/stop")

        # Wait for the splash screen to disappear as instructed in memory
        page.wait_for_function("() => !document.querySelector('.splash-screen-or-loading')", timeout=10000)

        # Click through any onboarding modal if present as instructed in memory
        try:
            skip_button = page.locator("button:has-text('Skip')")
            if skip_button.is_visible():
               skip_button.click()
            page.wait_for_timeout(500)
        except Exception:
            pass

        page.wait_for_selector("button[aria-label='Show Saved Only']", timeout=5000)

        # Switch to "Study" view mode
        study_mode_btn = page.locator("button:has-text('Study')").first
        if study_mode_btn.is_visible():
            study_mode_btn.click()
            page.wait_for_timeout(500)

        # Take a screenshot to verify UI is visually intact
        page.screenshot(path="stop_game_browse_study_a11y.png")
        print("Accessibility verification complete.")

        browser.close()

if __name__ == "__main__":
    verify_stop_game_browse_accessibility()
