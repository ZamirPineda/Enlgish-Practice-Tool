import os
import json

filepath = 'package.json'
with open(filepath, 'r') as f:
    pkg = json.load(f)

overrides = pkg.get("pnpm", {}).get("overrides", {})
overrides["react-router-dom"] = "^7.18.2"
overrides["react-router"] = "^7.18.2"
overrides["@babel/plugin-transform-modules-systemjs"] = "^7.29.4"
overrides["postcss"] = "^8.5.18"

pkg["pnpm"]["overrides"] = overrides

with open(filepath, 'w') as f:
    json.dump(pkg, f, indent=2)
print("Updated package.json overrides")
