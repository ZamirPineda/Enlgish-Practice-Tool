import React, { useMemo } from "react";
import { UserCharacter } from "@/lib/userProfileStore";

interface AvatarProps {
  character: UserCharacter;
  className?: string;
  animate?: boolean; // We can apply a floating animation
}

export const AvatarRenderer: React.FC<AvatarProps> = ({
  character,
  className = "w-24 h-24",
  animate = true,
}) => {
  // Use DiceBear API directly through image tag (free, fast, beautiful)
  const avatarUrl = useMemo(() => {
    const baseUrl = `https://api.dicebear.com/9.x/${character.avatarStyle}/svg`;

    // Add parameters like seed
    const params = new URLSearchParams();
    params.append("seed", character.seed);

    // Different styles have different customization params but mostly seed handles the global look
    if (
      character.backgroundColor &&
      character.backgroundColor !== "transparent"
    ) {
      params.append(
        "backgroundColor",
        character.backgroundColor.replace("#", ""),
      );
    }

    return `${baseUrl}?${params.toString()}`;
  }, [character]);

  return (
    <div
      className={`relative overflow-hidden rounded-full ${character.backgroundColor === "transparent" ? "bg-slate-200 dark:bg-slate-700" : ""} ${className} flex items-center justify-center`}
    >
      <img
        src={avatarUrl}
        alt={`${character.name}'s Avatar`}
        className={`w-[90%] h-[90%] object-contain ${animate ? "animate-bounce-slow" : ""} drop-shadow-xl`}
        loading="lazy"
      />
    </div>
  );
};
