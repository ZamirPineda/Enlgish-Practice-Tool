import ToggleSwitch from "@/components/ToggleSwitch";
import Card from "@/components/ui/Card";
import { AppSettings } from "@/lib/settingsStore";
import { useGlobalXp } from "@/lib/xpStore";
import { playGameSound } from "@/lib/audioUtils";
import {
  Snowflake,
  ShieldAlert,
  Download,
  Upload,
  Database,
} from "lucide-react";
import { useRef } from "react";
import { exportToJSON, importFromJSON } from "@/lib/exportImport";
import { toast } from "@/components/ui/Toast";

interface SettingsViewProps {
  settings: AppSettings;
  onSettingsChange: (updates: Partial<AppSettings>) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSettingsChange,
}) => {
  const { totalXp, streakFreezes, buyFreeze } = useGlobalXp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      !window.confirm(
        "Importar datos sobreescribirá o unirá tus datos actuales. ¿Estás seguro de continuar?",
      )
    ) {
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const { success, error } = importFromJSON(content);
      if (success) {
        toast.success("¡Datos importados correctamente! Recargando...", 3000);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(`Error al importar: ${error || "Archivo inválido"}`);
      }
      event.target.value = "";
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 pb-4 sm:pb-8 bg-background">
      <div className="max-w-3xl mx-auto space-y-4">
        <Card className="p-5 sm:p-6 bg-surface-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <ShieldAlert className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-text-primary">
                Tienda del Jugador
              </h2>
              <p className="text-text-secondary text-sm">
                Usa tu XP para ventajas
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-surface-2 p-4 rounded-xl border border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-500/20 text-sky-500 rounded-full flex items-center justify-center">
                  <Snowflake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary flex items-center gap-2">
                    Congelador de Racha
                    <span className="bg-surface-1 text-xs px-2 py-0.5 rounded-full border border-border">
                      Tienes: {streakFreezes}
                    </span>
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Protege tu racha si faltas un día. (Max 3)
                  </p>
                </div>
              </div>
              <button
                onClick={() => buyFreeze()}
                disabled={streakFreezes >= 3 || totalXp < 500}
                className={`px-4 py-2 font-black rounded-lg transition-all ${
                  streakFreezes >= 3
                    ? "bg-surface-1 text-text-muted border border-border"
                    : totalXp < 500
                      ? "bg-surface-1 text-red-400 border border-red-500/30 opacity-50 cursor-not-allowed"
                      : "bg-amber-500 text-white hover:bg-amber-400 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
                }`}
              >
                {streakFreezes >= 3 ? "Al máximo" : "500 XP"}
              </button>
            </div>
            <div className="text-right text-xs font-bold text-text-muted">
              Tu XP actual: <span className="text-amber-500">{totalXp} XP</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6 bg-surface-1 mt-6">
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
              label="Sound effects"
              checked={settings.soundEnabled}
              onChange={(checked) => {
                onSettingsChange({ soundEnabled: checked });
                if (checked) {
                  // Fire after a minimal delay so state updates and the audioUtil allows it
                  setTimeout(() => playGameSound("start"), 50);
                }
              }}
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

            <div className="pt-4 border-t border-border mt-4">
              <h3 className="font-bold text-lg text-text-primary mb-4">
                Daily Goal & Streak Options
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="daily-goal-type"
                    className="block text-sm font-bold mb-2 text-text-secondary"
                  >
                    Establecer meta basaba en
                  </label>
                  <select
                    id="daily-goal-type"
                    className="w-full min-h-[44px] rounded-lg border px-3 py-2 bg-surface-1 border-border text-text-primary active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-focus"
                    value={settings.dailyGoalType}
                    onChange={(event) =>
                      onSettingsChange({
                        dailyGoalType: event.target
                          .value as AppSettings["dailyGoalType"],
                      })
                    }
                  >
                    <option value="cards">Cartas Estudiadas</option>
                    <option value="time">Minutos Jugados</option>
                    <option value="xp">Experiencia (XP)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="daily-goal-target"
                    className="block text-sm font-bold mb-2 text-text-secondary"
                  >
                    Objetivo Diario
                  </label>
                  <input
                    id="daily-goal-target"
                    type="number"
                    min="1"
                    className="w-full min-h-[44px] rounded-lg border px-3 py-2 bg-surface-1 border-border text-text-primary active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-focus"
                    value={settings.dailyGoalTarget}
                    onChange={(event) =>
                      onSettingsChange({
                        dailyGoalTarget: Number(event.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="day-offset"
                    className="block text-sm font-bold mb-2 text-text-secondary"
                  >
                    Hora de Cierre del Día
                  </label>
                  <select
                    id="day-offset"
                    className="w-full min-h-[44px] rounded-lg border px-3 py-2 bg-surface-1 border-border text-text-primary active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-focus"
                    value={settings.dayOffsetHours}
                    onChange={(event) =>
                      onSettingsChange({
                        dayOffsetHours: Number(event.target.value),
                      })
                    }
                  >
                    <option value="0">Medianoche (12:00 AM)</option>
                    <option value="1">1:00 AM</option>
                    <option value="2">2:00 AM</option>
                    <option value="3">3:00 AM (Recomendado)</option>
                    <option value="4">4:00 AM</option>
                    <option value="5">5:00 AM</option>
                  </select>
                  <p className="text-xs text-text-muted mt-1">
                    Cualquier actividad antes de esta hora se considerará como
                    parte del día anterior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* DATA MANAGEMENT */}
        <Card className="p-5 sm:p-6 bg-surface-1 mt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Database className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-text-primary">
                Gestión de Datos
              </h2>
              <p className="text-text-secondary text-sm">
                Copia de seguridad local sin conexión
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-surface-2 p-4 rounded-xl border border-border flex sm:items-center sm:justify-between flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-text-primary">
                  Exportar a archivo
                </h3>
                <p className="text-sm text-text-secondary">
                  Guarda todo tu vocabulario, progreso, stats y configuración en
                  un archivo .json seguro.
                </p>
              </div>
              <button
                onClick={exportToJSON}
                className="w-full sm:w-auto px-4 py-2 font-black rounded-lg transition-all bg-sky-500 text-white hover:bg-sky-400 active:scale-95 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>

            <div className="bg-surface-2 p-4 rounded-xl border border-border flex sm:items-center sm:justify-between flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-text-primary">
                  Importar archivo
                </h3>
                <p className="text-sm text-text-secondary">
                  Restaura o combina datos previos. Si un elemento ya existe, se
                  priorizará el de mayor nivel.
                </p>
              </div>
              <input
                type="file"
                accept=".json,application/json"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={handleImportClick}
                className="w-full sm:w-auto px-4 py-2 font-black rounded-lg transition-all bg-surface-1 border border-border text-text-primary hover:bg-surface-3 active:scale-95 flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Importar
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsView;
