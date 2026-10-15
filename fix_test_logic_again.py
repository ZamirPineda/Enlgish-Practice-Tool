import re

with open("src/pages/RoadmapFlow.test.tsx", "r") as f:
    content = f.read()

# Let's fix ALL units that we click.
content = content.replace(
'''    const builderUnitBtn = screen.queryByRole("button", {
      name: /Story builder/i,
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

content = content.replace(
'''    const panelUnitBtn = screen.queryByRole("button", { name: /Panel Pressure/i });
    if (panelUnitBtn) {
      fireEvent.click(panelUnitBtn);
    }''',
'''    const panelUnitBtn = screen.queryByRole("button", { name: /Alternar unidad Panel Pressure/i });
    if (panelUnitBtn) {
      act(() => { fireEvent.click(panelUnitBtn); });
    }'''
)

# And make sure to fix the "Abrir:" check to wait for it.
content = re.sub(
    r'expect\(\s*screen\.getByRole\("button", \{ name: /Abrir: ([^/]+)/i \}\)\s*\)\.toBeInTheDocument\(\);',
    r'await waitFor(() => expect(screen.getByRole("button", { name: /Abrir: \1/i })).toBeInTheDocument());',
    content
)

with open("src/pages/RoadmapFlow.test.tsx", "w") as f:
    f.write(content)
