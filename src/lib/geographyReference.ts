import { countriesData } from "@/features/data/stop_categories/countries";
import { capitalsData } from "@/features/data/stop_categories/capitals";
import { type StopData, type StopItem } from "@/types";
import { getCountryCodeFromName, getFlagUrl } from "@/lib/stopGameHelpers";

const COUNTRY_ALIASES: Record<string, string> = {
  UAE: "United Arab Emirates",
  UK: "United Kingdom",
  USA: "United States",
  "St Kitts": "Saint Kitts and Nevis",
  "St Lucia": "Saint Lucia",
  "St Vincent": "Saint Vincent and the Grenadines",
  CAR: "Central African Republic",
};

const COUNTRY_NEIGHBORS: Record<string, string[]> = {
  Australia: [],
  Brazil: [
    "Argentina",
    "Bolivia",
    "Colombia",
    "Guyana",
    "Paraguay",
    "Peru",
    "Suriname",
    "Uruguay",
    "Venezuela",
  ],
  Canada: ["United States"],
  Chile: ["Argentina", "Bolivia", "Peru"],
  China: [
    "Afghanistan",
    "Bhutan",
    "India",
    "Kazakhstan",
    "North Korea",
    "Kyrgyzstan",
    "Laos",
    "Mongolia",
    "Myanmar",
    "Nepal",
    "Pakistan",
    "Russia",
    "Tajikistan",
    "Vietnam",
  ],
  Colombia: ["Brazil", "Ecuador", "Panama", "Peru", "Venezuela"],
  Egypt: ["Israel", "Libya", "Sudan"],
  Greece: ["Albania", "Bulgaria", "North Macedonia", "Turkey"],
  Iceland: [],
  India: ["Bangladesh", "Bhutan", "China", "Myanmar", "Nepal", "Pakistan"],
  Japan: [],
  Mexico: ["Belize", "Guatemala", "United States"],
  Norway: ["Finland", "Russia", "Sweden"],
  Russia: [
    "Azerbaijan",
    "Belarus",
    "China",
    "Estonia",
    "Finland",
    "Georgia",
    "Kazakhstan",
    "Latvia",
    "Lithuania",
    "Mongolia",
    "North Korea",
    "Norway",
    "Poland",
    "Ukraine",
  ],
  "United Arab Emirates": ["Oman", "Saudi Arabia"],
  "United Kingdom": ["Ireland"],
  "United States": ["Canada", "Mexico"],
};

export interface GeographyReference {
  canonicalCountry: string;
  iso2: string | null;
  flagUrl: string | null;
  mapCenter?: [number, number];
  mapZoom?: number;
  countryItem?: StopItem;
  capitalItem?: StopItem;
  countryTranslation?: string;
  capitalName?: string;
  capitalTranslation?: string;
  neighbors: string[];
}

const COUNTRY_MAP_VIEW: Record<
  string,
  { center: [number, number]; zoom: number }
> = {
  Australia: { center: [134, -25], zoom: 2.5 },
  Brazil: { center: [-52, -14], zoom: 2.9 },
  Canada: { center: [-100, 58], zoom: 2.3 },
  Chile: { center: [-71, -35], zoom: 3.4 },
  China: { center: [104, 35], zoom: 2.8 },
  Colombia: { center: [-74, 4.5], zoom: 5.1 },
  Egypt: { center: [30, 27], zoom: 5.2 },
  Greece: { center: [22, 39], zoom: 6.4 },
  Iceland: { center: [-19, 65], zoom: 6.3 },
  India: { center: [78, 22], zoom: 3.5 },
  Japan: { center: [138, 37], zoom: 4.8 },
  Mexico: { center: [-102, 23], zoom: 3.4 },
  Norway: { center: [11, 64], zoom: 4.5 },
  Russia: { center: [100, 61], zoom: 1.85 },
  "United Arab Emirates": { center: [54.4, 24.3], zoom: 9.6 },
  "United Kingdom": { center: [-2.5, 54.5], zoom: 5.9 },
  "United States": { center: [-98, 39], zoom: 2.7 },
};

const flattenCategoryItems = (
  data: StopData,
  category: "Countries" | "Capitals",
): StopItem[] => Object.values(data).flatMap((entry) => entry[category] ?? []);

const normalizeCountryName = (
  countryName: string | undefined,
): string | null => {
  if (!countryName) return null;
  const primaryCountry = countryName.split("/")[0].trim();
  if (!primaryCountry) return null;
  return COUNTRY_ALIASES[primaryCountry] ?? primaryCountry;
};

const countryItems = flattenCategoryItems(countriesData, "Countries");
const capitalItems = flattenCategoryItems(capitalsData, "Capitals");

const countryItemsByName = new Map<string, StopItem>();
const capitalItemsByCountry = new Map<string, StopItem>();
const capitalItemsByWord = new Map<string, StopItem>();

countryItems.forEach((item) => {
  const canonicalName = normalizeCountryName(item.word);
  if (canonicalName && !countryItemsByName.has(canonicalName)) {
    countryItemsByName.set(canonicalName, item);
  }
});

capitalItems.forEach((item) => {
  const canonicalCountry = normalizeCountryName(item.country);
  if (canonicalCountry && !capitalItemsByCountry.has(canonicalCountry)) {
    capitalItemsByCountry.set(canonicalCountry, item);
  }
  if (!capitalItemsByWord.has(item.word)) {
    capitalItemsByWord.set(item.word, item);
  }
});

const buildReference = (canonicalCountry: string): GeographyReference => {
  const countryItem = countryItemsByName.get(canonicalCountry);
  const capitalItem = capitalItemsByCountry.get(canonicalCountry);

  return {
    canonicalCountry,
    iso2: getCountryCodeFromName(canonicalCountry),
    flagUrl: getFlagUrl(canonicalCountry, 40),
    mapCenter: COUNTRY_MAP_VIEW[canonicalCountry]?.center,
    mapZoom: COUNTRY_MAP_VIEW[canonicalCountry]?.zoom,
    countryItem,
    capitalItem,
    countryTranslation: countryItem?.translation,
    capitalName: capitalItem?.word,
    capitalTranslation: capitalItem?.translation,
    neighbors: COUNTRY_NEIGHBORS[canonicalCountry] ?? [],
  };
};

export const getCountryReferenceByName = (
  countryName: string | undefined,
): GeographyReference | null => {
  const canonicalCountry = normalizeCountryName(countryName);
  if (!canonicalCountry) return null;

  if (
    !countryItemsByName.has(canonicalCountry) &&
    !capitalItemsByCountry.has(canonicalCountry)
  ) {
    return null;
  }

  return buildReference(canonicalCountry);
};

export const getCountryReferenceByCapital = (
  capitalName: string | undefined,
): GeographyReference | null => {
  if (!capitalName) return null;
  const capitalItem = capitalItemsByWord.get(capitalName);
  if (!capitalItem) return null;
  return getCountryReferenceByName(capitalItem.country);
};

export const getNeighborReferences = (
  countryName: string | undefined,
): GeographyReference[] => {
  const reference = getCountryReferenceByName(countryName);
  if (!reference) return [];

  return reference.neighbors
    .map((neighborName) => getCountryReferenceByName(neighborName))
    .filter((neighbor): neighbor is GeographyReference => Boolean(neighbor));
};

export const hasLandBorders = (countryName: string | undefined) =>
  getNeighborReferences(countryName).length > 0;
