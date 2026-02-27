// @vitest-environment node
import { describe, expect, it } from "vitest";
import viteConfig from "./vite.config";

function resolveBase(env: Record<string, string | undefined>) {
  const previousRepository = process.env.GITHUB_REPOSITORY;
  const previousActions = process.env.GITHUB_ACTIONS;
  const previousBasePath = process.env.VITE_BASE_PATH;

  if (env.GITHUB_REPOSITORY === undefined) {
    delete process.env.GITHUB_REPOSITORY;
  } else {
    process.env.GITHUB_REPOSITORY = env.GITHUB_REPOSITORY;
  }
  if (env.GITHUB_ACTIONS === undefined) {
    delete process.env.GITHUB_ACTIONS;
  } else {
    process.env.GITHUB_ACTIONS = env.GITHUB_ACTIONS;
  }
  if (env.VITE_BASE_PATH === undefined) {
    delete process.env.VITE_BASE_PATH;
  } else {
    process.env.VITE_BASE_PATH = env.VITE_BASE_PATH;
  }

  if (typeof viteConfig !== "function") {
    throw new Error("Expected viteConfig export to be a config function");
  }

  const resolved = viteConfig({ mode: "development", command: "serve" }).base;

  if (previousRepository === undefined) {
    delete process.env.GITHUB_REPOSITORY;
  } else {
    process.env.GITHUB_REPOSITORY = previousRepository;
  }
  if (previousActions === undefined) {
    delete process.env.GITHUB_ACTIONS;
  } else {
    process.env.GITHUB_ACTIONS = previousActions;
  }
  if (previousBasePath === undefined) {
    delete process.env.VITE_BASE_PATH;
  } else {
    process.env.VITE_BASE_PATH = previousBasePath;
  }

  return resolved;
}

function resolveManualChunk(id: string) {
  if (typeof viteConfig !== "function") {
    throw new Error("Expected viteConfig export to be a config function");
  }

  const resolved = viteConfig({ mode: "production", command: "build" });
  return resolved.build?.rollupOptions?.output?.manualChunks?.(id);
}

describe("vite base path", () => {
  it("defaults to root path outside GitHub Actions", () => {
    expect(
      resolveBase({
        GITHUB_REPOSITORY: undefined,
        GITHUB_ACTIONS: undefined,
        VITE_BASE_PATH: undefined,
      }),
    ).toBe("/");
  });

  it("uses repository path during GitHub Actions builds", () => {
    expect(
      resolveBase({
        GITHUB_REPOSITORY: "ZamirPineda/Enlgish-Practice-Tool",
        GITHUB_ACTIONS: "true",
        VITE_BASE_PATH: undefined,
      }),
    ).toBe("/Enlgish-Practice-Tool/");
  });

  it("keeps React ecosystem packages in the same vendor chunk", () => {
    expect(resolveManualChunk("/node_modules/react/index.js")).toBe("vendor");
    expect(resolveManualChunk("/node_modules/react-dom/index.js")).toBe(
      "vendor",
    );
    expect(resolveManualChunk("/node_modules/react-router-dom/index.js")).toBe(
      "vendor",
    );
  });
});
