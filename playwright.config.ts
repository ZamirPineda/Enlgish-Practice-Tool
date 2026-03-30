import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: "http://127.0.0.1:3000/Enlgish-Practice-Tool/",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm run dev",
    url: "http://127.0.0.1:3000/Enlgish-Practice-Tool/",
    reuseExistingServer: !process.env.CI,
  },
});
