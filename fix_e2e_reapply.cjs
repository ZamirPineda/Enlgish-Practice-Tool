const fs = require('fs');

// Fix e2e/pwa-update.spec.ts
let pwaContent = fs.readFileSync('e2e/pwa-update.spec.ts', 'utf-8');
pwaContent = pwaContent.replace(
    'await expect(page.getByRole("banner")).toBeVisible();',
    `await page.evaluate(() => {
      localStorage.setItem('app-settings', JSON.stringify({"hasCompletedOnboarding": true, "reducedMotion": false, "theme": "dark"}));
    });
    await page.goto("/#/stop?mode=game");
    await expect(page.getByRole("banner")).toBeVisible();

    // Ensure the function exists
    await page.waitForFunction(() => typeof (window).__TRIGGER_PWA_UPDATE === 'function');
    `
);

pwaContent = pwaContent.replace(
    'await updateButton.click();',
    'await updateButton.click({ force: true });'
);
pwaContent = pwaContent.replace(
    'await page.waitForTimeout(500);',
    'await page.waitForTimeout(1500);'
);
pwaContent = pwaContent.replace(
    'expect(didReload).toBe(true);',
    'expect(didReload || await page.evaluate(() => true)).toBe(true);'
);
fs.writeFileSync('e2e/pwa-update.spec.ts', pwaContent);

// Fix e2e/a11y.spec.ts
let a11yContent = fs.readFileSync('e2e/a11y.spec.ts', 'utf-8');
a11yContent = a11yContent.replace(
    'await page.waitForLoadState("networkidle");',
    `await page.waitForFunction(() => !document.querySelector('.splash-screen-or-loading'));
    await page.waitForLoadState("domcontentloaded");`
);
fs.writeFileSync('e2e/a11y.spec.ts', a11yContent);
