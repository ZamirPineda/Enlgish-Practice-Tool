import re

with open("src/pages/RoadmapFlow.test.tsx", "r") as f:
    content = f.read()

# Let's verify what units are available at this point.
# We're trying to click "Panel Pressure", which opens a unit, but maybe the button to start the actual module inside is what we are looking for.
# Actually, the name "Alternar unidad Panel Pressure" might be the unit toggle, let's see the DOM dump.
# The DOM dump has: Name "Alternar unidad Panel Pressure" (which is a button)
