import json

with open("package.json", "r") as f:
    pkg = json.load(f)

pkg["devDependencies"]["vitest"] = "^4.1.11"
pkg["devDependencies"]["@vitest/coverage-v8"] = "^4.1.11"
pkg["devDependencies"]["postcss"] = "^8.5.30"

with open("package.json", "w") as f:
    json.dump(pkg, f, indent=2)
