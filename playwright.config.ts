import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: process.env.TEST_URL || "http://127.0.0.1:5174",
    channel: "chrome",
    headless: true,
  },
  reporter: "list",
});
