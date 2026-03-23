import React from "react";
import { GroupName } from "@/lib/stopGameHelpers";
import AmbientOrbScene from "@/components/visual/AmbientOrbScene";
import InsightPanel from "@/components/visual/InsightPanel";
import { getStopVisualThemeFromGroup } from "@/lib/stopVisualThemes";

interface StopModeShowcaseProps {
  viewMode: "browse" | "study" | "game";
  selectedLetter?: string;
  selectedGroup: GroupName;
  wordCount: number;
  visibleCategoryCount: number;
  studyRevealAll?: boolean;
  studyAutoPlay?: boolean;
  isShuffled?: boolean;
}

const MODE_COPY = {
  browse: {
    eyebrow: "Stop Browse",
    title: "Explore vocabulary with more visual depth",
    description:
      "Browse works best with a calm but expressive surface that frames the active letter, group, and catalog density.",
    panelTitle: "Browse surface",
    panelDescription:
      "This reads better as a structured visual layer: discovery, scanability, and category context without decorative clutter.",
  },
  study: {
    eyebrow: "Stop Study",
    title: "Study mode with better visual rhythm",
    description:
      "Study benefits from softer motion and clearer structure so repetition feels intentional instead of flat.",
    panelTitle: "Study surface",
    panelDescription:
      "A sober panel works better here than a mascot: focus, recall, and progression without breaking concentration.",
  },
  game: {
    eyebrow: "Stop Game",
    title: "Fast play with more presence",
    description:
      "Game mode should reserve stronger motion for momentum, pressure, and round feedback while keeping the answer flow clear.",
    panelTitle: "Game surface",
    panelDescription:
      "This area now reads as tactical feedback rather than a detached demo panel.",
  },
} as const;

const StopModeShowcase: React.FC<StopModeShowcaseProps> = ({
  viewMode,
  selectedLetter,
  selectedGroup,
  wordCount,
  visibleCategoryCount,
  studyRevealAll = false,
  studyAutoPlay = false,
  isShuffled = false,
}) => {
  const config = MODE_COPY[viewMode];
  const theme = getStopVisualThemeFromGroup(selectedGroup);
  const catalogDensity = Math.max(0, Math.min(1, wordCount / 120));
  const categorySpread = Math.max(0, Math.min(1, visibleCategoryCount / 8));
  const showcaseIntensity =
    viewMode === "study"
      ? Math.min(
          1,
          0.28 +
            categorySpread * 0.18 +
            (studyRevealAll ? 0.24 : 0.08) +
            (studyAutoPlay ? 0.12 : 0) +
            (isShuffled ? 0.1 : 0),
        )
      : 0.2 + catalogDensity * 0.24;
  const showcaseEnergy =
    viewMode === "study"
      ? Math.min(
          1,
          0.18 +
            categorySpread * 0.16 +
            (studyAutoPlay ? 0.22 : 0.06) +
            (isShuffled ? 0.14 : 0),
        )
      : 0.14 + categorySpread * 0.18;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.85fr)]">
      <AmbientOrbScene
        variant={theme.scene}
        label={config.eyebrow}
        title={`${config.title}${selectedLetter ? ` - ${selectedLetter}` : ""}`}
        description={`${config.description} ${wordCount} words available across ${visibleCategoryCount} visible categories for ${selectedGroup}.`}
        intensity={showcaseIntensity}
        energy={showcaseEnergy}
      />
      <InsightPanel
        eyebrow={config.eyebrow}
        title={config.panelTitle}
        description={config.panelDescription}
        showNarrative={viewMode === "game"}
        accent={theme.accent}
        motif={viewMode}
        topic={theme.topic}
        statALabel={viewMode === "browse" ? "Catalog" : "Focus"}
        statAValue={
          viewMode === "browse"
            ? `${wordCount} words`
            : `${visibleCategoryCount} tracks`
        }
        statBLabel={viewMode === "browse" ? "Scope" : "Group"}
        statBValue={selectedGroup}
        intensity={showcaseIntensity}
        energy={showcaseEnergy}
      />
    </div>
  );
};

export default StopModeShowcase;
