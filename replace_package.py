import json

with open("package.json", "r") as f:
    data = json.load(f)

overrides = data.get("pnpm", {}).get("overrides", {})

# Override to fix high/critical vulnerabilities
overrides["@babel/plugin-transform-modules-systemjs@>=7.12.0 <=7.29.3"] = "7.29.4"
overrides["ws@>=8.0.0 <8.21.0"] = "8.21.0"
overrides["vite@<=6.4.2"] = "6.4.3"

data["pnpm"]["overrides"] = overrides

with open("package.json", "w") as f:
    json.dump(data, f, indent=2)
