import { describe, expect, test } from "vitest";
import { defaultRoadmapIndex } from "@/lib/roadmapCatalog";
import {
  buildRoadmapNodeSessionHref,
  parseRoadmapSessionConfig,
} from "@/lib/roadmapLaunch";

describe("roadmapLaunch", () => {
  test("builds guided href preserving existing query params", () => {
    const node = defaultRoadmapIndex.nodesById.node_docs_recall;

    const href = buildRoadmapNodeSessionHref(node);
    const url = new URL(href, "https://example.test");

    expect(url.pathname).toBe("/docs");
    expect(url.searchParams.get("mode")).toBe("quiz");
    expect(url.searchParams.get("roadmap")).toBe("1");
    expect(url.searchParams.get("autostart")).toBe("1");
    expect(url.searchParams.get("roadmapNode")).toBe(node.id);
    expect(url.searchParams.get("gameId")).toBe(node.gameId);
    expect(url.searchParams.get("difficulty")).toBe("normal");
    expect(url.searchParams.get("routeObjective")).toBe(node.routeObjective);
    expect(url.searchParams.get("tags")).toContain("docs");
  });

  test("parses roadmap config using game id aliases for docs views", () => {
    const searchParams = new URLSearchParams({
      roadmap: "1",
      autostart: "1",
      roadmapNode: "node_docs_recall",
      gameId: "study_docs_quiz",
      difficulty: "normal",
      routeObjective: "dev_reasoning",
      tags: "docs,retrieval",
    });

    expect(
      parseRoadmapSessionConfig(searchParams, "study_docs_quiz"),
    ).toMatchObject({
      autostart: true,
      nodeId: "node_docs_recall",
      gameId: "study_docs_quiz",
      difficulty: "normal",
      routeObjective: "dev_reasoning",
      tags: ["docs", "retrieval"],
    });

    searchParams.set("gameId", "docs_quiz");

    expect(
      parseRoadmapSessionConfig(searchParams, "study_docs_quiz"),
    ).toMatchObject({
      gameId: "docs_quiz",
    });
  });
});
