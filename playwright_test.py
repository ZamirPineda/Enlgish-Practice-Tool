from playwright.sync_api import sync_playwright

def test_browse():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto("http://localhost:3000/#/stop?mode=browse")
        page.wait_for_timeout(3000)

        try:
            skip_btns = page.locator("button", has_text="Skip")
            if skip_btns.count() > 0:
                skip_btns.first.click()
                page.wait_for_timeout(1000)
        except: pass

        # Test clear search filter button
        # Enter something in the search field to make the button appear
        page.locator("input[placeholder='Search...']").fill("test")
        page.wait_for_timeout(1000)

        print("Search filter clear button count:", page.locator("[aria-label='Clear search filter']").count())

        browser.close()

if __name__ == "__main__":
    test_browse()
