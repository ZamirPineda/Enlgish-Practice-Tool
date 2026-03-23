import React from "react";
import { motion } from "framer-motion";
import { StopCategory, StopItem } from "@/types";
import CountryMapPreview from "@/components/game/CountryMapPreview";
import {
  getCountryReferenceByCapital,
  getCountryReferenceByName,
} from "@/lib/geographyReference";

interface StopCategorySpotlightProps {
  item: StopItem;
  category: StopCategory;
  title?: string;
  className?: string;
}

const ANIMAL_PROFILES: Record<
  string,
  { icon: string; habitat: string; trait: string; palette: string }
> = {
  Mammal: {
    icon: "Paw",
    habitat: "Grasslands, forests, or mountains",
    trait: "Warm-blooded and usually fur-covered",
    palette: "from-amber-500/30 via-orange-400/15 to-rose-500/20",
  },
  Bird: {
    icon: "Wing",
    habitat: "Skies, cliffs, wetlands, or forests",
    trait: "Feathered and adapted for flight or gliding",
    palette: "from-sky-500/30 via-cyan-400/15 to-indigo-500/20",
  },
  Reptile: {
    icon: "Scale",
    habitat: "Warm rocks, rivers, deserts, or swamps",
    trait: "Cold-blooded with scaly skin",
    palette: "from-emerald-500/30 via-lime-400/15 to-teal-500/20",
  },
  Fish: {
    icon: "Wave",
    habitat: "Rivers, lakes, reefs, or open ocean",
    trait: "Aquatic and adapted to gills and fins",
    palette: "from-blue-500/30 via-cyan-400/15 to-teal-500/20",
  },
  Marine: {
    icon: "Tide",
    habitat: "Coasts, reefs, and deep ocean zones",
    trait: "Marine-adapted body and saltwater resilience",
    palette: "from-cyan-500/30 via-sky-400/15 to-blue-600/20",
  },
  Mollusk: {
    icon: "Shell",
    habitat: "Rocky shores and coastal waters",
    trait: "Soft-bodied, often shell-protected",
    palette: "from-fuchsia-500/25 via-pink-400/15 to-violet-500/20",
  },
  Amphibian: {
    icon: "Ripple",
    habitat: "Wetlands, ponds, and humid forests",
    trait: "Life cycle linked to both water and land",
    palette: "from-lime-500/25 via-emerald-400/15 to-cyan-500/20",
  },
  Microorganism: {
    icon: "Cell",
    habitat: "Water, soil, or microscopic ecosystems",
    trait: "Microscopic scale and high adaptability",
    palette: "from-violet-500/25 via-fuchsia-400/15 to-sky-500/20",
  },
  Condition: {
    icon: "Mark",
    habitat: "Observed across multiple species",
    trait: "Distinctive biological condition rather than species",
    palette: "from-slate-500/30 via-zinc-400/15 to-stone-500/20",
  },
  Class: {
    icon: "Atlas",
    habitat: "Multiple habitats depending on the species",
    trait: "Taxonomic grouping rather than one animal",
    palette: "from-indigo-500/30 via-violet-400/15 to-sky-500/20",
  },
};

const supportsStopCategorySpotlight = (category: string | undefined) =>
  category === "Countries" ||
  category === "Capitals" ||
  category === "Colors" ||
  category === "Animals" ||
  category === "World Landmarks" ||
  category === "Sports" ||
  category === "Body Parts" ||
  category === "Clothing" ||
  category === "Occupations" ||
  category === "Household Items" ||
  category === "Tools";

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return null;
  const value = Number.parseInt(normalized, 16);
  if (Number.isNaN(value)) return null;
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const getColorFamily = (hex: string) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return "Custom shade";

  const { r, g, b } = rgb;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta < 18) return max > 200 ? "Near-neutral light" : "Near-neutral dark";
  if (max === r && g > b) return "Warm red-orange";
  if (max === r) return "Magenta-red";
  if (max === g && b > r) return "Fresh cyan-green";
  if (max === g) return "Earthy green";
  if (max === b && r > g) return "Violet-blue";
  return "Cool blue";
};

const getReadableTextColor = (hex: string) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#081220";
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.62 ? "#081220" : "#f8fafc";
};

const getAnimalProfile = (tag: string | undefined) =>
  ANIMAL_PROFILES[tag || ""] ?? {
    icon: "Wild",
    habitat: "Varied ecosystems across the world",
    trait: "Distinctive wildlife profile",
    palette: "from-slate-500/30 via-sky-400/15 to-emerald-500/20",
  };

const getLandmarkProfile = (item: StopItem) => {
  const word = item.word.toLowerCase();
  if (
    word.includes("tower") ||
    word.includes("obelisk") ||
    word.includes("needle")
  ) {
    return {
      type: "Vertical Monument",
      fact: "Dominated by a tall vertical silhouette",
      palette: "from-slate-900 via-sky-800/80 to-cyan-500/30",
      icon: "tower",
    };
  }
  if (
    word.includes("bridge") ||
    word.includes("gate") ||
    word.includes("arch")
  ) {
    return {
      type: "Gateway Landmark",
      fact: "Built around passage, framing, or connection",
      palette: "from-orange-900/90 via-amber-700/55 to-rose-400/25",
      icon: "arch",
    };
  }
  if (
    word.includes("temple") ||
    word.includes("cathedral") ||
    word.includes("mosque") ||
    word.includes("basilica") ||
    word.includes("fort") ||
    word.includes("palace") ||
    word.includes("acropolis") ||
    word.includes("castle")
  ) {
    return {
      type: "Historic Complex",
      fact: "Recognized for ceremonial or defensive architecture",
      palette: "from-stone-900 via-amber-800/70 to-yellow-500/20",
      icon: "temple",
    };
  }
  if (
    word.includes("forest") ||
    word.includes("falls") ||
    word.includes("mount") ||
    word.includes("rock") ||
    word.includes("reef")
  ) {
    return {
      type: "Natural Wonder",
      fact: "Celebrated for geography, scale, or ecosystem value",
      palette: "from-emerald-900 via-teal-700/70 to-cyan-500/20",
      icon: "nature",
    };
  }
  return {
    type: "Iconic Landmark",
    fact: "High-recognition destination with strong cultural identity",
    palette: "from-indigo-900 via-violet-700/65 to-sky-500/20",
    icon: "landmark",
  };
};

const getSportProfile = (item: StopItem) => {
  const word = item.word.toLowerCase();
  if (
    word.includes("football") ||
    word.includes("rugby") ||
    word.includes("soccer") ||
    word.includes("baseball") ||
    word.includes("softball") ||
    word.includes("cricket") ||
    word.includes("polo")
  ) {
    return {
      type: "Field Sport",
      arena: "Open field or pitch",
      pace: "Tactical spacing and long-range movement",
      palette: "from-emerald-900 via-green-700/70 to-lime-500/20",
      icon: "field",
    };
  }
  if (
    word.includes("basketball") ||
    word.includes("volleyball") ||
    word.includes("handball") ||
    word.includes("badminton") ||
    word.includes("squash") ||
    word.includes("tennis")
  ) {
    return {
      type: "Court Sport",
      arena: "Marked court or enclosed arena",
      pace: "Fast exchanges with tight positioning",
      palette: "from-orange-900 via-amber-700/70 to-yellow-500/20",
      icon: "court",
    };
  }
  if (
    word.includes("swimming") ||
    word.includes("rowing") ||
    word.includes("canoeing") ||
    word.includes("aquatics") ||
    word.includes("surf") ||
    word.includes("water")
  ) {
    return {
      type: "Water Sport",
      arena: "Pool, river, lake, or open water",
      pace: "Fluid rhythm and endurance under resistance",
      palette: "from-sky-900 via-cyan-700/70 to-blue-500/20",
      icon: "water",
    };
  }
  if (
    word.includes("ski") ||
    word.includes("snow") ||
    word.includes("bobsleigh") ||
    word.includes("curling") ||
    word.includes("ice")
  ) {
    return {
      type: "Winter Sport",
      arena: "Snow track, slope, or ice surface",
      pace: "Balance, precision, and cold-weather speed",
      palette: "from-slate-900 via-sky-700/55 to-cyan-300/25",
      icon: "winter",
    };
  }
  if (
    word.includes("boxing") ||
    word.includes("wrestling") ||
    word.includes("judo") ||
    word.includes("karate") ||
    word.includes("taekwondo") ||
    word.includes("aikido") ||
    word.includes("combat")
  ) {
    return {
      type: "Combat Sport",
      arena: "Mat, ring, or controlled bout space",
      pace: "Explosive exchanges and close control",
      palette: "from-rose-950 via-red-700/70 to-orange-500/20",
      icon: "combat",
    };
  }
  return {
    type: "Specialty Sport",
    arena: "Custom competitive environment",
    pace: "Skill-driven format with unique rules",
    palette: "from-violet-950 via-fuchsia-700/65 to-sky-500/20",
    icon: "sport",
  };
};

const getBodyPartProfile = (item: StopItem) => {
  const location = (item.location || "").toLowerCase();
  if (
    location.includes("head") ||
    location.includes("face") ||
    location.includes("ear")
  ) {
    return {
      zone: "Head Zone",
      focus: "Expression, senses, and facial detail",
      palette: "from-fuchsia-900 via-rose-700/70 to-orange-400/20",
      icon: "head",
    };
  }
  if (
    location.includes("neck") ||
    location.includes("throat") ||
    location.includes("chest") ||
    location.includes("heart")
  ) {
    return {
      zone: "Upper Core",
      focus: "Breathing, voice, and vital organs",
      palette: "from-rose-950 via-red-700/70 to-pink-400/20",
      icon: "core",
    };
  }
  if (
    location.includes("arm") ||
    location.includes("upper limb") ||
    location.includes("hand")
  ) {
    return {
      zone: "Upper Limb",
      focus: "Reach, grip, and fine motor control",
      palette: "from-sky-950 via-cyan-700/70 to-blue-400/20",
      icon: "arm",
    };
  }
  if (
    location.includes("leg") ||
    location.includes("foot") ||
    location.includes("ankle")
  ) {
    return {
      zone: "Lower Limb",
      focus: "Balance, support, and movement",
      palette: "from-emerald-950 via-teal-700/70 to-lime-400/20",
      icon: "leg",
    };
  }
  if (location.includes("torso") || location.includes("abdomen")) {
    return {
      zone: "Torso",
      focus: "Structure, posture, and central support",
      palette: "from-amber-950 via-orange-700/70 to-yellow-400/20",
      icon: "torso",
    };
  }
  if (location.includes("internal") || location.includes("lung")) {
    return {
      zone: "Internal System",
      focus: "Hidden anatomy and internal function",
      palette: "from-violet-950 via-indigo-700/70 to-sky-400/20",
      icon: "internal",
    };
  }
  return {
    zone: item.location || "Body System",
    focus: "Anatomy vocabulary anchored to body structure",
    palette: "from-slate-950 via-zinc-700/70 to-cyan-400/20",
    icon: "body",
  };
};

const getClothingProfile = (item: StopItem) => {
  const clothingType = (item.clothingType || "").toLowerCase();
  if (clothingType.includes("outerwear")) {
    return {
      family: "Outer Layer",
      role: "Protection against weather and exposure",
      palette: "from-slate-950 via-zinc-700/70 to-sky-400/20",
      icon: "coat",
    };
  }
  if (clothingType.includes("headwear")) {
    return {
      family: "Headwear",
      role: "Covers or styles the head area",
      palette: "from-violet-950 via-fuchsia-700/70 to-rose-400/20",
      icon: "hat",
    };
  }
  if (clothingType.includes("footwear")) {
    return {
      family: "Footwear",
      role: "Built for footing, comfort, and movement",
      palette: "from-emerald-950 via-teal-700/70 to-lime-400/20",
      icon: "shoe",
    };
  }
  if (clothingType.includes("accessory") || clothingType.includes("jewelry")) {
    return {
      family: "Accessory",
      role: "Adds detail, utility, or personal style",
      palette: "from-amber-950 via-orange-700/70 to-yellow-400/20",
      icon: "accessory",
    };
  }
  if (
    clothingType.includes("sportswear") ||
    clothingType.includes("swimwear")
  ) {
    return {
      family: "Performance Wear",
      role: "Optimized for activity, motion, or training",
      palette: "from-sky-950 via-blue-700/70 to-cyan-400/20",
      icon: "sport",
    };
  }
  if (clothingType.includes("full body") || clothingType.includes("dress")) {
    return {
      family: "Full Outfit",
      role: "Covers most of the body in one silhouette",
      palette: "from-rose-950 via-pink-700/70 to-fuchsia-400/20",
      icon: "dress",
    };
  }
  if (clothingType.includes("top")) {
    return {
      family: "Top Layer",
      role: "Designed for the upper body",
      palette: "from-indigo-950 via-violet-700/70 to-sky-400/20",
      icon: "top",
    };
  }
  if (clothingType.includes("bottom")) {
    return {
      family: "Bottom Layer",
      role: "Designed for lower-body movement and fit",
      palette: "from-teal-950 via-emerald-700/70 to-cyan-400/20",
      icon: "bottom",
    };
  }
  return {
    family: item.clothingType || "Clothing",
    role: "Wardrobe vocabulary tied to style and function",
    palette: "from-slate-950 via-zinc-700/70 to-fuchsia-400/20",
    icon: "wardrobe",
  };
};

const getOccupationProfile = (item: StopItem) => {
  const word = item.word.toLowerCase();
  if (
    word.includes("doctor") ||
    word.includes("nurse") ||
    word.includes("surgeon") ||
    word.includes("therapist") ||
    word.includes("veter") ||
    word.includes("pharmac")
  ) {
    return {
      family: "Care Profession",
      setting: "Clinic, hospital, or care environment",
      focus: "People-facing work centered on treatment or support",
      palette: "from-emerald-950 via-teal-700/70 to-cyan-400/20",
      icon: "care",
    };
  }
  if (
    word.includes("teacher") ||
    word.includes("professor") ||
    word.includes("tutor") ||
    word.includes("coach") ||
    word.includes("instructor")
  ) {
    return {
      family: "Teaching Role",
      setting: "Classroom, training floor, or learning environment",
      focus: "Guides people through knowledge and practice",
      palette: "from-indigo-950 via-violet-700/70 to-sky-400/20",
      icon: "teaching",
    };
  }
  if (
    word.includes("engineer") ||
    word.includes("developer") ||
    word.includes("architect") ||
    word.includes("designer") ||
    word.includes("technician")
  ) {
    return {
      family: "Technical Role",
      setting: "Studio, lab, office, or build environment",
      focus: "Problem-solving work with systems, tools, or design",
      palette: "from-slate-950 via-zinc-700/70 to-sky-400/20",
      icon: "technical",
    };
  }
  if (
    word.includes("artist") ||
    word.includes("actor") ||
    word.includes("animator") ||
    word.includes("writer") ||
    word.includes("musician") ||
    word.includes("photographer")
  ) {
    return {
      family: "Creative Role",
      setting: "Stage, studio, set, or independent practice",
      focus: "Expressive work built on style and output",
      palette: "from-fuchsia-950 via-rose-700/70 to-orange-400/20",
      icon: "creative",
    };
  }
  return {
    family: "Professional Role",
    setting: "Workplace shaped by the job itself",
    focus: "Task-based role inside a social or economic system",
    palette: "from-amber-950 via-orange-700/70 to-yellow-400/20",
    icon: "profession",
  };
};

const getHouseholdProfile = (item: StopItem) => {
  const word = item.word.toLowerCase();
  const definition = (item.definition || "").toLowerCase();
  if (
    word.includes("chair") ||
    word.includes("sofa") ||
    word.includes("bed") ||
    word.includes("table") ||
    definition.includes("comfortable chair")
  ) {
    return {
      family: "Furniture",
      room: "Living room or bedroom zone",
      focus: "Supports sitting, resting, or arranging a room",
      palette: "from-stone-950 via-amber-800/65 to-yellow-400/20",
      icon: "furniture",
    };
  }
  if (
    word.includes("clock") ||
    word.includes("lamp") ||
    word.includes("antenna") ||
    word.includes("purifier") ||
    word.includes("conditioner") ||
    definition.includes("device")
  ) {
    return {
      family: "Home Device",
      room: "Utility or comfort-focused room area",
      focus: "Runs on power or provides household function",
      palette: "from-slate-950 via-zinc-700/70 to-cyan-400/20",
      icon: "device",
    };
  }
  if (
    word.includes("foil") ||
    word.includes("apron") ||
    word.includes("dish") ||
    word.includes("pan") ||
    word.includes("kettle")
  ) {
    return {
      family: "Kitchen Essential",
      room: "Kitchen workspace",
      focus: "Used around food, cooking, or preparation",
      palette: "from-orange-950 via-amber-700/70 to-lime-400/20",
      icon: "kitchen",
    };
  }
  return {
    family: "Household Item",
    room: "General home environment",
    focus: "Everyday object that supports comfort or routine",
    palette: "from-emerald-950 via-teal-700/70 to-sky-400/20",
    icon: "home",
  };
};

const getToolProfile = (item: StopItem) => {
  const toolType = (item.toolType || "").toLowerCase();
  if (toolType.includes("power")) {
    return {
      family: "Power Tool",
      workspace: "Workshop or heavy-duty task area",
      focus: "Motorized force for speed and efficiency",
      palette: "from-red-950 via-orange-700/70 to-yellow-400/20",
      icon: "power",
    };
  }
  if (toolType.includes("measuring")) {
    return {
      family: "Measuring Tool",
      workspace: "Precision setup or inspection area",
      focus: "Accuracy, calibration, and alignment",
      palette: "from-indigo-950 via-sky-700/70 to-cyan-400/20",
      icon: "measure",
    };
  }
  if (toolType.includes("electrical")) {
    return {
      family: "Electrical Tool",
      workspace: "Wiring, testing, or powered systems",
      focus: "Current, circuits, or electronic handling",
      palette: "from-violet-950 via-fuchsia-700/70 to-sky-400/20",
      icon: "electrical",
    };
  }
  if (
    toolType.includes("garden") ||
    toolType.includes("outdoor") ||
    toolType.includes("farming")
  ) {
    return {
      family: "Outdoor Tool",
      workspace: "Garden, field, or exterior workspace",
      focus: "Manual work in open or rugged environments",
      palette: "from-emerald-950 via-green-700/70 to-lime-400/20",
      icon: "outdoor",
    };
  }
  return {
    family: item.toolType || "General Tool",
    workspace: "Task-oriented workbench or utility area",
    focus: "Practical work built around grip, force, and control",
    palette: "from-slate-950 via-zinc-700/70 to-amber-400/20",
    icon: "tool",
  };
};

const AnimalGlyph: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case "Wing":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M20 78c22-4 35-16 47-44 8-18 20-28 33-34-1 19-7 33-17 44 9-1 16-3 23-8-4 13-12 23-24 31 7 2 12 2 18 1-10 11-22 18-38 21-18 4-31 2-42-11Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Scale":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M18 66c16-22 39-34 70-36-8 20-22 35-43 48 16 1 28 7 38 18-24 5-45 2-62-11-10-7-12-11-3-19Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M41 49c6 4 10 8 12 14M56 44c6 4 10 9 12 15M70 40c5 4 9 8 11 14"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Wave":
    case "Tide":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M18 73c11-20 25-30 44-31 13 0 24 4 40 17-7 7-16 12-27 16 11 4 19 10 24 19-19 3-35 0-50-9-12-7-23-9-31-12Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="83" cy="52" r="4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Shell":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M60 27c22 0 37 18 37 38 0 18-12 30-29 30H35c-7 0-12-6-12-13 0-12 8-22 20-27 4-16 16-28 17-28Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M51 39c8 8 12 18 13 31M42 50c9 4 16 11 21 22M61 34c13 7 21 19 24 34"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Ripple":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M35 78c0-14 11-25 25-25s25 11 25 25"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M24 89c8-7 19-11 36-11s28 4 36 11"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="60" cy="43" r="12" strokeWidth="6" />
        </svg>
      );
    case "Cell":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <circle cx="60" cy="60" r="36" strokeWidth="6" />
          <circle cx="54" cy="55" r="10" strokeWidth="5" />
          <path
            d="M38 77c8-4 16-5 24-3 8 2 13 7 20 12"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Paw":
    case "Wild":
    case "Mark":
    case "Atlas":
    default:
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <circle cx="60" cy="74" r="20" strokeWidth="6" />
          <circle cx="34" cy="46" r="8" strokeWidth="6" />
          <circle cx="52" cy="32" r="8" strokeWidth="6" />
          <circle cx="69" cy="32" r="8" strokeWidth="6" />
          <circle cx="86" cy="46" r="8" strokeWidth="6" />
        </svg>
      );
  }
};

const LandmarkGlyph: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case "tower":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M59 18 45 102h30L61 18h-2Z"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path
            d="M40 42h40M35 61h50M31 80h58"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "arch":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M25 95h70M34 95V60c0-16 11-29 26-29s26 13 26 29v35M50 95V66c0-7 5-12 10-12s10 5 10 12v29"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "nature":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="m20 90 24-40 18 22 15-18 23 36H20Z"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path
            d="M77 26c8 5 12 13 12 22-9-4-16-11-22-20 3-2 6-3 10-2Z"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "temple":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M20 45 60 24l40 21H20ZM28 94V49M46 94V49M74 94V49M92 94V49M20 95h80"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "landmark":
    default:
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M24 94h72M36 94V58l24-22 24 22v36M48 94V69h24v25"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

const SportGlyph: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case "field":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <rect x="20" y="28" width="80" height="64" rx="8" strokeWidth="6" />
          <path
            d="M60 28v64M20 60h80M45 45c8 10 8 20 0 30M75 45c-8 10-8 20 0 30"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "court":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <rect x="24" y="28" width="72" height="64" rx="8" strokeWidth="6" />
          <path
            d="M60 28v64M42 42h36M42 78h36"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "water":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M24 53c7 0 7 6 14 6s7-6 14-6 7 6 14 6 7-6 14-6 7 6 14 6 7-6 14-6"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M24 71c7 0 7 6 14 6s7-6 14-6 7 6 14 6 7-6 14-6 7 6 14 6 7-6 14-6"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="39" cy="36" r="7" strokeWidth="5" />
        </svg>
      );
    case "winter":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M31 88 88 31M43 94h51M25 76l18 18"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M75 61 94 80M80 26v18M71 35h18"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "combat":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M34 68c0-10 8-18 18-18h16v34H52c-10 0-18-8-18-16ZM86 68c0-10-8-18-18-18H52v34h16c10 0 18-8 18-16Z"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path d="M52 50V36M68 50V36" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "sport":
    default:
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <circle cx="60" cy="60" r="28" strokeWidth="6" />
          <path
            d="M43 39c9 10 25 10 34 0M39 77c12-4 30-4 42 0M34 56c7 8 13 19 13 32M86 56c-7 8-13 19-13 32"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

const BodyPartGlyph: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case "head":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <circle cx="60" cy="34" r="16" strokeWidth="6" />
          <path
            d="M44 95V70c0-11 7-18 16-18s16 7 16 18v25M60 50v16"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "arm":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M35 38c6-3 14-1 18 4l12 16c4 5 6 12 4 18l-4 16M65 63l17-8c7-3 15 0 19 7 3 7 0 14-7 18L74 90"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "leg":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M48 25v30l-10 38M72 25v36l14 32M39 93h21M69 93h20"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "torso":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M43 24c4 8 11 12 17 12s13-4 17-12M38 39h44l-8 55H46l-8-55Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "internal":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M60 22v76M60 46c-10-12-24-8-24 8 0 12 9 21 24 29 15-8 24-17 24-29 0-16-14-20-24-8Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "core":
    case "body":
    default:
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <circle cx="60" cy="24" r="12" strokeWidth="6" />
          <path
            d="M60 36v23M42 49l18 10 18-10M48 95l4-22 8-14 8 14 4 22M32 71l20-8M88 71l-20-8"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

const ClothingGlyph: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case "hat":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M36 61c0-15 11-27 24-27s24 12 24 27M26 70h68M38 70l4 18h36l4-18"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shoe":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M26 78h68c0 9-7 16-16 16H35c-5 0-9-4-9-9v-7ZM39 77l7-25 14 8c8 4 13 10 16 17"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "dress":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M47 26c3 6 7 9 13 9s10-3 13-9M53 35l-7 18 14 16-20 25h40L60 69l14-16-7-18"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "top":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M40 30h40l10 18-12 10-8-12v48H50V46l-8 12-12-10 10-18Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bottom":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M42 27h36l6 66H64l-4-32-4 32H36l6-66Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "accessory":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <circle cx="47" cy="60" r="14" strokeWidth="6" />
          <circle cx="73" cy="60" r="14" strokeWidth="6" />
          <path
            d="M61 57h8M33 60H22M98 60H87"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "coat":
    case "sport":
    case "wardrobe":
    default:
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M42 24h36l10 18-8 11-10-11v52H50V42L40 53l-8-11 10-18Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

const OccupationGlyph: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case "care":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path d="M60 33v50M35 58h50" strokeWidth="6" strokeLinecap="round" />
          <circle cx="60" cy="58" r="28" strokeWidth="6" />
        </svg>
      );
    case "teaching":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M22 38h76v42H22zM98 38l0 42M38 94h44"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M42 58h36M42 70h24" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "technical":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="m36 76-14 14M84 76l14 14M72 30l8 14 16 4-12 12 3 17-15-8-15 8 3-17-12-12 16-4 8-14Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "creative":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M34 76c0-23 15-40 36-40 10 0 19 4 24 10 7 7 9 17 4 25-4 7-13 7-19 5-7-2-11 2-11 8 0 5 4 10 10 13H47c-8-6-13-13-13-21Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="46" cy="52" r="4" fill="currentColor" stroke="none" />
          <circle cx="60" cy="48" r="4" fill="currentColor" stroke="none" />
          <circle cx="74" cy="54" r="4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "profession":
    default:
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <rect x="28" y="38" width="64" height="48" rx="8" strokeWidth="6" />
          <path
            d="M46 38v-8c0-4 3-7 7-7h14c4 0 7 3 7 7v8M28 58h64"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

const HouseholdGlyph: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case "furniture":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M30 62c0-12 10-22 22-22h16c12 0 22 10 22 22v18H30V62ZM36 80v14M84 80v14"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "device":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <rect x="30" y="24" width="60" height="72" rx="10" strokeWidth="6" />
          <path
            d="M44 42h32M44 56h20M44 70h24"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "kitchen":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M40 24v42M32 24v18M48 24v18M76 24c10 0 16 9 16 19s-6 19-16 19V24ZM40 66v28M76 62v32"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "home":
    default:
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M24 56 60 28l36 28v38H24V56ZM48 94V66h24v28"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

const ToolGlyph: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case "power":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M44 34h22c10 0 18 8 18 18v7H68l-8 10v17H44V34ZM60 22v12"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "measure":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <rect x="24" y="38" width="72" height="44" rx="6" strokeWidth="6" />
          <path
            d="M34 38v10M46 38v6M58 38v10M70 38v6M82 38v10"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "electrical":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="m63 24-20 30h15l-1 20 20-30H62l1-20ZM44 93h32"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "outdoor":
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="M38 32c20 0 35 14 41 36M34 88l41-41M75 47l11-11"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tool":
    default:
      return (
        <svg
          viewBox="0 0 120 120"
          className="h-24 w-24 fill-none stroke-current"
        >
          <path
            d="m77 29 14 14-9 9-14-14M49 57l28-28M33 87l16-16 14 14-16 16H33v-14Z"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

const ColorSpotlightCard: React.FC<{
  item: StopItem;
  title: string;
  className?: string;
}> = ({ item, title, className = "" }) => {
  if (!item.hex) return null;

  const readableTextColor = getReadableTextColor(item.hex);
  const rgb = hexToRgb(item.hex);
  const family = getColorFamily(item.hex);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border border-border bg-surface-2/60 ${className}`.trim()}
    >
      <div className="border-b border-border px-4 py-3">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-text-muted">
          {title}
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-text-primary">{item.word}</div>
            <div className="text-sm text-text-secondary">
              {item.translation}
            </div>
          </div>
          <div className="rounded-full border border-border bg-surface-1 px-3 py-1 font-mono text-xs text-text-primary">
            {item.hex}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.35 }}
        className="relative h-44 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${item.hex} 0%, ${item.hex}dd 42%, ${item.hex}99 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.38),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(8,18,32,0.22),transparent_36%)]" />
        <motion.div
          animate={{ rotate: [0, 4, 0], scale: [1, 1.04, 1] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute left-6 top-6 h-24 w-24 rounded-[28px] border border-white/35 bg-white/12 shadow-2xl backdrop-blur-md"
        />
        <motion.div
          animate={{ rotate: [0, -6, 0], y: [0, 4, 0] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute right-8 top-10 h-16 w-16 rounded-full border border-white/30 bg-black/10 backdrop-blur-sm"
        />
        <div className="absolute bottom-5 left-5 rounded-[24px] border border-white/25 bg-black/15 px-4 py-3 backdrop-blur-md">
          <div
            className="text-2xl font-black tracking-tight"
            style={{ color: readableTextColor }}
          >
            {item.word}
          </div>
          <div
            className="text-sm font-medium"
            style={{ color: readableTextColor }}
          >
            {family}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            RGB
          </div>
          <div className="mt-1 font-mono text-sm font-bold text-text-primary">
            {rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : "Unknown"}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Palette Feel
          </div>
          <div className="mt-1 text-sm font-bold text-accent">{family}</div>
        </div>
      </div>
    </motion.div>
  );
};

const AnimalSpotlightCard: React.FC<{
  item: StopItem;
  title: string;
  className?: string;
}> = ({ item, title, className = "" }) => {
  const profile = getAnimalProfile(item.tag);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border border-border bg-surface-2/60 ${className}`.trim()}
    >
      <div className="border-b border-border px-4 py-3">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-text-muted">
          {title}
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-text-primary">{item.word}</div>
            <div className="text-sm text-text-secondary">
              {item.translation}
            </div>
          </div>
          <div className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-semibold text-text-primary">
            {item.tag || "Animal"}
          </div>
        </div>
      </div>

      <div
        className={`relative overflow-hidden bg-gradient-to-br ${profile.palette} px-5 py-6 text-slate-50`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(8,18,32,0.28),transparent_34%)]" />
        <div className="relative flex items-center gap-5">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/20 bg-slate-950/25 text-white shadow-2xl backdrop-blur-sm"
          >
            <AnimalGlyph icon={profile.icon} />
          </motion.div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/80">
              Wildlife Profile
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight">
              {item.word}
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-100/90">
              {profile.trait}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Animal Group
          </div>
          <div className="mt-1 font-bold text-accent">
            {item.tag || "Unclassified"}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Typical Habitat
          </div>
          <div className="mt-1 text-sm font-medium text-text-primary">
            {profile.habitat}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LandmarkSpotlightCard: React.FC<{
  item: StopItem;
  title: string;
  className?: string;
}> = ({ item, title, className = "" }) => {
  const profile = getLandmarkProfile(item);
  const countryReference = getCountryReferenceByName(item.country || "");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border border-border bg-surface-2/60 ${className}`.trim()}
    >
      <div className="border-b border-border px-4 py-3">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-text-muted">
          {title}
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-text-primary">{item.word}</div>
            <div className="text-sm text-text-secondary">
              {item.translation}
            </div>
          </div>
          <div className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-semibold text-text-primary">
            {item.country || "Unknown country"}
          </div>
        </div>
      </div>

      <div
        className={`relative overflow-hidden bg-gradient-to-br ${profile.palette} px-5 py-6 text-slate-50`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0),rgba(2,6,23,0.28))]" />
        <div className="relative flex items-center gap-5">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 4.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/20 bg-slate-950/25 text-white shadow-2xl backdrop-blur-sm"
          >
            <LandmarkGlyph icon={profile.icon} />
          </motion.div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/80">
              Landmark Profile
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight">
              {profile.type}
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-100/90">
              {profile.fact}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Country
          </div>
          <div className="mt-1 flex items-center gap-2 font-bold text-accent">
            {countryReference?.flagUrl ? (
              <img
                src={countryReference.flagUrl}
                alt=""
                className="h-4 w-6 rounded-[3px] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : null}
            <span>
              {countryReference?.canonicalCountry || item.country || "Unknown"}
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Memory Hook
          </div>
          <div className="mt-1 text-sm font-medium text-text-primary">
            {item.definition || "Famous global landmark."}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SportSpotlightCard: React.FC<{
  item: StopItem;
  title: string;
  className?: string;
}> = ({ item, title, className = "" }) => {
  const profile = getSportProfile(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border border-border bg-surface-2/60 ${className}`.trim()}
    >
      <div className="border-b border-border px-4 py-3">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-text-muted">
          {title}
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-text-primary">{item.word}</div>
            <div className="text-sm text-text-secondary">
              {item.translation}
            </div>
          </div>
          <div className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-semibold text-text-primary">
            {profile.type}
          </div>
        </div>
      </div>

      <div
        className={`relative overflow-hidden bg-gradient-to-br ${profile.palette} px-5 py-6 text-slate-50`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_24%)]" />
        <div className="relative flex items-center gap-5">
          <motion.div
            animate={{ scale: [1, 1.04, 1], rotate: [0, 2, 0] }}
            transition={{
              duration: 4.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/20 bg-slate-950/25 text-white shadow-2xl backdrop-blur-sm"
          >
            <SportGlyph icon={profile.icon} />
          </motion.div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/80">
              Sport Profile
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight">
              {profile.type}
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-100/90">
              {profile.pace}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Arena
          </div>
          <div className="mt-1 font-bold text-accent">{profile.arena}</div>
        </div>
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Play Style
          </div>
          <div className="mt-1 text-sm font-medium text-text-primary">
            {profile.pace}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BodyPartSpotlightCard: React.FC<{
  item: StopItem;
  title: string;
  className?: string;
}> = ({ item, title, className = "" }) => {
  const profile = getBodyPartProfile(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border border-border bg-surface-2/60 ${className}`.trim()}
    >
      <div className="border-b border-border px-4 py-3">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-text-muted">
          {title}
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-text-primary">{item.word}</div>
            <div className="text-sm text-text-secondary">
              {item.translation}
            </div>
          </div>
          <div className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-semibold text-text-primary">
            {profile.zone}
          </div>
        </div>
      </div>

      <div
        className={`relative overflow-hidden bg-gradient-to-br ${profile.palette} px-5 py-6 text-slate-50`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_24%)]" />
        <div className="relative flex items-center gap-5">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 4.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/20 bg-slate-950/25 text-white shadow-2xl backdrop-blur-sm"
          >
            <BodyPartGlyph icon={profile.icon} />
          </motion.div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/80">
              Anatomy Profile
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight">
              {profile.zone}
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-100/90">
              {profile.focus}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Body Area
          </div>
          <div className="mt-1 font-bold text-accent">
            {item.location || "General anatomy"}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Study Hook
          </div>
          <div className="mt-1 text-sm font-medium text-text-primary">
            {profile.focus}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ClothingSpotlightCard: React.FC<{
  item: StopItem;
  title: string;
  className?: string;
}> = ({ item, title, className = "" }) => {
  const profile = getClothingProfile(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border border-border bg-surface-2/60 ${className}`.trim()}
    >
      <div className="border-b border-border px-4 py-3">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-text-muted">
          {title}
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-text-primary">{item.word}</div>
            <div className="text-sm text-text-secondary">
              {item.translation}
            </div>
          </div>
          <div className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-semibold text-text-primary">
            {profile.family}
          </div>
        </div>
      </div>

      <div
        className={`relative overflow-hidden bg-gradient-to-br ${profile.palette} px-5 py-6 text-slate-50`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0),rgba(2,6,23,0.26))]" />
        <div className="relative flex items-center gap-5">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              duration: 4.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/20 bg-slate-950/25 text-white shadow-2xl backdrop-blur-sm"
          >
            <ClothingGlyph icon={profile.icon} />
          </motion.div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/80">
              Wardrobe Profile
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight">
              {profile.family}
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-100/90">
              {profile.role}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Clothing Type
          </div>
          <div className="mt-1 font-bold text-accent">
            {item.clothingType || "General clothing"}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Use Case
          </div>
          <div className="mt-1 text-sm font-medium text-text-primary">
            {profile.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OccupationSpotlightCard: React.FC<{
  item: StopItem;
  title: string;
  className?: string;
}> = ({ item, title, className = "" }) => {
  const profile = getOccupationProfile(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border border-border bg-surface-2/60 ${className}`.trim()}
    >
      <div className="border-b border-border px-4 py-3">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-text-muted">
          {title}
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-text-primary">{item.word}</div>
            <div className="text-sm text-text-secondary">
              {item.translation}
            </div>
          </div>
          <div className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-semibold text-text-primary">
            {profile.family}
          </div>
        </div>
      </div>

      <div
        className={`relative overflow-hidden bg-gradient-to-br ${profile.palette} px-5 py-6 text-slate-50`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0),rgba(2,6,23,0.26))]" />
        <div className="relative flex items-center gap-5">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 4.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/20 bg-slate-950/25 text-white shadow-2xl backdrop-blur-sm"
          >
            <OccupationGlyph icon={profile.icon} />
          </motion.div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/80">
              Career Profile
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight">
              {profile.family}
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-100/90">
              {profile.focus}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Work Setting
          </div>
          <div className="mt-1 font-bold text-accent">{profile.setting}</div>
        </div>
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Study Hook
          </div>
          <div className="mt-1 text-sm font-medium text-text-primary">
            {profile.focus}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HouseholdSpotlightCard: React.FC<{
  item: StopItem;
  title: string;
  className?: string;
}> = ({ item, title, className = "" }) => {
  const profile = getHouseholdProfile(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border border-border bg-surface-2/60 ${className}`.trim()}
    >
      <div className="border-b border-border px-4 py-3">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-text-muted">
          {title}
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-text-primary">{item.word}</div>
            <div className="text-sm text-text-secondary">
              {item.translation}
            </div>
          </div>
          <div className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-semibold text-text-primary">
            {profile.family}
          </div>
        </div>
      </div>

      <div
        className={`relative overflow-hidden bg-gradient-to-br ${profile.palette} px-5 py-6 text-slate-50`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_24%)]" />
        <div className="relative flex items-center gap-5">
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{
              duration: 4.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/20 bg-slate-950/25 text-white shadow-2xl backdrop-blur-sm"
          >
            <HouseholdGlyph icon={profile.icon} />
          </motion.div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/80">
              Home Profile
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight">
              {profile.family}
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-100/90">
              {profile.focus}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Home Zone
          </div>
          <div className="mt-1 font-bold text-accent">{profile.room}</div>
        </div>
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Memory Hook
          </div>
          <div className="mt-1 text-sm font-medium text-text-primary">
            {item.definition || profile.focus}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ToolSpotlightCard: React.FC<{
  item: StopItem;
  title: string;
  className?: string;
}> = ({ item, title, className = "" }) => {
  const profile = getToolProfile(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border border-border bg-surface-2/60 ${className}`.trim()}
    >
      <div className="border-b border-border px-4 py-3">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-text-muted">
          {title}
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <div className="font-bold text-text-primary">{item.word}</div>
            <div className="text-sm text-text-secondary">
              {item.translation}
            </div>
          </div>
          <div className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-semibold text-text-primary">
            {profile.family}
          </div>
        </div>
      </div>

      <div
        className={`relative overflow-hidden bg-gradient-to-br ${profile.palette} px-5 py-6 text-slate-50`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0),rgba(2,6,23,0.26))]" />
        <div className="relative flex items-center gap-5">
          <motion.div
            animate={{ rotate: [0, 2, 0], scale: [1, 1.03, 1] }}
            transition={{
              duration: 4.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/20 bg-slate-950/25 text-white shadow-2xl backdrop-blur-sm"
          >
            <ToolGlyph icon={profile.icon} />
          </motion.div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/80">
              Tool Profile
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight">
              {profile.family}
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-100/90">
              {profile.focus}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Workspace
          </div>
          <div className="mt-1 font-bold text-accent">{profile.workspace}</div>
        </div>
        <div className="rounded-xl border border-border bg-surface-1/80 p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Tool Type
          </div>
          <div className="mt-1 text-sm font-medium text-text-primary">
            {item.toolType || profile.focus}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const StopCategorySpotlight: React.FC<StopCategorySpotlightProps> = ({
  item,
  category,
  title = "Category Spotlight",
  className,
}) => {
  if (!supportsStopCategorySpotlight(category)) return null;

  if (category === "Countries" || category === "Capitals") {
    const reference =
      category === "Countries"
        ? getCountryReferenceByName(item.word)
        : getCountryReferenceByCapital(item.word);
    if (!reference) return null;
    return (
      <CountryMapPreview
        reference={reference}
        title={title}
        subtitle={
          category === "Countries"
            ? `Capital: ${reference.capitalName || "Unknown"}`
            : `Capital of ${reference.canonicalCountry}`
        }
        className={className}
      />
    );
  }

  if (category === "Colors") {
    return (
      <ColorSpotlightCard item={item} title={title} className={className} />
    );
  }

  if (category === "Animals") {
    return (
      <AnimalSpotlightCard item={item} title={title} className={className} />
    );
  }

  if (category === "World Landmarks") {
    return (
      <LandmarkSpotlightCard item={item} title={title} className={className} />
    );
  }

  if (category === "Sports") {
    return (
      <SportSpotlightCard item={item} title={title} className={className} />
    );
  }

  if (category === "Body Parts") {
    return (
      <BodyPartSpotlightCard item={item} title={title} className={className} />
    );
  }

  if (category === "Clothing") {
    return (
      <ClothingSpotlightCard item={item} title={title} className={className} />
    );
  }

  if (category === "Occupations") {
    return (
      <OccupationSpotlightCard
        item={item}
        title={title}
        className={className}
      />
    );
  }

  if (category === "Household Items") {
    return (
      <HouseholdSpotlightCard item={item} title={title} className={className} />
    );
  }

  if (category === "Tools") {
    return (
      <ToolSpotlightCard item={item} title={title} className={className} />
    );
  }

  return null;
};

export { supportsStopCategorySpotlight };
