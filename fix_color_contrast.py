from playwright.sync_api import sync_playwright

def find_color_contrast_violations():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Start dev server locally or hit the already running dev server
        # Let's assume we can start dev server in another bash command and hit localhost:3000
        page.goto("http://localhost:3000")

        # Click skip to bypass intro modal
        skip_button = page.get_by_role('button', name='Skip')
        if skip_button.is_visible():
            skip_button.click()


        # Take a screenshot
        page.screenshot(path="/home/jules/verification/home.png")

        browser.close()

if __name__ == "__main__":
    find_color_contrast_violations()
