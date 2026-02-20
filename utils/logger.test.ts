import { beforeEach, describe, expect, test } from "vitest";
import {
  clearRecentLogsForTesting,
  createIssueReport,
  logError,
} from "./logger";

describe("logger issue report", () => {
  beforeEach(() => {
    clearRecentLogsForTesting();
  });

  test("includes only last 20 logs in report", () => {
    for (let i = 1; i <= 25; i += 1) {
      logError("test.log", `entry-${i}`);
    }

    const report = createIssueReport(new Error("boom"));
    const lines = report
      .split("\n")
      .filter((line) => line.includes("test.log entry-"));

    expect(lines).toHaveLength(20);
    expect(lines[0]).toContain("entry-6");
    expect(lines[19]).toContain("entry-25");
  });
});
