/// <reference types="vitest" />
import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { configDefaults } from "vitest/config";

const normalizeChunkId = (id: string) => id.replace(/\\/g, "/");

const getVendorChunk = (id: string) => {
  if (
    id.includes("/node_modules/react/") ||
    id.includes("/node_modules/react-dom/") ||
    id.includes("/node_modules/react-router") ||
    id.includes("/node_modules/scheduler/")
  ) {
    return "react-vendor";
  }

  if (
    id.includes("/node_modules/react-aria-components/") ||
    id.includes("/node_modules/framer-motion/") ||
    id.includes("/node_modules/@floating-ui/") ||
    id.includes("/node_modules/@radix-ui/") ||
    id.includes("/node_modules/cmdk/") ||
    id.includes("/node_modules/lucide-react/")
  ) {
    return "ui-vendor";
  }

  if (id.includes("/node_modules/recharts/")) {
    return "charts-vendor";
  }

  if (
    id.includes("/node_modules/@tanstack/") ||
    id.includes("/node_modules/@dnd-kit/")
  ) {
    return "feature-vendor";
  }

  return "vendor";
};

const getStopGameChunk = (id: string) => {
  if (
    id.includes("/src/features/data/stopGameData.ts") ||
    id.includes("/src/features/data/stop_categories/countries.ts") ||
    id.includes("/src/features/data/stop_categories/cities.ts") ||
    id.includes("/src/features/data/stop_categories/capitals.ts") ||
    id.includes("/src/features/data/stop_categories/landmarks.ts") ||
    id.includes("/src/features/data/stop_categories/history.ts")
  ) {
    return "stop-game-world";
  }

  if (
    id.includes("/src/features/data/stop_categories/grammar_verbs.ts") ||
    id.includes("/src/features/data/stop_categories/grammar.ts") ||
    id.includes(
      "/src/features/data/stop_categories/definitions/adjectives.ts",
    ) ||
    id.includes("/src/features/data/stop_categories/definitions/adverbs.ts") ||
    id.includes(
      "/src/features/data/stop_categories/definitions/connectors.ts",
    ) ||
    id.includes("/src/features/data/stop_categories/definitions/emphasis.ts") ||
    id.includes(
      "/src/features/data/stop_categories/definitions/interjections.ts",
    ) ||
    id.includes("/src/features/data/stop_categories/definitions/modal_verbs.ts")
  ) {
    return "stop-game-grammar-core";
  }

  if (
    id.includes("/src/features/data/stop_categories/definitions/emotions.ts") ||
    id.includes(
      "/src/features/data/stop_categories/definitions/phrasal_verbs.ts",
    ) ||
    id.includes(
      "/src/features/data/stop_categories/definitions/phrasal_nouns.ts",
    ) ||
    id.includes(
      "/src/features/data/stop_categories/definitions/compound_adjectives.ts",
    )
  ) {
    return "stop-game-grammar-extended";
  }

  if (
    id.includes("/src/features/data/stop_categories/language_extras.ts") ||
    id.includes(
      "/src/features/data/stop_categories/definitions/collocations.ts",
    ) ||
    id.includes("/src/features/data/stop_categories/definitions/idioms.ts") ||
    id.includes(
      "/src/features/data/stop_categories/definitions/opposites.ts",
    ) ||
    id.includes(
      "/src/features/data/stop_categories/definitions/false_friends.ts",
    ) ||
    id.includes(
      "/src/features/data/stop_categories/definitions/compound_words.ts",
    )
  ) {
    return "stop-game-language-patterns";
  }

  if (
    id.includes(
      "/src/features/data/stop_categories/definitions/homophones.ts",
    ) ||
    id.includes(
      "/src/features/data/stop_categories/definitions/minimal_pairs.ts",
    ) ||
    id.includes(
      "/src/features/data/stop_categories/definitions/sounds_and_noise.ts",
    ) ||
    id.includes("/src/features/data/stop_categories/definitions/slang.ts") ||
    id.includes(
      "/src/features/data/stop_categories/definitions/rare_literary.ts",
    ) ||
    id.includes("/src/features/data/stop_categories/definitions/proverbs.ts")
  ) {
    return "stop-game-language-sound";
  }

  if (
    id.includes("/src/features/data/stop_categories/daily.ts") ||
    id.includes("/src/features/data/stop_categories/daily_") ||
    id.includes("/src/features/data/stop_categories/education.ts") ||
    id.includes("/src/features/data/stop_categories/lifestyle.ts") ||
    id.includes("/src/features/data/stop_categories/lifestyle_")
  ) {
    return "stop-game-daily";
  }

  if (
    id.includes("/src/features/data/stop_categories/nature.ts") ||
    id.includes("/src/features/data/stop_categories/science.ts") ||
    id.includes("/src/features/data/stop_categories/animals.ts") ||
    id.includes("/src/features/data/stop_categories/colors.ts") ||
    id.includes("/src/features/data/stop_categories/fruits.ts") ||
    id.includes("/src/features/data/stop_categories/vegetables.ts") ||
    id.includes("/src/features/data/stop_categories/flora_and_geology.ts") ||
    id.includes("/src/features/data/stop_categories/philosophy.ts")
  ) {
    return "stop-game-nature";
  }

  if (
    id.includes("/src/features/data/stop_categories/media.ts") ||
    id.includes("/src/features/data/stop_categories/media_") ||
    id.includes("/src/features/data/stop_categories/academic.ts") ||
    id.includes("/src/features/data/stop_categories/academic_") ||
    id.includes("/src/features/data/stop_categories/specialized.ts") ||
    id.includes("/src/features/data/stop_categories/specialized_") ||
    id.includes("/src/features/data/stop_categories/technology.ts") ||
    id.includes("/src/features/data/stop_categories/vocabulary_challenge.ts")
  ) {
    return "stop-game-advanced";
  }

  return null;
};

const getTechDeckChunk = (id: string) => {
  const match = id.match(
    /\/src\/features\/data\/techDecks_chunks\/part(\d+)\.ts$/,
  );
  if (!match) {
    return null;
  }

  return `tech-decks-part${match[1]}`;
};

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
      setupFiles: "./src/setupTests.ts",
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
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = normalizeChunkId(id);

            if (normalizedId.includes("/node_modules/")) {
              return getVendorChunk(normalizedId);
            }

            const stopGameChunk = getStopGameChunk(normalizedId);
            if (stopGameChunk) {
              return stopGameChunk;
            }

            const techDeckChunk = getTechDeckChunk(normalizedId);
            if (techDeckChunk) {
              return techDeckChunk;
            }
          },
        },
      },
      chunkSizeWarningLimit: 1500,
    },
  };
});
