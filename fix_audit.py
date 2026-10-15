import json

with open("package.json", "r") as f:
    pkg = json.load(f)

pkg["devDependencies"]["vite"] = "^6.4.3"

with open("package.json", "w") as f:
    json.dump(pkg, f, indent=2)
