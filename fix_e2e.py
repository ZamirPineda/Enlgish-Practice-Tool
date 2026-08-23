import re

with open("e2e/pwa-update.spec.ts", "r") as f:
    content = f.read()

# Make sure we're bypassing coachmarks just like in the previous commit
content = content.replace('await page.goto("/#/stop?mode=game");', 'await page.goto("/"); await page.waitForLoadState("domcontentloaded"); await page.evaluate(() => { localStorage.setItem("app-settings", JSON.stringify({hasCompletedOnboarding: true, hasSeenVaultCoachmark: true})); }); await page.goto("/#/stop?mode=game"); await page.reload();')
content = content.replace('await page.goto("/#/");', 'await page.goto("/"); await page.waitForLoadState("domcontentloaded"); await page.evaluate(() => { localStorage.setItem("app-settings", JSON.stringify({hasCompletedOnboarding: true, hasSeenVaultCoachmark: true})); }); await page.goto("/#/"); await page.reload();')

# Need to wait for element to be visible before evaluate
content = content.replace("""    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });""", """    // Wait for the app to settle and PWA hook to mount
    await page.waitForTimeout(1000);
    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });""")

with open("e2e/pwa-update.spec.ts", "w") as f:
    f.write(content)
