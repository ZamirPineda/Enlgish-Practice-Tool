from playwright.sync_api import sync_playwright
import time

def test_math_flashcard_keyboard():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:3000/#/calculus')
        time.sleep(2)

        # Print out elements with aria-label
        elements = page.query_selector_all('[aria-label]')
        print("Elements with aria-label:")
        for el in elements:
            print(f"- {el.get_attribute('aria-label')}")

        browser.close()

test_math_flashcard_keyboard()
