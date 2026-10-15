import re

with open("src/pages/RoadmapFlow.test.tsx", "r") as f:
    content = f.read()

# I am going to wrap the existing fireEvent calls with act.
content = content.replace(
'''    if (builderUnitBtn) {
      fireEvent.click(builderUnitBtn);
    }''',
'''    if (builderUnitBtn) {
      act(() => { fireEvent.click(builderUnitBtn); });
    }'''
)

content = content.replace(
'''    if (panelUnitBtn) {
      fireEvent.click(panelUnitBtn);
    }''',
'''    if (panelUnitBtn) {
      act(() => { fireEvent.click(panelUnitBtn); });
    }'''
)

# And add the import for `act` if not there
if "act," not in content:
    content = content.replace(
'''  fireEvent,
  render,
  screen,''',
'''  act,
  fireEvent,
  render,
  screen,'''
    )

with open("src/pages/RoadmapFlow.test.tsx", "w") as f:
    f.write(content)
