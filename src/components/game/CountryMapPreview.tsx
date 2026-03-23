import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import countries50mUrl from "world-atlas/countries-50m.json?url";
import { type GeographyReference } from "@/lib/geographyReference";

interface CountryMapPreviewProps {
  reference: GeographyReference;
  title?: string;
  subtitle?: string;
  className?: string;
}

interface MapGeometryFeature {
  geometry?: {
    coordinates?: unknown;
  };
}

const collectGeometryPoints = (
  coordinates: unknown,
  points: [number, number][] = [],
): [number, number][] => {
  if (!Array.isArray(coordinates)) return points;
  if (
    typeof coordinates[0] === "number" &&
    typeof coordinates[1] === "number"
  ) {
    points.push([coordinates[0], coordinates[1]]);
    return points;
  }

  coordinates.forEach((entry) => {
    collectGeometryPoints(entry, points);
  });

  return points;
};

const deriveCountryView = (feature: MapGeometryFeature | null) => {
  if (!feature?.geometry?.coordinates) return null;

  const points = collectGeometryPoints(feature.geometry.coordinates);
  if (points.length === 0) return null;

  const longitudes = points.map(([longitude]) => longitude);
  const latitudes = points.map(([, latitude]) => latitude);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const center: [number, number] = [
    (minLongitude + maxLongitude) / 2,
    (minLatitude + maxLatitude) / 2,
  ];
  const span = Math.max(maxLongitude - minLongitude, maxLatitude - minLatitude);

  let zoom = 2.1;
  if (span <= 2) zoom = 9;
  else if (span <= 4) zoom = 7.4;
  else if (span <= 8) zoom = 6;
  else if (span <= 14) zoom = 5;
  else if (span <= 24) zoom = 4.1;
  else if (span <= 45) zoom = 3.1;
  else if (span <= 70) zoom = 2.5;

  return { center, zoom };
};

const TOPOJSON_NAME_ALIASES: Record<string, string> = {
  "North Macedonia": "Macedonia",
  "Saint Kitts and Nevis": "St. Kitts and Nevis",
  "Saint Vincent and the Grenadines": "St. Vin. and Gren.",
  "Sao Tome and Principe": "São Tomé and Principe",
  "United States": "United States of America",
  "Vatican City": "Vatican",
};

const getTopojsonCountryName = (countryName: string) =>
  TOPOJSON_NAME_ALIASES[countryName] ?? countryName;

const CountryMapPreview: React.FC<CountryMapPreviewProps> = ({
  reference,
  title = "Map Preview",
  subtitle,
  className = "",
}) => {
  const selectedCountryName = getTopojsonCountryName(
    reference.canonicalCountry,
  );
  const defaultCenter = useMemo<[number, number]>(
    () => reference.mapCenter ?? [8, 18],
    [reference.mapCenter],
  );
  const defaultZoom = reference.mapZoom ?? 1;
  const initialFitView = useMemo(
    () => ({
      coordinates: defaultCenter,
      zoom: Math.max(defaultZoom, 4.5),
    }),
    [defaultCenter, defaultZoom],
  );
  const fitViewRef = useRef(initialFitView);
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({
    coordinates: defaultCenter,
    zoom: defaultZoom,
  });

  useEffect(() => {
    fitViewRef.current = initialFitView;
    setPosition({
      coordinates: defaultCenter,
      zoom: defaultZoom,
    });
  }, [defaultCenter, defaultZoom, initialFitView, reference.canonicalCountry]);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-surface-2/60 ${className}`.trim()}
    >
      <div className="border-b border-border px-4 py-3">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-text-muted">
          {title}
        </div>
        <div className="mt-1 flex items-center gap-2">
          {reference.flagUrl ? (
            <img
              src={reference.flagUrl}
              alt=""
              className="h-4 w-6 rounded-[3px] object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : null}
          <div className="font-bold text-text-primary">
            {reference.canonicalCountry}
          </div>
        </div>
        {subtitle ? (
          <div className="mt-1 text-sm text-text-secondary">{subtitle}</div>
        ) : null}
      </div>

      <div className="relative bg-slate-950">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_32%)]" />
        <div className="pointer-events-none absolute left-3 top-3 right-28 z-[2] rounded-full border border-white/10 bg-slate-950/75 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-slate-200 backdrop-blur sm:right-auto sm:text-[10px] sm:tracking-[0.2em]">
          Drag to move • wheel to zoom
        </div>
        <div className="absolute right-3 top-3 z-[2] flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() =>
              setPosition({
                coordinates: fitViewRef.current.coordinates,
                zoom: fitViewRef.current.zoom,
              })
            }
            className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-slate-100 transition-colors hover:bg-slate-800 sm:text-[10px] sm:tracking-[0.18em]"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() =>
              setPosition({
                coordinates: fitViewRef.current.coordinates,
                zoom: fitViewRef.current.zoom,
              })
            }
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-cyan-100 transition-colors hover:bg-cyan-400/20 sm:text-[10px] sm:tracking-[0.18em]"
          >
            Fit Country
          </button>
        </div>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 120 }}
          width={720}
          height={360}
          className="relative z-[1] h-[220px] w-full"
        >
          <rect width={720} height={360} fill="#081220" />
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            minZoom={1}
            maxZoom={18}
            onMoveEnd={(nextPosition) =>
              setPosition({
                coordinates: nextPosition.coordinates as [number, number],
                zoom: nextPosition.zoom,
              })
            }
          >
            <Geographies geography={countries50mUrl}>
              {({ geographies }) => (
                <>
                  {geographies.map((geo) => {
                    const isSelected =
                      geo.properties?.name === selectedCountryName;
                    if (isSelected) {
                      const derivedView = deriveCountryView(
                        geo as MapGeometryFeature,
                      );
                      if (derivedView) {
                        fitViewRef.current = {
                          coordinates: derivedView.center,
                          zoom: Math.max(
                            reference.mapZoom ?? 0,
                            derivedView.zoom,
                          ),
                        };
                      }
                    }

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        stroke={
                          isSelected ? "#f8fafc" : "rgba(148,163,184,0.28)"
                        }
                        strokeWidth={isSelected ? 1.1 : 0.4}
                        style={{
                          default: {
                            fill: isSelected
                              ? "#38bdf8"
                              : "rgba(30,41,59,0.96)",
                            outline: "none",
                          },
                          hover: {
                            fill: isSelected
                              ? "#7dd3fc"
                              : "rgba(51,65,85,0.98)",
                            outline: "none",
                          },
                          pressed: {
                            fill: isSelected
                              ? "#7dd3fc"
                              : "rgba(51,65,85,0.98)",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })}
                  <Marker coordinates={fitViewRef.current.coordinates}>
                    <g>
                      <circle r={6} fill="#f8fafc" fillOpacity={0.95} />
                      <circle r={12} fill="#38bdf8" fillOpacity={0.22} />
                      <circle r={20} fill="#38bdf8" fillOpacity={0.12} />
                    </g>
                  </Marker>
                </>
              )}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Capital
          </div>
          <div className="mt-1 font-bold text-accent">
            {reference.capitalName || "Unknown"}
          </div>
          {reference.capitalTranslation ? (
            <div className="mt-1 text-xs text-text-secondary">
              {reference.capitalTranslation}
            </div>
          ) : null}
        </div>

        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Neighbor Countries
          </div>
          {reference.neighbors.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {reference.neighbors.slice(0, 6).map((neighbor) => (
                <span
                  key={neighbor}
                  className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-text-primary"
                >
                  {neighbor}
                </span>
              ))}
            </div>
          ) : (
            <div className="mt-1 text-xs text-text-secondary">
              No land borders in the shared reference.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryMapPreview;
