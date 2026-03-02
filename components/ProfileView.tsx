import React, { useState, useEffect } from "react";
import {
  UserProfile,
  UserCharacter,
  loadProfile,
  saveProfile,
  AvatarStyle,
} from "../utils/userProfileStore";
import { AvatarRenderer } from "./AvatarRenderer";
import { toast } from "./ui/Toast";
import SettingsView from "./SettingsView";
import { loadSettings, saveSettings } from "../utils/settingsStore";
import Heatmap from "./Heatmap";
import {
  useGlobalXp,
  getLifetimeStats,
  getClaimedMilestones,
  MILESTONES,
  MILESTONE_TITLES,
} from "../utils/xpStore";
import { getRankForLevel } from "../utils/levelRanks";

type ProfileTab = "account" | "settings" | "activity";

export default function ProfileView() {
  const [profile, setProfile] = useState<UserProfile>(() => loadProfile());
  const [seedInput, setSeedInput] = useState(profile.character.seed);
  const [activeTab, setActiveTab] = useState<ProfileTab>("account");
  const [settings, setSettings] = useState(() => loadSettings());
  const { level, totalXp } = useGlobalXp();
  const currentRank = getRankForLevel(level);

  const [lifetimeStats, setLifetimeStats] = useState(getLifetimeStats);
  const [claimedMilestones, setClaimedMilestones] =
    useState(getClaimedMilestones);

  useEffect(() => {
    const handleStatsUpdate = () => {
      setLifetimeStats(getLifetimeStats());
      setClaimedMilestones(getClaimedMilestones());
    };
    window.addEventListener("lifetimeStatsUpdated", handleStatsUpdate);
    return () =>
      window.removeEventListener("lifetimeStatsUpdated", handleStatsUpdate);
  }, []);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const handleChange = (field: keyof UserCharacter, value: string) => {
    setProfile((prev) => ({
      ...prev,
      character: { ...prev.character, [field]: value },
    }));
  };

  const handleSave = () => {
    saveProfile(profile);
    toast.success("Profile saved correctly!");
  };

  const handleRandomize = () => {
    const randomSeed = Math.random().toString(36).substring(2, 10);
    setSeedInput(randomSeed);
    handleChange("seed", randomSeed);
  };

  const handleSettingsChange = (partialUpdate: Partial<typeof settings>) => {
    const next = { ...settings, ...partialUpdate };
    setSettings(next);
    saveSettings(next);
  };

  const avatarStyles: { id: AvatarStyle; name: string; emoji: string }[] = [
    { id: "micah", name: "Modern Chibi (Micah)", emoji: "😎" },
    { id: "adventurer", name: "Adventurer", emoji: "🏕️" },
    { id: "fun-emoji", name: "Fun Emoji", emoji: "😜" },
    { id: "bottts", name: "Robot", emoji: "🤖" },
    { id: "croodles", name: "Sketch (Croodles)", emoji: "✏️" },
    { id: "pixel-art", name: "Pixel Art", emoji: "👾" },
    { id: "thumbs", name: "Thumbs Up", emoji: "👍" },
    { id: "avataaars", name: "Avataaars", emoji: "🧑" },
  ];

  const backgroundColors = [
    "transparent",
    "fcdbb9",
    "ffc8d2",
    "bbf7d0",
    "bfdbfe",
    "e9d5ff",
    "fef08a",
    "fde68a",
    "1f2937",
    "0f172a",
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-surface-base p-4">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-4 md:pb-8">
        {/* Gmail/Google-style Header */}
        <div className="bg-surface-1 rounded-2xl p-6 sm:p-8 shadow-sm border border-border flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-accent/20 to-emerald-500/20 opacity-50"></div>

          <div className="relative group z-10">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-surface-1 shadow-xl overflow-hidden bg-surface-base flex-shrink-0 flex items-center justify-center">
              <AvatarRenderer
                character={profile.character}
                className="w-full h-full scale-110"
                animate={true}
              />
            </div>
            {activeTab === "account" && (
              <button
                onClick={handleRandomize}
                className="absolute bottom-0 right-0 bg-surface-2 p-2 rounded-full border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95"
                title="Randomize Avatar"
              >
                🎲
              </button>
            )}
          </div>

          <div className="z-10 flex flex-col items-center sm:items-start text-center sm:text-left flex-1 mt-2 sm:mt-8">
            <h1 className="text-3xl font-black text-text-primary tracking-tight">
              {profile.character.name || "Learner"}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
              <span className="px-3 py-1 rounded-full bg-surface-2 border border-border text-sm font-bold text-text-secondary flex items-center gap-1.5">
                🌟 Nivel {level}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5 ${currentRank.color} bg-surface-2 border border-border`}
              >
                {currentRank.emoji} {currentRank.title}
              </span>
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-bold flex items-center gap-1.5">
                ⚡ {totalXp} XP
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-surface-2 p-1 rounded-xl w-full sm:w-fit mx-auto sm:mx-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("account")}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === "account"
                ? "bg-surface-1 text-text-primary shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            🎨 Info. de Cuenta
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === "activity"
                ? "bg-surface-1 text-text-primary shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            📊 Actividad
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === "settings"
                ? "bg-surface-1 text-text-primary shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            ⚙️ Configuración
          </button>
        </div>

        {/* Tab Content Areas */}
        <div className="mt-6">
          {/* TAB 1: Información de Cuenta (Personalización de Avatar) */}
          {activeTab === "account" && (
            <div className="bg-surface-1 rounded-xl p-6 shadow-sm border border-border space-y-6">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={profile.character.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="Enter your hero name"
                />
              </div>

              {/* Avatar Style Art */}
              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">
                  Art Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {avatarStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleChange("avatarStyle", style.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                        profile.character.avatarStyle === style.id
                          ? "border-accent bg-accent/10 scale-105"
                          : "border-border bg-surface-2 hover:border-accent/50"
                      }`}
                    >
                      <span className="text-2xl mb-1">{style.emoji}</span>
                      <span className="text-[10px] font-bold text-center leading-tight">
                        {style.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar DNA / Seed */}
              <div>
                <label className="block text-sm font-bold text-text-primary mb-2 flex justify-between items-center">
                  <span>Avatar DNA (Seed)</span>
                  <button
                    onClick={handleRandomize}
                    className="text-xs text-accent hover:underline flex items-center gap-1"
                  >
                    <span>🎲 Randomize</span>
                  </button>
                </label>
                <input
                  type="text"
                  value={seedInput}
                  onChange={(e) => {
                    setSeedInput(e.target.value);
                    handleChange("seed", e.target.value);
                  }}
                  className="w-full bg-surface-2 border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all font-mono text-sm"
                  placeholder="Type anything to change the look..."
                />
                <p className="text-xs text-text-muted mt-2">
                  The DNA string completely changes how your character looks.
                  Try typing your favorite English word!
                </p>
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">
                  Background Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {backgroundColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleChange("backgroundColor", color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        profile.character.backgroundColor === color
                          ? "border-accent scale-110 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                          : "border-border hover:scale-105"
                      }`}
                      style={{
                        backgroundColor:
                          color === "transparent"
                            ? "var(--color-surface-2)"
                            : `#${color}`,
                      }}
                      aria-label={`Background color ${color}`}
                    >
                      {color === "transparent" && (
                        <span className="text-xs block transform rotate-45 text-text-muted">
                          /
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-accent hover:bg-accent-hover text-white font-black py-4 rounded-xl transition-colors active:scale-95 shadow-lg flex items-center justify-center gap-2 text-lg mt-4"
              >
                <span>💾</span> Save Character Profile
              </button>
            </div>
          )}

          {/* TAB 2: Activity e Historial */}
          {activeTab === "activity" && (
            <div className="space-y-6">
              <div className="bg-surface-1 border border-border rounded-2xl p-6 overflow-hidden">
                <h2 className="text-lg font-black text-text-primary mb-4 flex items-center gap-2">
                  🔥 Activity Heatmap
                </h2>
                <div className="flex justify-center w-full overflow-x-auto pb-2">
                  <Heatmap />
                </div>
              </div>

              <div className="bg-surface-1 border border-border rounded-2xl p-6">
                <h2 className="text-lg font-black text-text-primary mb-4 flex items-center gap-2">
                  🏆 Logros Desbloqueados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(MILESTONE_TITLES).map(([key, title]) => {
                    const currentTotal = lifetimeStats[key] || 0;

                    // Encontrar el siguiente hito no reclamado
                    const nextMilestone =
                      MILESTONES.find(
                        (m) => !claimedMilestones[`${key}_${m}`],
                      ) || MILESTONES[MILESTONES.length - 1];
                    const progress = Math.min(
                      100,
                      Math.max(0, (currentTotal / nextMilestone) * 100),
                    );

                    return (
                      <div
                        key={key}
                        className="bg-surface-2 border border-border p-4 rounded-xl flex flex-col gap-2"
                      >
                        <span className="text-sm font-bold text-text-primary">
                          {title}
                        </span>

                        <div className="w-full bg-surface-1 rounded-full h-2.5 mb-1 overflow-hidden border border-border/50">
                          <div
                            className="bg-accent h-2.5 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <span className="text-text-secondary font-bold">
                            {currentTotal}{" "}
                            <span className="font-normal text-text-muted">
                              / {nextMilestone}
                            </span>
                          </span>
                          <span className="text-accent bg-accent/10 px-2 py-0.5 rounded-full font-black">
                            Nivel{" "}
                            {
                              MILESTONES.filter(
                                (m) => claimedMilestones[`${key}_${m}`],
                              ).length
                            }
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-surface-1 border border-border rounded-2xl p-6">
                <h2 className="text-lg font-black text-text-primary mb-4 flex items-center gap-2">
                  🎯 Quick Links
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="#/stats"
                    className="p-4 rounded-xl bg-surface-2 border border-border hover:border-accent transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-bold text-text-primary">
                        Ver Logros y Estadísticas Detalladas
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        Explora tu progreso en todos los juegos.
                      </p>
                    </div>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                  <a
                    href="#/vault"
                    className="p-4 rounded-xl bg-surface-2 border border-border hover:border-accent transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-bold text-text-primary">
                        Ir a Vocabulary Vault
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        Sigue aprendiendo nuevas palabras.
                      </p>
                    </div>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Configuración (SettingsView inyectado) */}
          {activeTab === "settings" && (
            <div className="bg-surface-base -m-4 sm:-m-0 sm:bg-transparent">
              {/* Le pasamos a SettingsView las props, y evitamos que tenga su propio padding extremo anidándolo sutilmente */}
              <div className="[&>div]:p-0 [&>div]:pb-0">
                <SettingsView
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
