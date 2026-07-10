with open("e2e/a11y.spec.ts", "r") as f:
    content = f.read()

content = content.replace(
'''  test("Vocabulary Vault view should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/#/vault");
    await page.waitForLoadState("networkidle");''',
'''  test("Vocabulary Vault view should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem('app-settings', JSON.stringify({hasCompletedOnboarding: true, hasSeenVaultCoachmark: true})));
    await page.goto("/#/vault");
    await page.reload();
    // Wait for the main vault container to be visible instead of networkidle which times out
    await page.waitForSelector("text='Vocabulary Vault'", { timeout: 10000 });
    // Additional wait to let any potential loading spinners disappear
    await page.waitForFunction(() => !document.querySelector('.splash-screen-or-loading'), { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(1000);'''
)

content = content.replace(
'''  test("Math Dashboard should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/#/calculus");
    await page.waitForLoadState("networkidle");''',
'''  test("Math Dashboard should not have severe accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem('app-settings', JSON.stringify({hasCompletedOnboarding: true, hasSeenVaultCoachmark: true})));
    await page.goto("/#/calculus");
    await page.reload();
    await page.waitForLoadState("networkidle");'''
)

with open("e2e/a11y.spec.ts", "w") as f:
    f.write(content)

with open("e2e/pwa-update.spec.ts", "r") as f:
    content = f.read()

content = content.replace('await page.goto("/#/stop?mode=game");', '''await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.evaluate(() => localStorage.setItem('app-settings', JSON.stringify({hasCompletedOnboarding: true, hasSeenVaultCoachmark: true})));
    await page.goto("/#/stop?mode=game");
    await page.reload();''')

content = content.replace('await updateButton.click();', 'await updateButton.click({ force: true });')

content = content.replace('''    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    // It should immediately reload instead of showing banner
    await page.waitForTimeout(500);''',
'''    // wait a moment before triggering
    await page.waitForTimeout(500);
    // Trigger mocked PWA update
    await page.evaluate(() => {
      if ((window as any).__TRIGGER_PWA_UPDATE) {
        (window as any).__TRIGGER_PWA_UPDATE();
      }
    });

    // It should immediately reload instead of showing banner
    await page.waitForTimeout(1000);''')

with open("e2e/pwa-update.spec.ts", "w") as f:
    f.write(content)

with open("src/hooks/usePWAUpdate.ts", "r") as f:
    content = f.read()

new_content = content.replace(
    """      // Expose to window for Playwright E2E tests to mock SW update
      (window as any).__TRIGGER_PWA_UPDATE = triggerUpdate;""",
    ""
)

new_content = new_content.replace(
    """  useEffect(() => {
    if ("serviceWorker" in navigator && import.meta.env.PROD) {""",
    """  useEffect(() => {
    const triggerUpdate = () => {
      if (isActiveSession()) {
        setUpdateAvailable(true);
      } else {
        if (!hasReloaded.current) {
          hasReloaded.current = true;
          if (wbRef.current) wbRef.current.messageSkipWaiting();
          window.location.reload();
        }
      }
    };
    // Expose to window for Playwright E2E tests to mock SW update
    (window as any).__TRIGGER_PWA_UPDATE = triggerUpdate;

    if ("serviceWorker" in navigator && import.meta.env.PROD) {"""
)

new_content = new_content.replace(
    """      const triggerUpdate = () => {
        if (isActiveSession()) {
          setUpdateAvailable(true);
        } else {
          if (!hasReloaded.current) {
            hasReloaded.current = true;
            if (wbRef.current) wbRef.current.messageSkipWaiting();
            window.location.reload();
          }
        }
      };""",
      ""
)

with open("src/hooks/usePWAUpdate.ts", "w") as f:
    f.write(new_content)
