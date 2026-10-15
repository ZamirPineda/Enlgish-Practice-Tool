import re

with open("src/pages/RoadmapFlow.test.tsx", "r") as f:
    content = f.read()

# We need to make sure we use act around clicks, AND use the correct button names to expand the units.
# When we expand a unit, we click its toggle.

# Let's restore the original test logic and apply `act()` correctly.

content = content.replace(
'''    const builderUnitBtn = screen.queryByRole("button", {
      name: /Alternar unidad Story builder/i,
    });
    if (builderUnitBtn) {
      fireEvent.click(builderUnitBtn);
    }''',
'''    const builderUnitBtn = screen.queryByRole("button", {
      name: /Alternar unidad Story builder/i,
    });
    if (builderUnitBtn) {
      act(() => { fireEvent.click(builderUnitBtn); });
    }'''
)

with open("src/pages/RoadmapFlow.test.tsx", "w") as f:
    f.write(content)
