import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { env, exit } from "node:process";

if (env.CI === "true" || env.HUSKY === "0" || !existsSync(".git")) {
  exit(0);
}

const result = spawnSync("pnpm", ["exec", "husky"], {
  stdio: "inherit",
  shell: true,
});

exit(result.status ?? 0);
