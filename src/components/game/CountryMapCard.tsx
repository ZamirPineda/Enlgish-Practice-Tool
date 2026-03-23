import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import Card from "@/components/ui/Card";
import { type CountryInfo } from "@/features/data/triviaData";
import {
  getCountryReferenceByName,
  getNeighborReferences,
} from "@/lib/geographyReference";
import { getFlagUrl } from "@/lib/stopGameHelpers";
import countries50mUrl from "world-atlas/countries-50m.json?url";

interface CountryMapCardProps {
  country: CountryInfo;
  countryCode: string;
  lang: "en" | "es";
}

const COUNTRY_NUMERIC_CODES: Record<string, string> = {
  AU: "036",
  BR: "076",
  CA: "124",
  CL: "152",
  CN: "156",
  CO: "170",
  EG: "818",
  GR: "300",
  ID: "360",
  IN: "356",
  IS: "352",
  JP: "392",
  MX: "484",
  NO: "578",
  RU: "643",
};

const COUNTRY_ZOOM_OVERRIDES: Record<string, number> = {
  AU: 2,
  BR: 2.3,
  CA: 1.7,
  CL: 3.2,
  CN: 2.3,
  CO: 4.1,
  EG: 4.7,
  GR: 5.3,
  ID: 3.1,
  IN: 3.1,
  IS: 5.7,
  JP: 4,
  MX: 3,
  NO: 4.1,
  RU: 1.35,
};

const getAreaNumber = (value: string) => Number(value.replace(/,/g, ""));

const getZoomLevel = (countryCode: string, areaKm2: string) => {
  const normalizedCode = countryCode.toUpperCase();
  const override = COUNTRY_ZOOM_OVERRIDES[normalizedCode];
  if (override) return override;

  const area = getAreaNumber(areaKm2);
  if (area >= 10_000_000) return 1.4;
  if (area >= 6_000_000) return 1.8;
  if (area >= 2_000_000) return 2.4;
  if (area >= 800_000) return 3.1;
  if (area >= 250_000) return 4.1;
  return 5.3;
};

const formatCoordinate = (
  value: number,
  positiveLabel: string,
  negativeLabel: string,
) =>
  `${Math.abs(value).toFixed(2)} deg ${value >= 0 ? positiveLabel : negativeLabel}`;

const CountryMapCard: React.FC<CountryMapCardProps> = ({
  country,
  countryCode,
  lang,
}) => {
  const [flagImageFailed, setFlagImageFailed] = useState(false);

  useEffect(() => {
    setFlagImageFailed(false);
  }, [countryCode]);

  const t = (en: string, es: string) => (lang === "en" ? en : es);
  const facts = lang === "en" ? country.funFacts_en : country.funFacts_es;
  const normalizedCode = countryCode.toUpperCase();
  const selectedCountryId = COUNTRY_NUMERIC_CODES[normalizedCode];
  const zoom = getZoomLevel(normalizedCode, country.area_km2);
  const mapCenter: [number, number] = [country.lng, country.lat];
  const stopReference = getCountryReferenceByName(country.name_en);
  const neighborReferences = getNeighborReferences(country.name_en);
  const flagUrl = getFlagUrl(country.name_en, 160);
  const countryName = lang === "en" ? country.name_en : country.name_es;
  const capitalName =
    lang === "en"
      ? stopReference?.capitalName || country.capital_en
      : stopReference?.capitalTranslation || country.capital_es;
  const continentName =
    lang === "en" ? country.continent_en : country.continent_es;

  return (
    <Card className="animate-fade-in overflow-hidden p-0">
      <div className="relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.16),transparent_34%)]" />

        <div className="grid lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.95fr)]">
          <div className="relative min-h-[360px] overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.2),rgba(2,6,23,0.72))]" />

            <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-slate-950/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-100/85 backdrop-blur">
              <span className="text-sky-300">{t("Real Map", "Mapa real")}</span>
              <span>{normalizedCode}</span>
            </div>

            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 150 }}
              width={980}
              height={560}
              className="relative z-[1] h-full w-full"
            >
              <rect width={980} height={560} fill="#081220" />
              <ZoomableGroup center={mapCenter} zoom={zoom} minZoom={1}>
                <Geographies geography={countries50mUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isSelected = String(geo.id) === selectedCountryId;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          stroke={
                            isSelected ? "#f8fafc" : "rgba(148,163,184,0.35)"
                          }
                          strokeWidth={isSelected ? 1.6 : 0.55}
                          style={{
                            default: {
                              fill: isSelected
                                ? "#38bdf8"
                                : "rgba(30,41,59,0.98)",
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
                    })
                  }
                </Geographies>

                <Marker coordinates={mapCenter}>
                  <g>
                    <circle r="20" fill="rgba(251,191,36,0.18)" />
                    <circle
                      r="10"
                      fill="#fbbf24"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                    <circle r="3" fill="#fff8db" />
                  </g>
                </Marker>
              </ZoomableGroup>
            </ComposableMap>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
              <div className="max-w-xl rounded-[26px] border border-white/10 bg-slate-950/62 p-4 backdrop-blur-xl">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-3xl">
                    {country.flag}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-100/65">
                      {continentName}
                    </p>
                    <h3 className="text-2xl font-black text-white sm:text-3xl">
                      {countryName}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-200/80">
                      {t(
                        "The highlighted border now uses real world country geometry instead of a hand-drawn placeholder.",
                        "El borde resaltado ahora usa geometria real del pais en vez de una silueta generica dibujada a mano.",
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[360px] p-5 sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,165,233,0.08),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.12),transparent_34%)]" />

            <div className="relative z-10 flex h-full flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    {t("Country Profile", "Perfil del pais")}
                  </p>
                  <h4 className="mt-1 text-xl font-black text-white">
                    {countryName}
                  </h4>
                </div>
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold text-slate-200">
                  {normalizedCode}
                </span>
              </div>

              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-3">
                {!flagImageFailed ? (
                  <img
                    src={flagUrl}
                    alt={`${countryName} flag`}
                    className="h-28 w-full rounded-[18px] object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setFlagImageFailed(true)}
                  />
                ) : (
                  <div className="flex h-28 items-center justify-center rounded-[18px] bg-slate-900 text-6xl">
                    {country.flag}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Capital", "Capital")}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    {capitalName}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Continent", "Continente")}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    {continentName}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Population", "Poblacion")}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    {country.population}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {t("Area", "Area")}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    {country.area_km2} km2
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {t("Approximate center", "Centro aproximado")}
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  {formatCoordinate(country.lat, "N", "S")}
                </p>
                <p className="text-sm text-slate-200">
                  {formatCoordinate(country.lng, "E", "W")}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {t("Neighbor countries", "Paises vecinos")}
                </p>
                {neighborReferences.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {neighborReferences.map((neighbor) => (
                      <div
                        key={neighbor.canonicalCountry}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-100"
                      >
                        {neighbor.flagUrl ? (
                          <img
                            src={neighbor.flagUrl}
                            alt=""
                            className="h-4 w-6 rounded-[3px] object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : null}
                        <span>
                          {lang === "es" && neighbor.countryTranslation
                            ? neighbor.countryTranslation
                            : neighbor.canonicalCountry}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-300">
                    {t(
                      "This country has no land borders.",
                      "Este pais no tiene fronteras terrestres.",
                    )}
                  </p>
                )}
              </div>

              {facts.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400">
                    {t("Quick facts", "Datos rapidos")}
                  </p>
                  <ul className="space-y-2">
                    {facts.map((fact) => (
                      <li
                        key={fact}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                      >
                        <span className="mt-0.5 text-amber-400">✦</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CountryMapCard;
