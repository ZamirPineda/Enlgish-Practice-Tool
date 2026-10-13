import re

with open("e2e/pwa-update.spec.ts", "r") as f:
    content = f.read()

# Add a mechanism to dismiss the onboarding modal if it appears despite localStorage overrides.
content = content.replace('await expect(page.getByRole("banner")).toBeVisible();', 'await expect(page.getByRole("banner")).toBeVisible();\n    try { await page.getByRole("button", { name: "Close" }).click({ timeout: 2000 }); } catch (e) {}')

with open("e2e/pwa-update.spec.ts", "w") as f:
    f.write(content)
