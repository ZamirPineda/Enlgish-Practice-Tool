import re

with open("src/pages/RoadmapView.test.tsx", "r") as f:
    content = f.read()


content = content.replace(
    'test("requires enough mastery before unlocking the next lesson", { timeout: 30000 }, async () => {',
    'test("requires enough mastery before unlocking the next lesson", async () => {', 1)
content = content.replace(
    'test("requires enough mastery before unlocking the next lesson", async () => {',
    'test("requires enough mastery before unlocking the next lesson", async () => {', 1)


with open("src/pages/RoadmapView.test.tsx", "w") as f:
    f.write(content)
