import React from "react";
import { beforeEach, describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ParaphraseDuelView from "./ParaphraseDuelView";
import { paraphraseDuelRounds } from "../data/paraphraseDuel";
import {
  clearAnalyticsEventsForTesting,
  getAnalyticsEvents,
} from "../utils/analytics";

describe("ParaphraseDuelView", () => {
  beforeEach(() => {
    localStorage.clear();
    clearAnalyticsEventsForTesting();
  });

  test("renders title and default timer", () => {
    render(<ParaphraseDuelView />);

    expect(screen.getByText("Paraphrase Duel")).toBeInTheDocument();
    expect(screen.getByText(/⏱\s38s/)).toBeInTheDocument();
  });

  test("accepts a correct paraphrase", () => {
    render(<ParaphraseDuelView />);

    const b1Round = paraphraseDuelRounds.find((round) => round.level === "B1");
    expect(b1Round).toBeDefined();

    fireEvent.change(screen.getByLabelText("Paraphrase answer"), {
      target: { value: b1Round!.acceptedAnswers[0] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check paraphrase" }));

    expect(screen.getByText(/Correct paraphrase/)).toBeInTheDocument();
  });

  test("accepts a close variant with connector", () => {
    render(<ParaphraseDuelView />);

    fireEvent.change(screen.getByLabelText("Paraphrase answer"), {
      target: {
        value: "Although he felt nervous he gave a clear presentation",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check paraphrase" }));

    expect(screen.getByText(/Correct paraphrase/)).toBeInTheDocument();
  });

  test("tracks connector_missing analytics reason", () => {
    render(<ParaphraseDuelView />);

    fireEvent.change(screen.getByLabelText("Paraphrase answer"), {
      target: { value: "He gave a clear presentation despite feeling nervous" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check paraphrase" }));

    const events = getAnalyticsEvents();
    expect(events.at(-1)?.name).toBe("item_wrong");
    expect(events.at(-1)?.payload).toMatchObject({
      game: "paraphrase_duel",
      errorType: "connector_missing",
    });
  });
});
