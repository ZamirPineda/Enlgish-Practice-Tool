import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Compass,
  Dumbbell,
  Feather,
  Palette,
  Sparkles,
  TimerReset,
  Trophy,
  XCircle,
} from "lucide-react";
import AmbientOrbScene from "@/components/visual/AmbientOrbScene";
import { StopCategory, StopItem } from "@/types";
import { getStopVisualThemeFromCategory } from "@/lib/stopVisualThemes";

interface StopFeedbackStageProps {
  feedbackType: "success" | "error" | "info";
  category: StopCategory | "";
  item?: StopItem | null;
  isTimeout?: boolean;
  isSkip?: boolean;
}

interface FeedbackCategoryProfile {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  descriptor: string;
  detailLabel: string;
  detailValue: string;
}

const FEEDBACK_THEME = {
  success: {
    scene: "emerald" as const,
    eyebrow: "Round Success",
    title: "Correct answer locked",
    description:
      "The round lands with a stronger visual confirmation before moving on.",
    icon: CheckCircle2,
    shell:
      "border-emerald-500/30 bg-[linear-gradient(180deg,rgba(6,78,59,0.72),rgba(4,18,20,0.94))]",
    badge: "border-emerald-300/25 bg-emerald-300/10 text-emerald-50",
    accent: "text-emerald-300",
    pulse: "rgba(52,211,153,0.28)",
  },
  error: {
    scene: "sunset" as const,
    eyebrow: "Round Miss",
    title: "Answer window closed",
    description:
      "The surface now marks misses and corrections with more weight.",
    icon: XCircle,
    shell:
      "border-amber-500/30 bg-[linear-gradient(180deg,rgba(120,53,15,0.72),rgba(28,12,10,0.94))]",
    badge: "border-amber-300/25 bg-amber-300/10 text-amber-50",
    accent: "text-amber-300",
    pulse: "rgba(251,191,36,0.28)",
  },
  info: {
    scene: "sky" as const,
    eyebrow: "Round Update",
    title: "Round update",
    description:
      "A neutral state keeps the round readable without flattening it.",
    icon: TimerReset,
    shell:
      "border-sky-500/30 bg-[linear-gradient(180deg,rgba(12,74,110,0.72),rgba(15,23,42,0.94))]",
    badge: "border-sky-300/25 bg-sky-300/10 text-sky-50",
    accent: "text-sky-300",
    pulse: "rgba(56,189,248,0.28)",
  },
} as const;

const getFeedbackCategoryProfile = (
  category: StopCategory | "",
  item?: StopItem | null,
): FeedbackCategoryProfile => {
  if (
    category === "Countries" ||
    category === "Capitals" ||
    category === "World Landmarks"
  ) {
    return {
      icon: Compass,
      eyebrow: "Geography Pulse",
      descriptor: "Cartographic recall",
      detailLabel: "Region",
      detailValue: item?.country || category || "World",
    };
  }

  if (category === "Colors") {
    return {
      icon: Palette,
      eyebrow: "Color Pulse",
      descriptor: "Visual recall",
      detailLabel: "Shade",
      detailValue: item?.hex || item?.translation || "Color family",
    };
  }

  if (category === "Animals") {
    return {
      icon: Feather,
      eyebrow: "Nature Pulse",
      descriptor: "Wildlife recall",
      detailLabel: "Habitat",
      detailValue: item?.tag || "Animal profile",
    };
  }

  if (category === "Sports") {
    return {
      icon: Trophy,
      eyebrow: "Sport Pulse",
      descriptor: "Competitive recall",
      detailLabel: "Mode",
      detailValue: item?.tag || "Active play",
    };
  }

  if (
    category === "Body Parts" ||
    category === "Clothing" ||
    category === "Occupations" ||
    category === "Tools" ||
    category === "Household Items"
  ) {
    return {
      icon: Dumbbell,
      eyebrow: "Daily Pulse",
      descriptor: "Applied recall",
      detailLabel: "Focus",
      detailValue:
        item?.toolType ||
        item?.clothingType ||
        item?.roomType ||
        item?.location ||
        "Daily language",
    };
  }

  return {
    icon: Sparkles,
    eyebrow: "Category Pulse",
    descriptor: "Round recall",
    detailLabel: "Focus",
    detailValue: item?.tag || category || "Open set",
  };
};

const StopFeedbackStage: React.FC<StopFeedbackStageProps> = ({
  feedbackType,
  category,
  item,
  isTimeout = false,
  isSkip = false,
}) => {
  const theme = FEEDBACK_THEME[feedbackType];
  const baseTheme = getStopVisualThemeFromCategory(category);
  const profile = getFeedbackCategoryProfile(category, item);
  const Icon = theme.icon;
  const CategoryIcon = profile.icon;
  const stateLabel = isTimeout
    ? "Timeout"
    : isSkip
      ? "Skipped"
      : feedbackType === "success"
        ? "Accepted"
        : "Missed";
  const answerLabel = item?.word || "No answer";
  const stageScene =
    feedbackType === "success"
      ? baseTheme.scene
      : feedbackType === "error"
        ? "sunset"
        : baseTheme.scene;
  const stageIntensity =
    feedbackType === "success" ? 0.9 : feedbackType === "error" ? 0.82 : 0.68;
  const stageEnergy =
    feedbackType === "success" ? 0.92 : feedbackType === "error" ? 0.55 : 0.48;

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(15rem,0.85fr)]">
      <div className="relative overflow-hidden rounded-[1.75rem]">
        <AmbientOrbScene
          compact
          variant={stageScene}
          label={profile.eyebrow}
          title={answerLabel}
          description={`${profile.descriptor}. ${theme.description}`}
          intensity={stageIntensity}
          energy={stageEnergy}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          style={{
            boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.02), 0 0 42px ${theme.pulse}`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-[1.75rem] border p-4 backdrop-blur-xl ${theme.shell}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_48%)]" />
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] ${theme.badge}`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {profile.eyebrow}
            </div>
            <div
              className={`rounded-full border border-white/10 bg-black/15 p-2 ${theme.accent}`}
            >
              <Icon className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/45">
              {stateLabel}
            </div>
            <div className="mt-2 text-2xl font-black text-white">
              {theme.title}
            </div>
            <p className="mt-2 text-sm leading-6 text-white/72">
              {category || "Open round"}
              {item ? ` - ${item.word}` : ""}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
              <CategoryIcon className="h-3.5 w-3.5" />
              {profile.descriptor}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-white/10 bg-black/15 p-3">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                Category
              </div>
              <div className="mt-1 text-sm font-bold text-white">
                {category || "Open"}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/15 p-3">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                {profile.detailLabel}
              </div>
              <div className={`mt-1 text-sm font-bold ${theme.accent}`}>
                {profile.detailValue}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StopFeedbackStage;
