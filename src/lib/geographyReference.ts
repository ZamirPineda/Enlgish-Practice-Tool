import { countriesData } from "@/features/data/stop_categories/countries";
import { capitalsData } from "@/features/data/stop_categories/capitals";
import { type StopData, type StopItem } from "@/types";
import { getCountryCodeFromName, getFlagUrl } from "@/lib/stopGameHelpers";

const COUNTRY_ALIASES: Record<string, string> = {
  Antigua: "Antigua and Barbuda",
  Bosnia: "Bosnia and Herzegovina",
  "Eq. Guinea": "Equatorial Guinea",
  DRC: "DRC",
  "N. Macedonia": "North Macedonia",
  "Sao Tome": "Sao Tome and Principe",
  Scotland: "Scotland",
  Trinidad: "Trinidad and Tobago",
  UAE: "United Arab Emirates",
  UK: "United Kingdom",
  USA: "United States",
  "St Kitts": "Saint Kitts and Nevis",
  "St Lucia": "Saint Lucia",
  "St Vincent": "Saint Vincent and the Grenadines",
  CAR: "Central African Republic",
  Vatican: "Vatican City",
};

const COUNTRY_NEIGHBORS: Record<string, string[]> = {
  Afghanistan: [
    "China",
    "Iran",
    "Pakistan",
    "Tajikistan",
    "Turkmenistan",
    "Uzbekistan",
  ],
  Albania: ["Greece", "Kosovo", "Montenegro", "North Macedonia"],
  Algeria: ["Libya", "Mali", "Mauritania", "Morocco", "Niger", "Tunisia"],
  Andorra: ["France", "Spain"],
  Angola: ["DRC", "Namibia", "Zambia"],
  Argentina: ["Bolivia", "Brazil", "Chile", "Paraguay", "Uruguay"],
  Armenia: ["Azerbaijan", "Georgia", "Iran", "Turkey"],
  Australia: [],
  Austria: [
    "Czech Republic",
    "Germany",
    "Hungary",
    "Italy",
    "Liechtenstein",
    "Slovakia",
    "Slovenia",
    "Switzerland",
  ],
  Azerbaijan: ["Armenia", "Georgia", "Iran", "Russia", "Turkey"],
  Bangladesh: ["India", "Myanmar"],
  Belarus: ["Latvia", "Lithuania", "Poland", "Russia", "Ukraine"],
  Belgium: ["France", "Germany", "Luxembourg", "Netherlands"],
  Belize: ["Guatemala", "Mexico"],
  Benin: ["Burkina Faso", "Niger", "Nigeria", "Togo"],
  Bhutan: ["China", "India"],
  Bolivia: ["Argentina", "Brazil", "Chile", "Paraguay", "Peru"],
  "Bosnia and Herzegovina": ["Croatia", "Montenegro", "Serbia"],
  Botswana: ["Namibia", "South Africa", "Zambia", "Zimbabwe"],
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
  Bulgaria: ["Greece", "North Macedonia", "Romania", "Serbia", "Turkey"],
  "Burkina Faso": ["Benin", "Ghana", "Ivory Coast", "Mali", "Niger", "Togo"],
  Burundi: ["DRC", "Rwanda", "Tanzania"],
  "Central African Republic": [
    "Cameroon",
    "Chad",
    "DRC",
    "South Sudan",
    "Sudan",
  ],
  Cambodia: ["Laos", "Thailand", "Vietnam"],
  Cameroon: [
    "Central African Republic",
    "Chad",
    "Congo",
    "Equatorial Guinea",
    "Gabon",
    "Nigeria",
  ],
  Canada: ["United States"],
  Chad: [
    "Cameroon",
    "Central African Republic",
    "Libya",
    "Niger",
    "Nigeria",
    "Sudan",
  ],
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
  Congo: ["Cameroon", "Central African Republic", "DRC", "Gabon"],
  "Costa Rica": ["Nicaragua", "Panama"],
  Croatia: [
    "Bosnia and Herzegovina",
    "Hungary",
    "Montenegro",
    "Serbia",
    "Slovenia",
  ],
  "Czech Republic": ["Austria", "Germany", "Poland", "Slovakia"],
  DRC: [
    "Angola",
    "Burundi",
    "Central African Republic",
    "Congo",
    "Rwanda",
    "South Sudan",
    "Tanzania",
    "Uganda",
    "Zambia",
  ],
  Denmark: ["Germany"],
  Djibouti: ["Eritrea", "Ethiopia", "Somalia"],
  Ecuador: ["Colombia", "Peru"],
  Egypt: ["Israel", "Libya", "Sudan"],
  "El Salvador": ["Guatemala", "Honduras"],
  "Equatorial Guinea": ["Cameroon", "Gabon"],
  Eritrea: ["Djibouti", "Ethiopia", "Sudan"],
  Estonia: ["Latvia", "Russia"],
  Eswatini: ["Mozambique", "South Africa"],
  Ethiopia: ["Djibouti", "Eritrea", "Kenya", "Somalia", "South Sudan", "Sudan"],
  Finland: ["Norway", "Russia", "Sweden"],
  France: [
    "Andorra",
    "Belgium",
    "Germany",
    "Italy",
    "Luxembourg",
    "Monaco",
    "Spain",
    "Switzerland",
  ],
  Gabon: ["Cameroon", "Congo", "Equatorial Guinea"],
  Gambia: ["Senegal"],
  Georgia: ["Armenia", "Azerbaijan", "Russia", "Turkey"],
  Germany: [
    "Austria",
    "Belgium",
    "Czech Republic",
    "Denmark",
    "France",
    "Luxembourg",
    "Netherlands",
    "Poland",
    "Switzerland",
  ],
  Ghana: ["Burkina Faso", "Ivory Coast", "Togo"],
  Greece: ["Albania", "Bulgaria", "North Macedonia", "Turkey"],
  Guatemala: ["Belize", "El Salvador", "Honduras", "Mexico"],
  Guinea: [
    "Guinea-Bissau",
    "Ivory Coast",
    "Liberia",
    "Mali",
    "Senegal",
    "Sierra Leone",
  ],
  "Guinea-Bissau": ["Guinea", "Senegal"],
  Guyana: ["Brazil", "Suriname", "Venezuela"],
  Haiti: ["Dominican Republic"],
  Honduras: ["El Salvador", "Guatemala", "Nicaragua"],
  Hungary: [
    "Austria",
    "Croatia",
    "Romania",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Ukraine",
  ],
  Iceland: [],
  India: ["Bangladesh", "Bhutan", "China", "Myanmar", "Nepal", "Pakistan"],
  Iran: [
    "Afghanistan",
    "Armenia",
    "Azerbaijan",
    "Iraq",
    "Pakistan",
    "Turkey",
    "Turkmenistan",
  ],
  Iraq: ["Iran", "Jordan", "Kuwait", "Saudi Arabia", "Syria", "Turkey"],
  Ireland: ["United Kingdom"],
  Israel: ["Egypt", "Jordan", "Lebanon", "Syria"],
  Italy: [
    "Austria",
    "France",
    "San Marino",
    "Slovenia",
    "Switzerland",
    "Vatican City",
  ],
  Japan: [],
  Jordan: ["Iraq", "Israel", "Saudi Arabia", "Syria"],
  Kazakhstan: ["China", "Kyrgyzstan", "Russia", "Turkmenistan", "Uzbekistan"],
  Kenya: ["Ethiopia", "Somalia", "South Sudan", "Tanzania", "Uganda"],
  Kuwait: ["Iraq", "Saudi Arabia"],
  Kyrgyzstan: ["China", "Kazakhstan", "Tajikistan", "Uzbekistan"],
  Laos: ["Cambodia", "China", "Myanmar", "Thailand", "Vietnam"],
  Latvia: ["Belarus", "Estonia", "Lithuania", "Russia"],
  Lebanon: ["Israel", "Syria"],
  Lesotho: ["South Africa"],
  Liberia: ["Guinea", "Ivory Coast", "Sierra Leone"],
  Libya: ["Algeria", "Chad", "Egypt", "Niger", "Sudan", "Tunisia"],
  Liechtenstein: ["Austria", "Switzerland"],
  Lithuania: ["Belarus", "Latvia", "Poland", "Russia"],
  Luxembourg: ["Belgium", "France", "Germany"],
  Malawi: ["Mozambique", "Tanzania", "Zambia"],
  Mali: [
    "Algeria",
    "Burkina Faso",
    "Guinea",
    "Ivory Coast",
    "Mauritania",
    "Niger",
    "Senegal",
  ],
  Mauritania: ["Algeria", "Mali", "Senegal"],
  Mexico: ["Belize", "Guatemala", "United States"],
  Moldova: ["Romania", "Ukraine"],
  Monaco: ["France"],
  Mongolia: ["China", "Russia"],
  Montenegro: [
    "Albania",
    "Bosnia and Herzegovina",
    "Croatia",
    "Kosovo",
    "Serbia",
  ],
  Morocco: ["Algeria", "Spain"],
  Mozambique: [
    "Eswatini",
    "Malawi",
    "South Africa",
    "Tanzania",
    "Zambia",
    "Zimbabwe",
  ],
  Myanmar: ["Bangladesh", "China", "India", "Laos", "Thailand"],
  Namibia: ["Angola", "Botswana", "South Africa", "Zambia"],
  Nepal: ["China", "India"],
  Netherlands: ["Belgium", "Germany"],
  Nicaragua: ["Costa Rica", "Honduras"],
  Niger: [
    "Algeria",
    "Benin",
    "Burkina Faso",
    "Chad",
    "Libya",
    "Mali",
    "Nigeria",
  ],
  Nigeria: ["Benin", "Cameroon", "Chad", "Niger"],
  "North Korea": ["China", "Russia", "South Korea"],
  "North Macedonia": ["Albania", "Bulgaria", "Greece", "Kosovo", "Serbia"],
  Norway: ["Finland", "Russia", "Sweden"],
  Oman: ["Saudi Arabia", "United Arab Emirates", "Yemen"],
  Pakistan: ["Afghanistan", "China", "India", "Iran"],
  Palestine: ["Israel", "Jordan"],
  Panama: ["Colombia", "Costa Rica"],
  Paraguay: ["Argentina", "Bolivia", "Brazil"],
  Peru: ["Bolivia", "Brazil", "Chile", "Colombia", "Ecuador"],
  Poland: [
    "Belarus",
    "Czech Republic",
    "Germany",
    "Lithuania",
    "Russia",
    "Slovakia",
    "Ukraine",
  ],
  Portugal: ["Spain"],
  Romania: ["Bulgaria", "Hungary", "Moldova", "Serbia", "Ukraine"],
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
  Rwanda: ["Burundi", "DRC", "Tanzania", "Uganda"],
  "San Marino": ["Italy"],
  "Saudi Arabia": [
    "Iraq",
    "Jordan",
    "Kuwait",
    "Oman",
    "United Arab Emirates",
    "Yemen",
  ],
  Senegal: ["Gambia", "Guinea", "Guinea-Bissau", "Mali", "Mauritania"],
  Serbia: [
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Croatia",
    "Hungary",
    "Montenegro",
    "North Macedonia",
    "Romania",
  ],
  Slovakia: ["Austria", "Czech Republic", "Hungary", "Poland", "Ukraine"],
  Slovenia: ["Austria", "Croatia", "Hungary", "Italy"],
  Somalia: ["Djibouti", "Ethiopia", "Kenya"],
  "South Africa": [
    "Botswana",
    "Eswatini",
    "Lesotho",
    "Mozambique",
    "Namibia",
    "Zimbabwe",
  ],
  "South Korea": ["North Korea"],
  "South Sudan": [
    "Central African Republic",
    "DRC",
    "Ethiopia",
    "Kenya",
    "Sudan",
    "Uganda",
  ],
  Spain: ["Andorra", "France", "Portugal", "Morocco"],
  Sudan: [
    "Central African Republic",
    "Chad",
    "Egypt",
    "Eritrea",
    "Ethiopia",
    "Libya",
    "South Sudan",
  ],
  Suriname: ["Brazil", "Guyana"],
  Sweden: ["Finland", "Norway"],
  Switzerland: ["Austria", "France", "Germany", "Italy", "Liechtenstein"],
  Syria: ["Iraq", "Israel", "Jordan", "Lebanon", "Turkey"],
  Tajikistan: ["Afghanistan", "China", "Kyrgyzstan", "Uzbekistan"],
  Tanzania: [
    "Burundi",
    "DRC",
    "Kenya",
    "Malawi",
    "Mozambique",
    "Rwanda",
    "Uganda",
    "Zambia",
  ],
  Thailand: ["Cambodia", "Laos", "Malaysia", "Myanmar"],
  Tunisia: ["Algeria", "Libya"],
  Turkey: [
    "Armenia",
    "Azerbaijan",
    "Bulgaria",
    "Georgia",
    "Greece",
    "Iran",
    "Iraq",
    "Syria",
  ],
  Turkmenistan: ["Afghanistan", "Iran", "Kazakhstan", "Uzbekistan"],
  "United Arab Emirates": ["Oman", "Saudi Arabia"],
  "United Kingdom": ["Ireland"],
  "United States": ["Canada", "Mexico"],
  Uganda: ["DRC", "Kenya", "Rwanda", "South Sudan", "Tanzania"],
  Ukraine: [
    "Belarus",
    "Hungary",
    "Moldova",
    "Poland",
    "Romania",
    "Russia",
    "Slovakia",
  ],
  Uruguay: ["Argentina", "Brazil"],
  Uzbekistan: [
    "Afghanistan",
    "Kazakhstan",
    "Kyrgyzstan",
    "Tajikistan",
    "Turkmenistan",
  ],
  "Vatican City": ["Italy"],
  Venezuela: ["Brazil", "Colombia", "Guyana"],
  Vietnam: ["Cambodia", "China", "Laos"],
  Yemen: ["Oman", "Saudi Arabia"],
  Zambia: [
    "Angola",
    "Botswana",
    "DRC",
    "Malawi",
    "Mozambique",
    "Namibia",
    "Tanzania",
    "Zimbabwe",
  ],
  Zimbabwe: ["Botswana", "Mozambique", "South Africa", "Zambia"],
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
