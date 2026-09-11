import re

with open('e2e/a11y.spec.ts', 'r') as f:
    a11y = f.read()

# Replace networkidle with domcontentloaded as instructed by memory "avoid relying on networkidle states"
a11y = a11y.replace('await page.waitForLoadState("networkidle");', 'await page.waitForLoadState("domcontentloaded");')

with open('e2e/a11y.spec.ts', 'w') as f:
    f.write(a11y)
