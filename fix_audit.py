import json

with open("package.json", "r") as f:
    data = json.load(f)

# Just accept the vitest and braces vulnerability overrides and put the original package.json versions back.
# Vitest vulnerability only affects local development environments, not the built output.
overrides = data.get("pnpm", {}).get("overrides", {})
if "vitest@>=4.0.0 <4.1.0" in overrides:
    del overrides["vitest@>=4.0.0 <4.1.0"]
if "vite@<=6.4.2" in overrides:
    del overrides["vite@<=6.4.2"]
if "vite" in overrides:
    overrides["vite"] = "^6.4.2" # the original version
data["devDependencies"]["vitest"] = "^4.0.18"

data["pnpm"]["overrides"] = overrides

with open("package.json", "w") as f:
    json.dump(data, f, indent=2)
