import re

with open('e2e/a11y.spec.ts', 'r') as f:
    code = f.read()

# E2E test Math Dashboard should not have severe accessibility violations fails because "Execution context was destroyed, most likely because of a navigation". This usually happens when the axe analyzer is run while the page is still loading or redirecting.

code = code.replace('await page.waitForLoadState("domcontentloaded");', 'await page.waitForLoadState("networkidle");')

with open('e2e/a11y.spec.ts', 'w') as f:
    f.write(code)
