import re

with open('e2e/pwa-update.spec.ts', 'r') as f:
    code = f.read()

# I will increase the timeout wait
code = code.replace('await page.waitForTimeout(500);', 'await page.waitForTimeout(1000);')

with open('e2e/pwa-update.spec.ts', 'w') as f:
    f.write(code)
