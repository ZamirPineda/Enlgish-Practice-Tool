export type AvatarStyle =
  | "micah"
  | "adventurer"
  | "fun-emoji"
  | "avataaars"
  | "bottts"
  | "croodles"
  | "thumbs"
  | "pixel-art";

export interface UserCharacter {
  name: string;
  avatarStyle: AvatarStyle;
  seed: string; // The seed determines the generated avatar
  skinColor?: string; // Optional customizations that some styles accept
  hairColor?: string;
  backgroundColor: string; // The circle background color
}

export interface UserProfile {
  character: UserCharacter;
}

const PROFILE_KEY = "app-user-profile";

const defaultProfile: UserProfile = {
  character: {
    name: "Learner",
    avatarStyle: "micah", // Micah is a nice clean modern/chibi style!
    seed: "Learner123", // Start with a fun generic seed
    backgroundColor: "transparent",
  },
};

export const loadProfile = (): UserProfile => {
  if (typeof window === "undefined" || !window.localStorage) {
    return defaultProfile;
  }
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) {
    return defaultProfile;
  }
  try {
    const parsed = JSON.parse(raw);

    // Migrate old profile structures to new DiceBear format if needed
    let seed = parsed.character?.seed;
    let avatarStyle = parsed.character?.avatarStyle;

    if (!seed) {
      seed = parsed.character?.name || defaultProfile.character.seed;
      avatarStyle = "micah";
    }

    return {
      character: {
        ...defaultProfile.character,
        ...parsed.character,
        seed,
        avatarStyle,
      },
    };
  } catch {
    return defaultProfile;
  }
};

export const saveProfile = (profile: UserProfile) => {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};
