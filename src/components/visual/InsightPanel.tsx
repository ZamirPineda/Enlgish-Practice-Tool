import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Activity,
  BookOpen,
  Layers3,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { StopVisualTopic } from "@/lib/stopVisualThemes";

type Accent = "amber" | "emerald" | "violet" | "sky";
type Motif = "browse" | "study" | "game" | "profile";

interface InsightPanelProps {
  eyebrow: string;
  title: string;
  description: string;
  showNarrative?: boolean;
  accent?: Accent;
  compact?: boolean;
  motif?: Motif;
  topic?: StopVisualTopic;
  statALabel?: string;
  statAValue?: string;
  statBLabel?: string;
  statBValue?: string;
  intensity?: number;
  energy?: number;
}

const ACCENTS = {
  amber: {
    shell:
      "border-amber-500/20 bg-[linear-gradient(180deg,rgba(120,53,15,0.96),rgba(41,37,36,0.98))]",
    chip: "border-amber-300/25 bg-amber-300/10 text-amber-50",
    text: "text-orange-50/80",
    line: "#f59e0b",
    glow: "rgba(251,191,36,0.35)",
  },
  emerald: {
    shell:
      "border-emerald-500/20 bg-[linear-gradient(180deg,rgba(6,78,59,0.96),rgba(15,23,42,0.98))]",
    chip: "border-emerald-300/25 bg-emerald-300/10 text-emerald-50",
    text: "text-emerald-50/80",
    line: "#34d399",
    glow: "rgba(52,211,153,0.35)",
  },
  violet: {
    shell:
      "border-violet-500/20 bg-[linear-gradient(180deg,rgba(59,7,100,0.96),rgba(15,23,42,0.98))]",
    chip: "border-violet-300/25 bg-violet-300/10 text-violet-50",
    text: "text-violet-50/80",
    line: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
  },
  sky: {
    shell:
      "border-sky-500/20 bg-[linear-gradient(180deg,rgba(12,74,110,0.96),rgba(15,23,42,0.98))]",
    chip: "border-sky-300/25 bg-sky-300/10 text-sky-50",
    text: "text-sky-50/80",
    line: "#38bdf8",
    glow: "rgba(56,189,248,0.35)",
  },
} as const;

const MOTIFS = {
  browse: {
    icon: Layers3,
    statA: "Catalog",
    statB: "Scan",
    path: "M18 82 C42 68 58 38 92 44 C124 50 138 88 170 82 C206 76 220 30 250 28 C268 28 280 34 284 40",
    columns: [70, 46, 82, 60, 90],
  },
  study: {
    icon: BookOpen,
    statA: "Focus",
    statB: "Recall",
    path: "M18 90 C36 90 50 52 82 52 C114 52 130 88 162 88 C198 88 212 40 242 40 C260 40 274 48 284 56",
    columns: [38, 76, 56, 84, 64],
  },
  game: {
    icon: Radar,
    statA: "Tempo",
    statB: "Streak",
    path: "M18 94 C48 68 62 28 98 28 C136 28 138 94 180 94 C218 94 232 38 260 38 C272 38 280 42 284 48",
    columns: [86, 52, 74, 68, 92],
  },
  profile: {
    icon: ShieldCheck,
    statA: "Rank",
    statB: "Progress",
    path: "M18 78 C42 60 64 48 92 48 C126 48 146 80 178 80 C214 80 232 42 258 42 C270 42 278 46 284 52",
    columns: [62, 82, 58, 76, 70],
  },
} as const;

const TOPIC_PATHS: Record<StopVisualTopic, string> = {
  geo: "M18 86 C40 64 62 34 98 34 C138 34 146 90 184 90 C218 90 232 44 260 36 C272 34 280 36 284 40",
  language:
    "M18 82 C40 82 58 44 88 44 C120 44 138 84 170 84 C206 84 224 36 252 36 C268 36 278 42 284 48",
  professional:
    "M18 94 C44 72 60 28 98 28 C136 28 152 72 184 72 C218 72 230 44 260 44 C272 44 280 48 284 54",
  nature:
    "M18 92 C40 68 54 52 84 52 C114 52 130 78 160 78 C194 78 220 30 252 30 C268 30 278 38 284 46",
  daily:
    "M18 88 C40 88 56 62 86 62 C118 62 136 92 168 92 C202 92 214 54 246 54 C266 54 278 58 284 62",
  culture:
    "M18 78 C40 56 62 40 96 40 C128 40 142 70 174 70 C208 70 222 34 254 34 C268 34 278 38 284 44",
  challenge:
    "M18 98 C44 74 58 22 100 22 C142 22 154 96 194 96 C228 96 240 38 264 38 C274 38 280 40 284 44",
};

const TOPIC_COLUMNS: Record<StopVisualTopic, number[]> = {
  geo: [80, 54, 88, 60, 92],
  language: [46, 76, 58, 84, 64],
  professional: [68, 74, 62, 86, 78],
  nature: [42, 70, 56, 82, 66],
  daily: [58, 64, 52, 72, 60],
  culture: [66, 52, 78, 58, 74],
  challenge: [90, 40, 84, 48, 96],
};

const InsightPanel: React.FC<InsightPanelProps> = ({
  eyebrow,
  title,
  description,
  showNarrative = true,
  accent = "sky",
  compact = false,
  motif = "browse",
  topic,
  statALabel,
  statAValue,
  statBLabel,
  statBValue,
  intensity = 0.3,
  energy = 0.25,
}) => {
  const palette = ACCENTS[accent];
  const visual = MOTIFS[motif];
  const Icon = visual.icon;
  const activePath = topic ? TOPIC_PATHS[topic] : visual.path;
  const activeColumns = topic ? TOPIC_COLUMNS[topic] : visual.columns;
  const clampedIntensity = Math.max(0, Math.min(1, intensity));
  const clampedEnergy = Math.max(0, Math.min(1, energy));
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(pointerY, [-1, 1], [compact ? 4 : 6, compact ? -4 : -6]),
    {
      stiffness: 150,
      damping: 20,
      mass: 0.45,
    },
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-1, 1], [compact ? -4 : -6, compact ? 4 : 6]),
    {
      stiffness: 150,
      damping: 20,
      mass: 0.45,
    },
  );
  const chartX = useSpring(
    useTransform(pointerX, [-1, 1], [compact ? -8 : -12, compact ? 8 : 12]),
    {
      stiffness: 120,
      damping: 22,
      mass: 0.5,
    },
  );
  const chartY = useSpring(
    useTransform(pointerY, [-1, 1], [compact ? -6 : -10, compact ? 6 : 10]),
    {
      stiffness: 120,
      damping: 22,
      mass: 0.5,
    },
  );
  const spotlightX = useTransform(pointerX, [-1, 1], ["20%", "80%"]);
  const spotlightY = useTransform(pointerY, [-1, 1], ["18%", "72%"]);

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (
    event,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(x);
    pointerY.set(y);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden rounded-[2rem] border ${palette.shell} ${compact ? "h-44 p-4" : "h-64 p-5"}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_40%,rgba(255,255,255,0.02))]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(circle at ${x} ${y}, ${palette.glow}, transparent 42%)`,
          ),
          opacity: 0.65 + clampedIntensity * 0.2 + clampedEnergy * 0.15,
        }}
      />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] ${palette.chip}`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
        <motion.div
          animate={{
            rotate: [0, 6 + clampedEnergy * 3, 0],
            opacity: [0.72, 1, 0.72],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.8 - clampedEnergy * 0.8,
            ease: "easeInOut",
          }}
          className="text-white/70"
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 top-14 px-4">
        <motion.div
          className="rounded-[1.6rem] border border-white/10 bg-black/15 p-4 backdrop-blur-sm"
          style={{ x: chartX, y: chartY }}
        >
          <motion.svg
            viewBox="0 0 300 120"
            className={`${compact ? "h-20" : "h-28"} w-full`}
            aria-hidden="true"
            style={{
              x: useTransform(
                pointerX,
                [-1, 1],
                [compact ? -4 : -6, compact ? 4 : 6],
              ),
            }}
          >
            <defs>
              <linearGradient
                id={`line-${accent}-${motif}`}
                x1="0%"
                x2="100%"
                y1="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor={palette.line} stopOpacity="0.12" />
                <stop offset="50%" stopColor={palette.line} stopOpacity="1" />
                <stop
                  offset="100%"
                  stopColor={palette.line}
                  stopOpacity="0.18"
                />
              </linearGradient>
            </defs>
            <path
              d={activePath}
              fill="none"
              stroke={`url(#line-${accent}-${motif})`}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <motion.circle
              cx="92"
              cy={motif === "game" ? "28" : motif === "study" ? "52" : "48"}
              r="6"
              fill={palette.line}
              animate={{
                r: [6, 9 + clampedEnergy * 3, 6],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.4 - clampedIntensity * 0.5,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="178"
              cy={motif === "browse" ? "82" : motif === "profile" ? "80" : "88"}
              r="6"
              fill={palette.line}
              animate={{
                r: [6, 8 + clampedEnergy * 2.5, 6],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.1 - clampedIntensity * 0.35,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
            {activeColumns.map((height, index) => (
              <motion.rect
                key={index}
                x={20 + index * 22}
                y={110 - height}
                width="12"
                height={height}
                rx="6"
                fill={palette.line}
                opacity={0.18 + index * 0.12}
                animate={{
                  y: [
                    110 - height,
                    108 - height - clampedEnergy * (index % 2 === 0 ? 5 : 3),
                    110 - height,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + index * 0.18 - clampedIntensity * 0.4,
                  ease: "easeInOut",
                  delay: index * 0.08,
                }}
              />
            ))}
          </motion.svg>

          <motion.div
            className="mt-3 grid grid-cols-2 gap-2"
            style={{
              x: useTransform(
                pointerX,
                [-1, 1],
                [compact ? -3 : -4, compact ? 3 : 4],
              ),
            }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
                {statALabel ?? visual.statA}
              </div>
              <div className="mt-1 flex items-center gap-2 text-white">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-black">
                  {statAValue ?? "Live surface"}
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
                {statBLabel ?? visual.statB}
              </div>
              <div className="mt-1 text-sm font-black text-white">
                {statBValue ?? "Intentional UI"}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {showNarrative ? (
        <motion.div
          className="absolute inset-x-0 bottom-0 p-4"
          style={{
            x: useTransform(
              pointerX,
              [-1, 1],
              [compact ? -4 : -6, compact ? 4 : 6],
            ),
            y: useTransform(
              pointerY,
              [-1, 1],
              [compact ? -3 : -5, compact ? 3 : 5],
            ),
          }}
        >
          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
            <div className="text-lg font-black text-white">{title}</div>
            <p className={`mt-2 text-sm leading-6 ${palette.text}`}>
              {description}
            </p>
          </div>
        </motion.div>
      ) : null}
      <div
        className="pointer-events-none absolute right-[-3rem] top-10 h-32 w-32 rounded-full blur-3xl"
        style={{ backgroundColor: palette.glow }}
      />
    </motion.div>
  );
};

export default InsightPanel;
