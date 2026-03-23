import React from "react";
import { motion } from "framer-motion";
import { Flame, Sparkles, Trophy } from "lucide-react";
import AmbientOrbScene from "@/components/visual/AmbientOrbScene";

interface StopStreakCelebrationProps {
  streak: number;
  score: number;
}

const StopStreakCelebration: React.FC<StopStreakCelebrationProps> = ({
  streak,
  score,
}) => {
  const multiplier = streak >= 5 ? 3 : streak >= 3 ? 2 : 1;

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(14rem,0.8fr)]">
      <div className="relative overflow-hidden rounded-[1.75rem]">
        <AmbientOrbScene
          compact
          variant="violet"
          label="Streak Burst"
          title={`${streak} streak`}
          description="Momentum is high. The round surface now shifts into a short celebration state."
          intensity={1}
          energy={1}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
          animate={{ opacity: [0.25, 0.72, 0.25] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 36px rgba(168,85,247,0.35), 0 0 72px rgba(244,114,182,0.22)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative overflow-hidden rounded-[1.75rem] border border-violet-500/30 bg-[linear-gradient(180deg,rgba(76,29,149,0.78),rgba(15,23,42,0.96))] p-4 backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_48%)]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-violet-50">
            <Sparkles className="h-3.5 w-3.5" />
            Momentum Spike
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-full border border-white/10 bg-black/15 p-2 text-fuchsia-300">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/45">
                Streak Tier
              </div>
              <div className="mt-1 text-2xl font-black text-white">
                {multiplier}x combo
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-white/10 bg-black/15 p-3">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                Streak
              </div>
              <div className="mt-1 text-sm font-bold text-white">
                {streak} correct
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/15 p-3">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                Score
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm font-bold text-fuchsia-300">
                <Trophy className="h-4 w-4" />
                {score}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StopStreakCelebration;
