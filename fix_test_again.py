import re

with open("src/pages/RoadmapFlow.test.tsx", "r") as f:
    content = f.read()

# We need to click "Alternar unidad Panel Pressure" instead of "Panel Pressure" directly.
content = content.replace(
'''    const panelUnitBtn = screen.queryByRole("button", { name: /Panel Pressure/i });''',
'''    const panelUnitBtn = screen.queryByRole("button", { name: /Alternar unidad Panel Pressure/i });'''
)

with open("src/pages/RoadmapFlow.test.tsx", "w") as f:
    f.write(content)
