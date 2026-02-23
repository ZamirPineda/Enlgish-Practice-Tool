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
    <div className="flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 pb-24 sm:pb-8 bg-background">
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
                className="w-full min-h-[44px] rounded-lg border px-3 py-2 bg-surface-1 border-border text-text-primary active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-focus"
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

            <div>
              <label
                htmlFor="weekly-goal-select"
                className="block text-sm font-bold mb-2 text-text-secondary"
              >
                Weekly goal (sessions)
              </label>
              <select
                id="weekly-goal-select"
                className="w-full min-h-[44px] rounded-lg border px-3 py-2 bg-surface-1 border-border text-text-primary active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-focus"
                value={settings.weeklyGoalSessions}
                onChange={(event) =>
                  onSettingsChange({
                    weeklyGoalSessions: Number(event.target.value),
                  })
                }
              >
                {[3, 4, 5, 6, 7, 8, 10, 12].map((value) => (
                  <option key={value} value={value}>
                    {value} sessions
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsView;
