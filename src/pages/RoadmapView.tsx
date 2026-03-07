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

const ROUTE_OPTIONS: Array<{
  id: RoadmapRouteObjective;
  label: string;
  accent: string;
  badgeClassName: string;
}> = [
  {
    id: "english_interview",
    label: "English Interview",
    accent: "from-sky-500/20 to-cyan-500/10",
    badgeClassName:
      "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  {
    id: "math_speed",
    label: "Math Speed",
    accent: "from-emerald-500/20 to-lime-500/10",
    badgeClassName:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  {
    id: "dev_reasoning",
    label: "Dev Reasoning",
    accent: "from-amber-500/20 to-orange-500/10",
    badgeClassName:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
];

const ROUTE_FILTER_OPTIONS = [
  { id: "all", label: "Todas las rutas" },
  ...ROUTE_OPTIONS.map((route) => ({
    id: route.id,
    label: route.label,
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
    className:
      "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
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
    : ROUTE_OPTIONS.find((option) => option.id === route)?.label ?? route;

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

  const selectedRoute = (searchParams.get("route") ||
    "all") as RoadmapRouteObjective | "all";

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
      rewardResult.grants.forEach((grant) => {
        toast.success(`${grant.badge.title} (+${grant.badge.rewardXp} XP)`);
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
                    className="rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-black text-text-secondary outline-none transition-colors data-[hovered]:bg-surface-hover data-[hovered]:text-text-primary data-[selected]:border-accent data-[selected]:bg-accent data-[selected]:text-white data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent/40"
                  >
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
                                      <StatusBadge status={unitSummary.status} />
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
                                            <StatusBadge status={lessonSummary.status} />
                                          </div>

                                          <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-text-muted">
                                            {lessonSummary.masteryTarget ? (
                                              <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1">
                                                Objetivo {lessonSummary.masteryTarget}%
                                              </span>
                                            ) : null}
                                            {lessonSummary.masteryAverage !== null ? (
                                              <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1">
                                                Mastery actual {lessonSummary.masteryAverage}%
                                              </span>
                                            ) : null}
                                          </div>

                                          {lessonSummary.blockingReason ? (
                                            <div className="mt-4 rounded-2xl border border-border bg-surface-2 px-4 py-3 text-sm text-text-secondary">
                                              {lessonSummary.blockingReason}
                                            </div>
                                          ) : null}

                                          <div className="mt-4 space-y-3">
                                            {lesson.nodes.map((node) => {
                                              const nodeStatus =
                                                snapshot.statusByNodeId[node.id];
                                              const isLocked =
                                                nodeStatus === "locked";
                                              const currentMastery =
                                                snapshot.masteryByNodeId[node.id] ??
                                                null;

                                              return (
                                                <article
                                                  key={node.id}
                                                  aria-label={`Node ${node.title}`}
                                                  className={`rounded-2xl border p-4 transition-colors ${
                                                    nodeStatus === "in_progress"
                                                      ? "border-accent/40 bg-accent/5"
                                                      : isLocked
                                                        ? "border-border bg-surface-2/70"
                                                        : "border-emerald-500/20 bg-emerald-500/5"
                                                  }`}
                                                >
                                                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                                    <div>
                                                      <div className="flex flex-wrap items-center gap-2">
                                                        <p className="text-base font-black text-text-primary">
                                                          {node.title}
                                                        </p>
                                                        <StatusBadge status={nodeStatus} />
                                                      </div>
                                                      <p className="mt-2 text-sm text-text-secondary">
                                                        {node.description}
                                                      </p>
                                                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-text-muted">
                                                        <span className="rounded-full border border-border bg-surface-1 px-2.5 py-1">
                                                          {node.kind}
                                                        </span>
                                                        <span className="rounded-full border border-border bg-surface-1 px-2.5 py-1">
                                                          {formatDifficulty(node.difficulty)}
                                                        </span>
                                                        <span className="rounded-full border border-border bg-surface-1 px-2.5 py-1">
                                                          {node.estimatedMinutes} min
                                                        </span>
                                                        {currentMastery !== null ? (
                                                          <span className="rounded-full border border-border bg-surface-1 px-2.5 py-1">
                                                            Mastery {currentMastery}%
                                                          </span>
                                                        ) : null}
                                                      </div>
                                                    </div>

                                                    <div className="flex min-w-[15rem] flex-col gap-2">
                                                      {isLocked ? (
                                                        <span className="inline-flex items-center justify-center rounded-xl border border-border bg-surface-2 px-4 py-2 text-sm font-black text-text-muted">
                                                          Aun bloqueado
                                                        </span>
                                                      ) : (
                                                        <>
                                                          <Link
                                                            to={buildRoadmapNodeSessionHref(
                                                              node,
                                                            )}
                                                            className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2 text-sm font-black text-white transition-colors hover:bg-accent-hover"
                                                          >
                                                            Abrir sesion guiada
                                                          </Link>
                                                          <label className="text-xs font-black uppercase tracking-wider text-text-muted">
                                                            Mastery
                                                            <select
                                                              aria-label={`Mastery para ${node.title}`}
                                                              className="mt-1 w-full rounded-xl border border-border bg-surface-1 px-3 py-2 text-sm font-bold text-text-primary"
                                                              value={getDraftMastery(
                                                                node.id,
                                                              )}
                                                              onChange={(event) =>
                                                                handleNodeMasteryChange(
                                                                  node.id,
                                                                  event.target
                                                                    .value,
                                                                )
                                                              }
                                                            >
                                                              {MASTERY_OPTIONS.map(
                                                                (option) => (
                                                                  <option
                                                                    key={option}
                                                                    value={option}
                                                                  >
                                                                    {option}%
                                                                  </option>
                                                                ),
                                                              )}
                                                            </select>
                                                          </label>
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              handleRecordMastery(
                                                                node.id,
                                                              )
                                                            }
                                                            className="rounded-xl border border-border bg-surface-1 px-4 py-2 text-sm font-black text-text-primary transition-colors hover:bg-surface-hover"
                                                            aria-label={`Registrar mastery para ${node.title}`}
                                                          >
                                                            {currentMastery !== null
                                                              ? "Actualizar mastery"
                                                              : "Registrar mastery"}
                                                          </button>
                                                        </>
                                                      )}
                                                    </div>
                                                  </div>
                                                </article>
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
    </div>
  );
};

export default RoadmapView;
