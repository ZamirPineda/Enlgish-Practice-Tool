import re

# Fix act() warnings in DailyProgressWidget and DailySessionInsights
with open("src/components/DailyProgressWidget.test.tsx", "r") as f:
    content = f.read()

# We need to wrap user interactions in act in test.
content = content.replace("fireEvent.click(screen.getByText('Claim XP'));", "act(() => { fireEvent.click(screen.getByText('Claim XP')); });")

with open("src/components/DailyProgressWidget.test.tsx", "w") as f:
    f.write(content)


with open("src/components/game/DailySessionInsights.test.tsx", "r") as f:
    content = f.read()

content = content.replace("fireEvent.click(screen.getByRole('button', { name: /Claim .* XP/i }));", "act(() => { fireEvent.click(screen.getByRole('button', { name: /Claim .* XP/i })); });")

with open("src/components/game/DailySessionInsights.test.tsx", "w") as f:
    f.write(content)
