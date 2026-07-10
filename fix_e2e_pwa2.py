with open("e2e/pwa-update.spec.ts", "r") as f:
    content = f.read()

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
