type AppVersionEnv = ImportMetaEnv & { APP_VERSION?: string };

export const APP_VERSION =
  (import.meta.env as AppVersionEnv).APP_VERSION ?? "dev";
