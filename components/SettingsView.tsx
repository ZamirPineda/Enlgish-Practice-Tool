import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import Card from "./ui/Card";
import { AppSettings } from "../utils/settingsStore";

interface SettingsViewProps {
  settings: AppSettings;
  onSettingsChange: (updates: Partial<AppSettings>) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
      <div className="max-w-3xl mx-auto space-y-4">
        <Card className="p-5 sm:p-6 bg-surface-1">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">
            Settings
          </h2>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="theme-select"
                className="block text-sm font-bold mb-2 text-text-secondary"
              >
                Theme
              </label>
              <select
                id="theme-select"
                className="w-full rounded-lg border px-3 py-2 bg-surface-1 border-border text-text-primary"
                value={settings.theme}
                onChange={(event) =>
                  onSettingsChange({
                    theme: event.target.value as AppSettings["theme"],
                  })
                }
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <ToggleSwitch
              label="Reduced motion"
              checked={settings.reducedMotion}
              onChange={(checked) =>
                onSettingsChange({ reducedMotion: checked })
              }
            />
            <ToggleSwitch
              label="TTS auto-play"
              checked={settings.ttsAutoPlay}
              onChange={(checked) => onSettingsChange({ ttsAutoPlay: checked })}
            />
            <ToggleSwitch
              label="Confirm dialogs"
              checked={settings.confirmDialogs}
              onChange={(checked) =>
                onSettingsChange({ confirmDialogs: checked })
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsView;
