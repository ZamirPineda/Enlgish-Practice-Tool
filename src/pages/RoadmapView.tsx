import React from "react";
import {
  Button as AriaButton,
  Disclosure,
  DisclosurePanel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Popover,
  Dialog,
  DialogTrigger,
} from "react-aria-components";
import { Link, useSearchParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import ViewToolbar from "@/components/ui/ViewToolbar";
import { defaultRoadmapDefinition } from "@/lib/roadmapCatalog";
import { buildRoadmapNodeSessionHref } from "@/lib/roadmapLaunch";
import {
  buildRoadmapProgressSnapshot,
  createEmptyRoadmapProgress,
  loadRoadmapProgress,
  recordRoadmapNodeMastery,
  resetRoadmapRouteProgress,
  saveRoadmapProgress,
  type RoadmapNodeProgressStatus,
} from "@/lib/roadmapProgress";
import {
  applyRoadmapRewards,
  getRoadmapRewardsStatus,
  loadRoadmapRewards,
  saveRoadmapRewards,
} from "@/lib/roadmapRewards";
import type { RoadmapRouteObjective } from "@/lib/roadmapModel";
import { addGlobalXp } from "@/lib/xpStore";
import { toast } from "@/components/ui/Toast";
import { RoadmapPath } from "@/components/roadmap/RoadmapPath";
import { RoadmapNodeItem } from "@/components/roadmap/RoadmapNodeItem";
import { UnitCompletionModal } from "@/components/roadmap/UnitCompletionModal";

const ROUTE_OPTIONS: Array<{
  id: RoadmapRouteObjective;
  label: string;
  accent: string;
  badgeClassName: string;
  icon: React.ReactNode;
}> = [
  {
    id: "english_interview",
    label: "English Interview",
    accent: "from-sky-500/20 to-cyan-500/10",
    badgeClassName:
      "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 mr-1.5 opacity-80"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM2.625 12c0-1.026.175-2.008.497-2.932h3.337a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75H5.05A9.761 9.761 0 0112 2.75v5.303a.75.75 0 001.06.685l3.52-1.76a.75.75 0 01.996.34 9.75 9.75 0 011.674 5.433v.3a.75.75 0 01-.75.75h-3.32a.75.75 0 00-.53.22L12 16.657a.75.75 0 00-.22.53v3.832a.75.75 0 00.16.467c-.636.17-1.305.264-2 .264-5.385 0-9.75-4.365-9.75-9.75z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "math_speed",
    label: "Math Speed",
    accent: "from-emerald-500/20 to-lime-500/10",
    badgeClassName:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 mr-1.5 opacity-80"
      >
        <path
          fillRule="evenodd"
          d="M3.75 4.5a3 3 0 013-3h10.5a3 3 0 013 3v15a3 3 0 01-3 3H6.75a3 3 0 01-3-3v-15zM6.75 6a1.5 1.5 0 00-1.5 1.5v1.5c0 .828.672 1.5 1.5 1.5h10.5a1.5 1.5 0 001.5-1.5v-1.5A1.5 1.5 0 0017.25 6H6.75zm1.5 6a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5zm0 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5zm3.75-3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5zm0 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "dev_reasoning",
    label: "Dev Reasoning",
    accent: "from-amber-500/20 to-orange-500/10",
    badgeClassName:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 mr-1.5 opacity-80"
      >
        <path
          fillRule="evenodd"
          d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

const ROUTE_FILTER_OPTIONS = [
  {
    id: "all",
    label: "Todas las rutas",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 mr-1.5 opacity-80"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  ...ROUTE_OPTIONS.map((route) => ({
    id: route.id,
    label: route.label,
    icon: route.icon,
  })),
] as const;

const MASTERY_OPTIONS = [60, 70, 80, 90, 100];

const STATUS_COPY: Record<
  RoadmapNodeProgressStatus,
  { label: string; className: string }
> = {
  completed: {
    label: "Completado",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  in_progress: {
    label: "En progreso",
    className: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  locked: {
    label: "Bloqueado",
    className: "border-border bg-surface-2 text-text-muted",
  },
};

const formatDifficulty = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const getRouteLabel = (route: RoadmapRouteObjective | "all") =>
  route === "all"
    ? "todas las rutas"
    : (ROUTE_OPTIONS.find((option) => option.id === route)?.label ?? route);

const StatusBadge = ({ status }: { status: RoadmapNodeProgressStatus }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-wider ${STATUS_COPY[status].className}`}
  >
    {STATUS_COPY[status].label}
  </span>
);

const RoadmapView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [progress, setProgress] = React.useState(() => loadRoadmapProgress());
  const [rewards, setRewards] = React.useState(() => loadRoadmapRewards());
  const [draftMasteryByNodeId, setDraftMasteryByNodeId] = React.useState<
    Record<string, number>
  >({});
  const [activeCompletionReward, setActiveCompletionReward] = React.useState<{
    title: string;
    description: string;
    earnedXp: number;
    badgeId: string;
  } | null>(null);

  const selectedRoute = (searchParams.get("route") || "all") as
    | RoadmapRouteObjective
    | "all";

  const snapshot = React.useMemo(
    () => buildRoadmapProgressSnapshot(defaultRoadmapDefinition, progress),
    [progress],
  );
  const rewardsStatus = React.useMemo(
    () => getRoadmapRewardsStatus(rewards),
    [rewards],
  );

  const filteredModules = React.useMemo(() => {
    if (selectedRoute === "all") {
      return defaultRoadmapDefinition.modules;
    }

    return defaultRoadmapDefinition.modules.filter(
      (module) => module.routeObjective === selectedRoute,
    );
  }, [selectedRoute]);

  const totalNodes = Object.keys(snapshot.statusByNodeId).length;

  const persistProgress = (nextProgress: typeof progress) => {
    const rewardResult = applyRoadmapRewards(
      defaultRoadmapDefinition,
      progress,
      nextProgress,
      rewards,
    );

    setProgress(nextProgress);
    saveRoadmapProgress(nextProgress);
    setRewards(rewardResult.nextRewards);
    saveRoadmapRewards(rewardResult.nextRewards);

    if (rewardResult.grants.length > 0) {
      const rewardXp = rewardResult.grants.reduce(
        (sum, grant) => sum + grant.badge.rewardXp,
        0,
      );
      addGlobalXp(rewardXp);

      const completionGrant = rewardResult.grants.find(
        (grant) =>
          grant.badge.category === "unit_completion" ||
          grant.badge.category === "module_completion",
      );

      if (completionGrant) {
        setActiveCompletionReward({
          title: completionGrant.badge.title,
          description: completionGrant.badge.description,
          earnedXp: completionGrant.badge.rewardXp,
          badgeId: completionGrant.rewardId,
        });
      }

      rewardResult.grants.forEach((grant) => {
        // Only toast non-completion grants or if we don't have a modal
        if (!completionGrant || grant.rewardId !== completionGrant.rewardId) {
          toast.success(`${grant.badge.title} (+${grant.badge.rewardXp} XP)`);
        }
      });
    }
  };

  const getDraftMastery = (nodeId: string) =>
    draftMasteryByNodeId[nodeId] ?? snapshot.masteryByNodeId[nodeId] ?? 80;

  const handleRouteFilter = (route: RoadmapRouteObjective | "all") => {
    const nextParams = new URLSearchParams(searchParams);

    if (route === "all") {
      nextParams.delete("route");
    } else {
      nextParams.set("route", route);
    }

    setSearchParams(nextParams, { replace: true });
  };

  const handleNodeMasteryChange = (nodeId: string, value: string) => {
    const mastery = Number.parseInt(value, 10);

    setDraftMasteryByNodeId((current) => ({
      ...current,
      [nodeId]: Number.isFinite(mastery) ? mastery : getDraftMastery(nodeId),
    }));
  };

  const handleRecordMastery = (nodeId: string) => {
    const nextProgress = recordRoadmapNodeMastery(
      defaultRoadmapDefinition,
      progress,
      nodeId,
      getDraftMastery(nodeId),
    );

    persistProgress(nextProgress);
  };

  const handleResetRoute = (routeObjective: RoadmapRouteObjective) => {
    const nextProgress = resetRoadmapRouteProgress(
      defaultRoadmapDefinition,
      progress,
      routeObjective,
    );

    persistProgress(nextProgress);
  };

  const handleResetAll = () => {
    persistProgress(createEmptyRoadmapProgress());
    setDraftMasteryByNodeId({});
  };

  const closeCompletionModal = () => {
    setActiveCompletionReward(null);
  };

  return (
    <div className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 pb-4 sm:p-8 sm:pb-8 animate-fade-in">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <ViewToolbar
          left={
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
                Sprint 8 · Roadmap secuencial
              </p>
              <h1 className="mt-2 text-3xl font-black text-text-primary sm:text-4xl">
                Roadmap
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-text-secondary sm:text-base">
                El roadmap ahora bloquea la siguiente leccion o unidad hasta que
                cierres la actual con mastery suficiente.
              </p>
            </div>
          }
          right={
            <>
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-center">
                <p className="text-[11px] font-black uppercase tracking-wider text-text-muted">
                  Nodos completados
                </p>
                <p className="mt-1 text-2xl font-black text-text-primary">
                  {snapshot.completedNodeIds.length}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-center">
                <p className="text-[11px] font-black uppercase tracking-wider text-text-muted">
                  Total del roadmap
                </p>
                <p className="mt-1 text-2xl font-black text-text-primary">
                  {totalNodes}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-center">
                <p className="text-[11px] font-black uppercase tracking-wider text-text-muted">
                  Racha roadmap
                </p>
                <p className="mt-1 text-2xl font-black text-text-primary">
                  {rewardsStatus.currentStreak}
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetAll}
                className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm font-black text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
              >
                Reiniciar progreso
              </button>
            </>
          }
        />

        <section className="grid gap-4 lg:grid-cols-[1.4fr,1fr]">
          <Card className="p-5">
            <Tabs
              aria-label="Filtros del roadmap por ruta"
              selectedKey={selectedRoute}
              onSelectionChange={(key) =>
                handleRouteFilter(key as RoadmapRouteObjective | "all")
              }
            >
              <TabList
                aria-label="Rutas del roadmap"
                className="flex flex-wrap gap-2"
              >
                {ROUTE_FILTER_OPTIONS.map((route) => (
                  <Tab
                    key={route.id}
                    id={route.id}
                    className="flex items-center rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-black text-text-secondary outline-none transition-colors data-[hovered]:bg-surface-hover data-[hovered]:text-text-primary data-[selected]:border-accent data-[selected]:bg-accent data-[selected]:text-slate-900 data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent/40"
                  >
                    {route.icon}
                    {route.label}
                  </Tab>
                ))}
              </TabList>
              <TabPanels className="mt-4">
                {ROUTE_FILTER_OPTIONS.map((route) => {
                  const routeSummary =
                    route.id === "all"
                      ? `${defaultRoadmapDefinition.modules.length} modulos disponibles`
                      : `${snapshot.routeSummaries[route.id].completedNodes}/${snapshot.routeSummaries[route.id].totalNodes} nodos completados`;

                  return (
                    <TabPanel
                      key={route.id}
                      id={route.id}
                      className="rounded-2xl border border-border bg-surface-2/70 px-4 py-3 text-sm text-text-secondary outline-none"
                    >
                      <p className="font-bold text-text-primary">
                        Filtro activo: {route.label}
                      </p>
                      <p className="mt-1">
                        {route.id === "all"
                          ? "Vista completa del roadmap secuencial."
                          : `Vista filtrada para ${route.label}.`}{" "}
                        {routeSummary}.
                      </p>
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Card>

          <Card className="p-5">
            <div className="grid gap-3 sm:grid-cols-3">
              {ROUTE_OPTIONS.map((route) => {
                const summary = snapshot.routeSummaries[route.id];

                return (
                  <div
                    key={route.id}
                    className={`rounded-2xl border border-border bg-gradient-to-br ${route.accent} p-4`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-text-primary">
                          {route.label}
                        </p>
                        <p className="mt-1 text-xs text-text-secondary">
                          {summary.completedNodes}/{summary.totalNodes} nodos
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-black uppercase tracking-wider ${route.badgeClassName}`}
                      >
                        {summary.currentNodeId ? "Activo" : "Ruta completa"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleResetRoute(route.id)}
                      className="mt-3 rounded-lg border border-border bg-surface-1/80 px-3 py-1.5 text-xs font-bold text-text-secondary transition-colors hover:bg-surface-1 hover:text-text-primary"
                    >
                      Reiniciar ruta
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr,1.2fr]">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-text-muted">
                  Continuidad
                </p>
                <h2 className="mt-2 text-xl font-black text-text-primary">
                  Recompensas del roadmap
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Gana XP por cerrar unidades, completar modulos y mantener dias
                  seguidos de avance.
                </p>
              </div>
              <span className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs font-bold text-text-secondary">
                {rewardsStatus.unlockedBadgeCount} badges
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface-2 p-4">
                <p className="text-[11px] font-black uppercase tracking-wider text-text-muted">
                  Racha actual
                </p>
                <p className="mt-2 text-2xl font-black text-text-primary">
                  {rewardsStatus.currentStreak}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface-2 p-4">
                <p className="text-[11px] font-black uppercase tracking-wider text-text-muted">
                  Mejor racha
                </p>
                <p className="mt-2 text-2xl font-black text-text-primary">
                  {rewardsStatus.bestStreak}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface-2 p-4">
                <p className="text-[11px] font-black uppercase tracking-wider text-text-muted">
                  Siguiente hito
                </p>
                <p className="mt-2 text-base font-black text-text-primary">
                  {rewardsStatus.nextTier
                    ? `${rewardsStatus.nextTier.requiredDays} dias`
                    : "Completado"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-text-muted">
                  Badges recientes
                </p>
                <h2 className="mt-2 text-xl font-black text-text-primary">
                  Ultimos desbloqueos
                </h2>
              </div>
            </div>
            {rewardsStatus.recentBadges.length === 0 ? (
              <p className="mt-4 text-sm text-text-secondary">
                Aun no hay recompensas del roadmap desbloqueadas.
              </p>
            ) : (
              <div className="mt-4 grid gap-3">
                {rewardsStatus.recentBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="rounded-2xl border border-border bg-surface-2 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-text-primary">
                          {badge.title}
                        </p>
                        <p className="mt-1 text-sm text-text-secondary">
                          {badge.description}
                        </p>
                      </div>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                        +{badge.rewardXp} XP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>

        <section
          aria-label={`Modulos visibles para ${getRouteLabel(selectedRoute)}`}
          className="space-y-5"
        >
          {filteredModules.map((module) => {
            const moduleStatus = snapshot.statusByModuleId[module.id];

            return (
              <Disclosure
                key={module.id}
                id={module.id}
                defaultExpanded
                className="overflow-hidden border-l-4 border-l-accent"
              >
                {({ isExpanded }) => (
                  <Card className="p-0">
                    <AriaButton
                      slot="trigger"
                      aria-label={`Alternar modulo ${module.title}`}
                      className="w-full rounded-none border-b border-border px-5 py-5 text-left outline-none transition-colors hover:bg-surface-2/40 data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent/40 sm:px-6"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.24em] text-text-muted">
                            Modulo
                          </p>
                          <h2 className="mt-2 text-2xl font-black text-text-primary">
                            {module.title}
                          </h2>
                          <p className="mt-2 max-w-3xl text-sm text-text-secondary">
                            {module.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <StatusBadge status={moduleStatus} />
                          <span className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs font-bold text-text-secondary">
                            {module.estimatedMinutes} min
                          </span>
                          <span className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs font-bold text-text-secondary">
                            {isExpanded ? "Ocultar" : "Mostrar"}
                          </span>
                        </div>
                      </div>
                    </AriaButton>

                    <DisclosurePanel
                      role="region"
                      aria-label={`Contenido del modulo ${module.title}`}
                      className="grid gap-4 p-5 outline-none sm:p-6 xl:grid-cols-2"
                    >
                      {module.units.map((unit) => {
                        const unitSummary = snapshot.unitProgressById[unit.id];

                        return (
                          <Disclosure
                            key={unit.id}
                            id={unit.id}
                            defaultExpanded
                            className="rounded-2xl border border-border bg-surface-2/60"
                          >
                            {({ isExpanded: isUnitExpanded }) => (
                              <>
                                <AriaButton
                                  slot="trigger"
                                  aria-label={`Alternar unidad ${unit.title}`}
                                  className="w-full rounded-2xl px-4 py-4 text-left outline-none transition-colors hover:bg-surface-1/40 data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent/40"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <p className="text-xs font-black uppercase tracking-widest text-text-muted">
                                        Unidad
                                      </p>
                                      <h3 className="mt-1 text-lg font-black text-text-primary">
                                        {unit.title}
                                      </h3>
                                      <p className="mt-1 text-sm text-text-secondary">
                                        {unit.description}
                                      </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                      <StatusBadge
                                        status={unitSummary.status}
                                      />
                                      <span className="rounded-full border border-border bg-surface-1 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-text-secondary">
                                        {isUnitExpanded ? "Ocultar" : "Mostrar"}
                                      </span>
                                    </div>
                                  </div>
                                </AriaButton>

                                <DisclosurePanel
                                  role="region"
                                  aria-label={`Contenido de la unidad ${unit.title}`}
                                  className="px-4 pb-4 outline-none"
                                >
                                  {unitSummary.blockingReason ? (
                                    <div className="rounded-2xl border border-border bg-surface-1 px-4 py-3 text-sm text-text-secondary">
                                      {unitSummary.blockingReason}
                                    </div>
                                  ) : null}

                                  <div className="mt-4 space-y-4">
                                    {unit.lessons.map((lesson) => {
                                      const lessonSummary =
                                        snapshot.lessonProgressById[lesson.id];

                                      return (
                                        <div
                                          key={lesson.id}
                                          className="rounded-2xl border border-border bg-surface-1 p-4"
                                        >
                                          <div className="flex items-start justify-between gap-3">
                                            <div>
                                              <p className="text-xs font-black uppercase tracking-widest text-text-muted">
                                                Leccion
                                              </p>
                                              <h4 className="mt-1 text-base font-black text-text-primary">
                                                {lesson.title}
                                              </h4>
                                              <p className="mt-1 text-sm text-text-secondary">
                                                {lesson.description}
                                              </p>
                                            </div>
                                            <StatusBadge
                                              status={lessonSummary.status}
                                            />
                                          </div>

                                          <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-text-muted">
                                            {lessonSummary.masteryTarget ? (
                                              <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1">
                                                Objetivo{" "}
                                                {lessonSummary.masteryTarget}%
                                              </span>
                                            ) : null}
                                            {lessonSummary.masteryAverage !==
                                            null ? (
                                              <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1">
                                                Mastery actual{" "}
                                                {lessonSummary.masteryAverage}%
                                              </span>
                                            ) : null}
                                          </div>

                                          {lessonSummary.blockingReason ? (
                                            <div className="mt-4 rounded-2xl border border-border bg-surface-2 px-4 py-3 text-sm text-text-secondary">
                                              {lessonSummary.blockingReason}
                                            </div>
                                          ) : null}

                                          <div className="mt-8 relative flex flex-col items-center pb-8">
                                            {lesson.nodes.map((node, index) => {
                                              const nodeStatus =
                                                snapshot.statusByNodeId[
                                                  node.id
                                                ];
                                              const isLocked =
                                                nodeStatus === "locked";
                                              const currentMastery =
                                                snapshot.masteryByNodeId[
                                                  node.id
                                                ] ?? null;

                                              // Calculation for the serpentine path positioning
                                              const PATH_WIDTH = 60;
                                              const VERTICAL_SPACING = 120; // Distance between nodes
                                              const offset =
                                                PATH_WIDTH *
                                                Math.sin((index * Math.PI) / 2); // Zigzag alternate

                                              // Previous node coordinates for the SVG path
                                              const prevOffset =
                                                index > 0
                                                  ? PATH_WIDTH *
                                                    Math.sin(
                                                      ((index - 1) * Math.PI) /
                                                        2,
                                                    )
                                                  : 0;

                                              return (
                                                <div
                                                  key={node.id}
                                                  className="relative w-full flex justify-center"
                                                  style={{
                                                    height: `${VERTICAL_SPACING}px`,
                                                  }}
                                                >
                                                  {/* Connecting Path from Previous Node */}
                                                  {index > 0 && (
                                                    <RoadmapPath
                                                      startX={prevOffset + 32} // Node center + offset
                                                      startY={
                                                        -VERTICAL_SPACING / 2 +
                                                        16
                                                      }
                                                      endX={offset + 32}
                                                      endY={16}
                                                      status={nodeStatus}
                                                    />
                                                  )}

                                                  <DialogTrigger>
                                                    <RoadmapNodeItem
                                                      node={node}
                                                      status={nodeStatus}
                                                      isUnlocked={!isLocked}
                                                      offset={offset}
                                                      onClick={() => {}}
                                                    />

                                                    <Popover
                                                      placement="top"
                                                      className="w-[320px] rounded-2xl bg-surface-1 border border-border shadow-soft p-4 animate-fade-in z-50"
                                                    >
                                                      <Dialog className="outline-none flex flex-col gap-3">
                                                        {({ close }) => (
                                                          <>
                                                            <div className="flex justify-between items-start">
                                                              <div>
                                                                <h3 className="text-lg font-black text-text-primary">
                                                                  {node.title}
                                                                </h3>
                                                                <p className="text-sm text-text-secondary mt-1">
                                                                  {
                                                                    node.description
                                                                  }
                                                                </p>
                                                              </div>
                                                            </div>

                                                            <div className="flex flex-wrap gap-2 text-xs font-bold text-text-muted mt-2">
                                                              <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1">
                                                                {node.kind}
                                                              </span>
                                                              <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1">
                                                                {formatDifficulty(
                                                                  node.difficulty,
                                                                )}
                                                              </span>
                                                              <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1">
                                                                {
                                                                  node.estimatedMinutes
                                                                }{" "}
                                                                min
                                                              </span>
                                                            </div>

                                                            <div className="mt-2 flex flex-col gap-2 pt-3 border-t border-border">
                                                              <Link
                                                                to={buildRoadmapNodeSessionHref(
                                                                  node,
                                                                )}
                                                                className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-black text-slate-900 hover:bg-accent-hover transition-colors"
                                                              >
                                                                Iniciar Practica
                                                              </Link>

                                                              <div className="flex items-center gap-2 mt-2">
                                                                <select
                                                                  aria-label={`Mastery para ${node.title}`}
                                                                  className="mt-1 w-full rounded-xl border border-border bg-surface-1 px-3 py-2 text-sm font-bold text-text-primary"
                                                                  value={getDraftMastery(
                                                                    node.id,
                                                                  )}
                                                                  onChange={(
                                                                    event,
                                                                  ) =>
                                                                    handleNodeMasteryChange(
                                                                      node.id,
                                                                      event
                                                                        .target
                                                                        .value,
                                                                    )
                                                                  }
                                                                >
                                                                  {MASTERY_OPTIONS.map(
                                                                    (
                                                                      option,
                                                                    ) => (
                                                                      <option
                                                                        key={
                                                                          option
                                                                        }
                                                                        value={
                                                                          option
                                                                        }
                                                                      >
                                                                        {option}
                                                                        %
                                                                      </option>
                                                                    ),
                                                                  )}
                                                                </select>
                                                                <button
                                                                  type="button"
                                                                  onClick={() => {
                                                                    handleRecordMastery(
                                                                      node.id,
                                                                    );
                                                                    close();
                                                                  }}
                                                                  className="rounded-xl border border-border bg-surface-1 px-4 py-2 text-sm font-black text-text-primary transition-colors hover:bg-surface-hover"
                                                                  aria-label={`Registrar mastery para ${node.title}`}
                                                                >
                                                                  {currentMastery !==
                                                                  null
                                                                    ? "Actualizar"
                                                                    : "Registrar"}
                                                                </button>
                                                              </div>
                                                            </div>
                                                          </>
                                                        )}
                                                      </Dialog>
                                                    </Popover>
                                                  </DialogTrigger>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </DisclosurePanel>
                              </>
                            )}
                          </Disclosure>
                        );
                      })}
                    </DisclosurePanel>
                  </Card>
                )}
              </Disclosure>
            );
          })}
        </section>
      </div>

      <UnitCompletionModal
        isOpen={activeCompletionReward !== null}
        onClose={closeCompletionModal}
        title={activeCompletionReward?.title ?? ""}
        description={activeCompletionReward?.description ?? ""}
        earnedXp={activeCompletionReward?.earnedXp ?? 0}
      />
    </div>
  );
};

export default RoadmapView;
