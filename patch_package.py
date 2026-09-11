import json

with open('package.json', 'r') as f:
    pkg = json.load(f)

pkg['pnpm']['overrides']['yaml'] = "2.9.0"

with open('package.json', 'w') as f:
    json.dump(pkg, f, indent=2)
