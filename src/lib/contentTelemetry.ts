import { AnalyticsEvent } from "@/lib/analytics";
import { ContentInventoryItem } from "@/lib/contentInventory";
import {
  buildDailyLoopInventoryItems,
  DailyLoopFocusRoute,
} from "@/lib/dailyLoop";
import { getTechContentInventoryIndex } from "@/lib/contentInventoryPicker";

export type ContentTelemetryCategoryFilter =
  | "all"
  | "english"
  | "math"
  | "dev";

export interface ContentTelemetrySummary {
  selections: number;
  repeatedSelections: number;
  repeatRate: number;
  uniqueSelected: number;
  availableItems: number;
  coverageRate: number;
}

export interface ContentTelemetryRouteSummary extends ContentTelemetrySummary {
  route: DailyLoopFocusRoute;
  label: string;
}

const GOAL_ROUTE_LABEL: Record<DailyLoopFocusRoute, string> = {
  english_interview: "English Interview",
  math_speed: "Math Speed",
  dev_reasoning: "Dev Reasoning",
};

const roundToOneDecimal = (value: number) => Math.round(value * 10) / 10;

const isDailyLoopFocusRoute = (value: unknown): value is DailyLoopFocusRoute =>
  value === "english_interview" ||
  value === "math_speed" ||
  value === "dev_reasoning";

const getEventSkill = (event: AnalyticsEvent): string | null =>
  typeof event.payload.skill === "string" ? event.payload.skill : null;

const getEventRouteObjective = (
  event: AnalyticsEvent,
): DailyLoopFocusRoute | null => {
  if (isDailyLoopFocusRoute(event.payload.routeObjective)) {
    return event.payload.routeObjective;
  }
  return null;
};

const matchesCategory = (
  categoryFilter: ContentTelemetryCategoryFilter,
  skill: string | null,
): boolean => categoryFilter === "all" || skill === categoryFilter;

const matchesRoute = (
  focusRouteFilter: DailyLoopFocusRoute | "all",
  route: DailyLoopFocusRoute | null,
): boolean => focusRouteFilter === "all" || route === focusRouteFilter;

const uniqueAvailableItems = (items: ContentInventoryItem[]) =>
  Array.from(
    items.reduce<Map<string, ContentInventoryItem>>((accumulator, item) => {
      accumulator.set(item.id, item);
      return accumulator;
    }, new Map<string, ContentInventoryItem>()).values(),
  );

export const getContentTelemetryAvailableItems = (): ContentInventoryItem[] =>
  uniqueAvailableItems([
    ...Object.values(getTechContentInventoryIndex().byId),
    ...buildDailyLoopInventoryItems(),
  ]);

export const buildContentTelemetrySummary = ({
  events,
  availableItems,
  categoryFilter,
  focusRouteFilter,
}: {
  events: AnalyticsEvent[];
  availableItems: ContentInventoryItem[];
  categoryFilter: ContentTelemetryCategoryFilter;
  focusRouteFilter: DailyLoopFocusRoute | "all";
}): ContentTelemetrySummary => {
  const relevantEvents = events.filter((event) => {
    if (event.name !== "content_selected") return false;
    return (
      matchesCategory(categoryFilter, getEventSkill(event)) &&
      matchesRoute(focusRouteFilter, getEventRouteObjective(event))
    );
  });

  const relevantAvailableItems = availableItems.filter((item) => {
    const route = isDailyLoopFocusRoute(item.metadata.routeObjective)
      ? item.metadata.routeObjective
      : null;
    return (
      matchesCategory(categoryFilter, item.skill) &&
      matchesRoute(focusRouteFilter, route)
    );
  });

  const uniqueSelectedIds = new Set(
    relevantEvents
      .map((event) =>
        typeof event.payload.contentId === "string" ? event.payload.contentId : null,
      )
      .filter((value): value is string => Boolean(value)),
  );
  const repeatedSelections = relevantEvents.filter(
    (event) => event.payload.repeated === true,
  ).length;

  return {
    selections: relevantEvents.length,
    repeatedSelections,
    repeatRate:
      relevantEvents.length > 0
        ? roundToOneDecimal((repeatedSelections / relevantEvents.length) * 100)
        : 0,
    uniqueSelected: uniqueSelectedIds.size,
    availableItems: relevantAvailableItems.length,
    coverageRate:
      relevantAvailableItems.length > 0
        ? roundToOneDecimal(
            (uniqueSelectedIds.size / relevantAvailableItems.length) * 100,
          )
        : 0,
  };
};

export const buildContentTelemetryRouteSummary = ({
  events,
  availableItems,
  categoryFilter,
}: {
  events: AnalyticsEvent[];
  availableItems: ContentInventoryItem[];
  categoryFilter: ContentTelemetryCategoryFilter;
}): ContentTelemetryRouteSummary[] =>
  (
    ["english_interview", "math_speed", "dev_reasoning"] as DailyLoopFocusRoute[]
  ).map((route) => ({
    route,
    label: GOAL_ROUTE_LABEL[route],
    ...buildContentTelemetrySummary({
      events,
      availableItems,
      categoryFilter,
      focusRouteFilter: route,
    }),
  }));
