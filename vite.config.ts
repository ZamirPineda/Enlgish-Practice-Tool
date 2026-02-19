/// <reference types="vitest" />
import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: [],
        workbox: {
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        },
        manifest: {
          name: "English Practice Pal",
          short_name: "English Pal",
          description:
            "English study tool with vocabulary and spaced repetition",
          start_url: "/Enlgish-Practice-Tool/",
          scope: "/Enlgish-Practice-Tool/",
          display: "standalone",
          background_color: "#0f172a",
          theme_color: "#0284c7",
        },
      }),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTests.ts",
      coverage: {
        provider: "v8",
        reporter: ["text", "html", "json-summary"],
        reportsDirectory: "./coverage",
        include: [
          "components/ReviewSession.tsx",
          "components/VocabularyVaultView.tsx",
          "utils/srs.ts",
        ],
        thresholds: {
          lines: 60,
        },
      },
    },
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "import.meta.env.APP_VERSION": JSON.stringify(
        process.env.npm_package_version ?? "dev",
      ),
    },
    base: "/Enlgish-Practice-Tool/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
