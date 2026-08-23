import re

with open("src/pages/RoadmapView.test.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'test(\n    "requires enough mastery before unlocking the next lesson",\n    { timeout: 30000 },\n    async () => {',
    'test("requires enough mastery before unlocking the next lesson", async () => {', 1)

with open("src/pages/RoadmapView.test.tsx", "w") as f:
    f.write(content)
