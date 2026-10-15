import re

with open("src/pages/RoadmapFlow.test.tsx", "r") as f:
    content = f.read()

# Fix all unit toggles to say "Alternar unidad "
content = re.sub(
    r'screen\.queryByRole\("button",\s*\{\s*name:\s*/(.*)/i\s*\}\)',
    r'screen.queryByRole("button", { name: /Alternar unidad \1/i })',
    content
)

# Wait, the previous replacement already changed "Panel Pressure" to "Alternar unidad Panel Pressure".
# The current error is about "Abrir: Story frame builder", which happens earlier in the flow!
# Let's inspect where it clicks "Story builder" unit.
