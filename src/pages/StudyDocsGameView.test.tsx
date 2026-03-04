import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StudyDocsGameView from "@/pages/StudyDocsGameView";

describe("StudyDocsGameView", () => {
  test("renders start panel when file tree is available", () => {
    render(
      <StudyDocsGameView
        fileTree={[
          {
            name: "Category",
            path: "Category",
            type: "directory",
            children: [
              {
                name: "doc1.html",
                path: "Category/doc1.html",
                type: "file",
              },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByText("Doc Hunt")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Iniciar juego" }),
    ).toBeInTheDocument();
  });
});
