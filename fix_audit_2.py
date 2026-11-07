import os
import json

filepath = 'package.json'
with open(filepath, 'r') as f:
    pkg = json.load(f)

overrides = pkg.get("pnpm", {}).get("overrides", {})
if "deepmerge" in overrides:
    del overrides["deepmerge"]

pkg["pnpm"]["overrides"] = overrides

with open(filepath, 'w') as f:
    json.dump(pkg, f, indent=2)
print("Updated package.json overrides")
