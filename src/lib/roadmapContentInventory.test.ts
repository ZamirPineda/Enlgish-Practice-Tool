import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";
import type { StudyDocsTreeNode } from "@/lib/contentInventoryAdapters";
import {
  getRoadmapContentInventoryIndex,
  getRoadmapInventoryCoverage,
  resetRoadmapContentInventoryCache,
} from "@/lib/roadmapContentInventory";

const studyDocsTree = JSON.parse(
  readFileSync(resolve(process.cwd(), "public/study-docs/index.json"), "utf8"),
) as StudyDocsTreeNode[];

describe("roadmapContentInventory", () => {
  test("indexes roadmap inventory across all supported roadmap games", () => {
    resetRoadmapContentInventoryCache();
    const index = getRoadmapContentInventoryIndex({ studyDocsTree });

    expect(index.byGame.speed_builder?.length).toBeGreaterThan(0);
    expect(index.byGame.error_hunter?.length).toBeGreaterThan(0);
    expect(index.byGame.paraphrase_duel?.length).toBeGreaterThan(0);
    expect(index.byGame.sentence_transformer?.length).toBeGreaterThan(0);
    expect(index.byGame.math_game?.length).toBeGreaterThan(0);
    expect(index.byGame.code_syntax_builder?.length).toBeGreaterThan(0);
    expect(index.byGame.code_bug_hunter?.length).toBeGreaterThan(0);
    expect(index.byGame.study_docs_quiz?.length).toBeGreaterThan(0);
    expect(index.byGame.study_docs_game?.length).toBeGreaterThan(0);
  });

  test("finds at least one content match for every default roadmap node", () => {
    resetRoadmapContentInventoryCache();
    const index = getRoadmapContentInventoryIndex({ studyDocsTree });
    const coverage = getRoadmapInventoryCoverage({ index });

    expect(coverage.totalNodes).toBeGreaterThan(0);
    expect(coverage.coveredNodes).toBe(coverage.totalNodes);
    expect(coverage.uncoveredNodeIds).toEqual([]);
    expect(
      coverage.nodes.every((nodeCoverage) => nodeCoverage.matchedCount > 0),
    ).toBe(true);
  });

  test("keeps broad coverage for every default roadmap node", () => {
    resetRoadmapContentInventoryCache();
    const index = getRoadmapContentInventoryIndex({ studyDocsTree });
    const coverage = getRoadmapInventoryCoverage({ index });
    const underCoveredNodes = coverage.nodes
      .filter((nodeCoverage) => nodeCoverage.matchedCount < 3)
      .map((nodeCoverage) => ({
        nodeId: nodeCoverage.nodeId,
        matchedCount: nodeCoverage.matchedCount,
        strictMatchedCount: nodeCoverage.strictMatchedCount,
        fallbackMatchedCount: nodeCoverage.fallbackMatchedCount,
        usedFallback: nodeCoverage.usedFallback,
        gameId: nodeCoverage.gameId,
      }));

    const strictCoverageTargets = [
      "node_interview_opener",
      "node_story_frame_builder",
      "node_story_rephrase_variants",
      "node_panel_rephrase_tradeoffs",
      "node_transform_followups",
      "node_arithmetic_burst",
      "node_equation_speed_check",
      "node_fraction_timing_drill",
      "node_mixed_sprint_checkpoint",
      "node_algebra_recall_chain",
      "node_bug_scan",
      "node_docs_recall",
      "node_lookup_under_pressure",
      "node_docs_platform_quiz",
    ];
    const strictCoverageByNode = new Map(
      coverage.nodes.map((nodeCoverage) => [nodeCoverage.nodeId, nodeCoverage]),
    );

    expect(underCoveredNodes).toEqual([]);
    strictCoverageTargets.forEach((nodeId) => {
      expect(
        strictCoverageByNode.get(nodeId)?.strictMatchedCount,
      ).toBeGreaterThanOrEqual(3);
    });
  });
});
