import os
import json

filepath = 'package.json'
with open(filepath, 'r') as f:
    pkg = json.load(f)

overrides = pkg.get("pnpm", {}).get("overrides", {})
overrides["undici"] = "^7.30.1"
overrides["brace-expansion@<1.1.20"] = "1.1.20"
overrides["brace-expansion@>=2.0.0 <2.1.6"] = "2.1.6"
overrides["brace-expansion@>=4.0.0 <5.0.11"] = "5.0.11"
overrides["happy-dom"] = "^21.0.4"
overrides["fast-uri"] = "^3.1.9"
overrides["serialize-javascript"] = "^7.1.3"
overrides["deepmerge"] = "^4.3.2" # or ^4.4.0? wait let's just use ^4.3.2

pkg["pnpm"]["overrides"] = overrides

with open(filepath, 'w') as f:
    json.dump(pkg, f, indent=2)
print("Updated package.json overrides")
