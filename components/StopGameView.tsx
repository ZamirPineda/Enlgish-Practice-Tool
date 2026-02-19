import React from "react";
import StopGameBrowse from "./StopGameBrowse";
import Card from "./ui/Card";

interface StopGameViewProps {
  onPlayWord: (word: string) => void;
  isWordAudioLoading: string | null;
  onAddToVault: (word: string, definition: string) => void;
}

const StopGameView: React.FC<StopGameViewProps> = ({
  onPlayWord,
  isWordAudioLoading,
  onAddToVault,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900">
      <div className="flex-shrink-0 bg-slate-900 border-b border-slate-700/50 p-4 text-center">
        <Card className="mx-auto max-w-2xl py-4 px-6">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            STOP Game Library
          </h2>
        </Card>
      </div>
      <StopGameBrowse
        onPlayWord={onPlayWord}
        isWordAudioLoading={isWordAudioLoading}
        onAddToVault={onAddToVault}
      />
    </div>
  );
};

export default StopGameView;
