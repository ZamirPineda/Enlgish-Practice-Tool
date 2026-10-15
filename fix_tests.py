import re

with open("src/pages/RoadmapFlow.test.tsx", "r") as f:
    content = f.read()

# Let's inspect where it clicks the unit button. Wait, when unit_english_behavioral finishes,
# a dialog appears ("Unidad completada"). We called `closeCompletionModalIfOpen()`.
# Then we did:
# const panelUnitBtn = screen.queryByRole("button", { name: /Panel Pressure/i });
# if (panelUnitBtn) { fireEvent.click(panelUnitBtn); }
# But we need to use `act()` around clicks to trigger state updates in tests properly.

content = content.replace(
'''    const panelUnitBtn = screen.queryByRole("button", { name: /Panel Pressure/i });
    if (panelUnitBtn) {
      fireEvent.click(panelUnitBtn);
    }''',
'''    const panelUnitBtn = screen.queryByRole("button", { name: /Panel Pressure/i });
    if (panelUnitBtn) {
      act(() => {
        fireEvent.click(panelUnitBtn);
      });
    }'''
)

with open("src/pages/RoadmapFlow.test.tsx", "w") as f:
    f.write(content)
