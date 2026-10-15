with open("src/pages/RoadmapFlow.test.tsx", "r") as f:
    content = f.read()

# Replace all occurrences of expect(screen.getByRole(..., { name: /Abrir:.../i })).toBeInTheDocument();
# with await waitFor(() => expect(screen.getByRole(..., { name: /Abrir:.../i })).toBeInTheDocument());

import re

# Match the pattern:
#     expect(
#       screen.getByRole("button", { name: /Abrir: Panel meeting builder/i })
#     ).toBeInTheDocument();

content = re.sub(
    r'expect\(\s*screen\.getByRole\("button", \{ name: /Abrir: ([^/]+)/i \}\)\s*\)\.toBeInTheDocument\(\);',
    r'await waitFor(() => expect(screen.getByRole("button", { name: /Abrir: \1/i })).toBeInTheDocument());',
    content
)

with open("src/pages/RoadmapFlow.test.tsx", "w") as f:
    f.write(content)
