import os
import json

filepath = 'package.json'
with open(filepath, 'r') as f:
    pkg = json.load(f)

overrides = pkg.get("pnpm", {}).get("overrides", {})
overrides["zod"] = "^4.6.6"
overrides["vite"] = "^6.4.4"
overrides["source-map-js"] = "^1.2.2"
overrides["js-yaml"] = "^4.3.2"
overrides["nanoid"] = "^3.3.12"
overrides["browserslist"] = "^4.28.2"
overrides["braces"] = "^3.0.3"

pkg["pnpm"]["overrides"] = overrides

with open(filepath, 'w') as f:
    json.dump(pkg, f, indent=2)
print("Updated package.json overrides")
