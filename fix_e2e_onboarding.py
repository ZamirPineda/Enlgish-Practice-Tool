import re

with open('e2e/pwa-update.spec.ts', 'r') as f:
    code = f.read()

# I need to set hasCompletedOnboarding to true!
# In App.tsx:
#        {!settings.hasCompletedOnboarding && (
#          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

onboarding_mock = """
    // Pre-seed local storage to avoid onboarding overlay intercepting clicks
    await page.evaluate(() => {
      window.localStorage.setItem("app-settings", JSON.stringify({ hasCompletedOnboarding: true }));
    });
"""

# add it after page.goto

code = re.sub(
    r'(await page.goto\("/#/stop\?mode=game"\);)',
    r'\1\n' + onboarding_mock + '\n    await page.reload();\n',
    code
)

code = re.sub(
    r'(await page.goto\("/#/"\);)',
    r'\1\n' + onboarding_mock + '\n    await page.reload();\n',
    code
)

with open('e2e/pwa-update.spec.ts', 'w') as f:
    f.write(code)
