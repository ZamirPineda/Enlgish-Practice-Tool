import re

with open('e2e/pwa-update.spec.ts', 'r') as f:
    code = f.read()

# Replace await updateButton.click(); with await updateButton.click({ force: true }); as per instructions "In Playwright E2E tests, if click actions fail due to being intercepted by invisible overlays or UI transitions (e.g., update banners), use `.click({ force: true })` to guarantee the click is executed."
code = code.replace('await updateButton.click();', 'await updateButton.click({ force: true });')

with open('e2e/pwa-update.spec.ts', 'w') as f:
    f.write(code)
