import React from "react";
import type { FuseResultMatch } from "fuse.js";

interface HighlightedTextProps {
  text: string;
  indices?: readonly [number, number][]; // Fuse.js indices are inclusive [start, end]
  className?: string; // Optional styling wrapper
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  indices,
  className = "",
}) => {
  if (!indices || indices.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  // Fuse usually returns sorted, but just to be sure
  const sortedIndices = [...indices].sort((a, b) => a[0] - b[0]);

  sortedIndices.forEach(([start, end], i) => {
    // Fuse sometimes gives overlapping or backward indices if not careful, but usually it's [start, end] inclusive.
    if (start > lastIndex) {
      result.push(
        <span key={`text-${i}`}>
          {text.slice(Math.max(0, lastIndex), start)}
        </span>,
      );
    }
    const safeStart = Math.max(0, start);
    // end is inclusive in fuse.js
    const safeEnd = Math.min(text.length, end + 1);

    if (safeStart < safeEnd) {
      result.push(
        <mark
          key={`mark-${i}`}
          className="bg-yellow-400/40 text-inherit rounded-sm px-0.5 transition-colors"
        >
          {text.slice(safeStart, safeEnd)}
        </mark>,
      );
    }
    lastIndex = Math.max(lastIndex, safeEnd);
  });

  if (lastIndex < text.length) {
    result.push(<span key={`text-last`}>{text.slice(lastIndex)}</span>);
  }

  return <span className={className}>{result}</span>;
};

// Helper function to extract indices for a specific key
export function getMatchIndices(
  matches: readonly FuseResultMatch[] | undefined,
  key: string,
): [number, number][] {
  if (!matches) return [];
  const match = matches.find((m) => m.key === key);
  return match ? (match.indices as [number, number][]) : [];
}
