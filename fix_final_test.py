import re

with open("src/pages/RoadmapFlow.test.tsx", "r") as f:
    content = f.read()

# We need to wait for it.
content = content.replace(
'''    expect(
      screen.getByRole("button", { name: /Abrir: Panel meeting builder/i })
    ).toBeInTheDocument();''',
'''    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Abrir: Panel meeting builder/i })
      ).toBeInTheDocument();
    });'''
)

with open("src/pages/RoadmapFlow.test.tsx", "w") as f:
    f.write(content)
