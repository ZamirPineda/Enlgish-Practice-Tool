import React from "react";
import StopGameBrowse from "./StopGameBrowse";
import Card from "./ui/Card";

interface StopGameViewProps {
  onPlayWord: (word: string) => void;
  isWordAudioLoading: string | null;
  ttsAutoPlay: boolean;
  onAddToVault: (word: string, definition: string) => void;
}

const StopGameView: React.FC<StopGameViewProps> = ({
  onPlayWord,
  isWordAudioLoading,
  ttsAutoPlay,
  onAddToVault,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      <StopGameBrowse
        onPlayWord={onPlayWord}
        isWordAudioLoading={isWordAudioLoading}
        ttsAutoPlay={ttsAutoPlay}
        onAddToVault={onAddToVault}
      />
    </div>
  );
};

export default StopGameView;
