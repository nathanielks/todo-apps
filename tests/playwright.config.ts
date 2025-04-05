import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    // All requests we send go to this API endpoint.
    baseURL: process.env.API_BASE_URL ?? "http://localhost:3000",
    extraHTTPHeaders: {
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      // Authorization: `token ${process.env.API_TOKEN}`,
    },
  },
});
