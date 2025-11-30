// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  reporter : 'html',
  
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot: 'on',
    trace : 'retain-on-failure',


  },

  /* Configure projects for major browsers */

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

