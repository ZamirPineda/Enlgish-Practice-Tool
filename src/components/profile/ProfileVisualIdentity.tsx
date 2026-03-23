import React from "react";
import AmbientOrbScene from "@/components/visual/AmbientOrbScene";
import InsightPanel from "@/components/visual/InsightPanel";

interface ProfileVisualIdentityProps {
  level: number;
  totalXp: number;
  rankTitle: string;
}

const ProfileVisualIdentity: React.FC<ProfileVisualIdentityProps> = ({
  level,
  totalXp,
  rankTitle,
}) => {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
      <AmbientOrbScene
        compact
        variant="violet"
        label="Profile Identity"
        title={`Level ${level} - ${rankTitle}`}
        description={`The profile should feel like a live identity surface, not just a settings form. Total XP: ${totalXp}.`}
      />
      <InsightPanel
        compact
        eyebrow="Profile Surface"
        title="Identity layer"
        description="A more editorial panel fits profile better: rank, progression, and presence without a forced character."
        showNarrative={false}
        accent="violet"
        motif="profile"
        topic="professional"
        statALabel="Level"
        statAValue={String(level)}
        statBLabel="XP"
        statBValue={`${totalXp} XP`}
      />
    </div>
  );
};

export default ProfileVisualIdentity;
