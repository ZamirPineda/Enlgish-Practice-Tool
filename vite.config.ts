/// <reference types="vitest" />
import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { configDefaults } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const ghPagesBasePath =
    process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : "/";
  const basePath = env.VITE_BASE_PATH || ghPagesBasePath;
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "pwa-192x192.png",
          "pwa-512x512.png",
          "pwa-192x192-maskable.png",
          "pwa-512x512-maskable.png",
          "offline.html",
        ],
        workbox: {
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
          navigateFallback: `${basePath}offline.html`,
        },
        manifest: {
          name: "SkillPal",
          short_name: "SkillPal",
          description:
            "Your daily interactive practice tool for English, Code, Math, and beyond.",
          start_url: basePath,
          scope: basePath,
          display: "standalone",
          background_color: "#0f172a",
          theme_color: "#0284c7",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "pwa-192x192-maskable.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "pwa-512x512-maskable.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
      }),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTests.ts",
      exclude: [...configDefaults.exclude, "e2e/**"],
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
    base: basePath,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
            if (
              id.includes("/data/stop_categories/") ||
              id.includes("/data/stopGameData")
            ) {
              return "game-data";
            }
          },
        },
      },
      chunkSizeWarningLimit: 1500,
    },
  };
});
