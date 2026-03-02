import React from "react";

export interface AnimeCharacterState {
  hairBackType: string;
  headType: string;
  clothesType: string;
  eyesType: string;
  mouthType: string;
  hairFrontType: string;
  backgroundColor: string;
  hairColor: string;
  skinColor: string;
  clothesColor: string;
  eyeColor: string;
}

// Import all SVG layered dictionaries
import { HeadOptions } from "./avatar-assets/Head";
import { ClothesOptions } from "./avatar-assets/Clothes";
import { MouthOptions } from "./avatar-assets/Mouth";
import { EyesOptions } from "./avatar-assets/Eyes";
import { BackHairOptions, FrontHairOptions } from "./avatar-assets/Hair";

interface AnimeAvatarProps {
  config: AnimeCharacterState;
  className?: string;
  animate?: boolean;
}

export const AnimeAvatarRenderer: React.FC<AnimeAvatarProps> = ({
  config,
  className = "w-48 h-48",
  animate = true,
}) => {
  // Grab the components dynamically safely
  const BackHairLayer =
    BackHairOptions[config.hairBackType] || BackHairOptions["none"];
  const HeadBaseLayer =
    HeadOptions[config.headType] || HeadOptions["base-round"];
  const ClothesLayer =
    ClothesOptions[config.clothesType] || ClothesOptions["shirt-crew"];
  const EyesLayer = EyesOptions[config.eyesType] || EyesOptions["eyes-happy"];
  const MouthLayer =
    MouthOptions[config.mouthType] || MouthOptions["mouth-smile"];
  const FrontHairLayer =
    FrontHairOptions[config.hairFrontType] || FrontHairOptions["none"];

  return (
    <div
      className={`relative overflow-hidden rounded-full flex items-center justify-center ${className}`}
      style={{
        backgroundColor:
          config.backgroundColor === "transparent"
            ? "var(--color-surface-2)"
            : config.backgroundColor,
      }}
    >
      <svg
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full pt-8 ${animate ? "animate-bounce-slow" : ""}`}
      >
        {/* Layer 1: Back Hair (rendered behind the body) */}
        <BackHairLayer hairColor={config.hairColor} />

        {/* Layer 2: Head & Body Base */}
        <HeadBaseLayer skinColor={config.skinColor} />

        {/* Layer 3: Clothes */}
        <ClothesLayer clothesColor={config.clothesColor} />

        {/* Layer 4: Facial Features (Eyes & Mouth) */}
        <EyesLayer eyeColor={config.eyeColor} />
        <MouthLayer />

        {/* Layer 5: Front Hair (Bangs, rendered over the eyes and face) */}
        <FrontHairLayer hairColor={config.hairColor} />
      </svg>
    </div>
  );
};
