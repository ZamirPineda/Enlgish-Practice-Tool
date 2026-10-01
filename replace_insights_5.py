with open("src/components/game/DailySessionInsights.test.tsx", "r") as f:
    content = f.read()

new_content = content.replace("vi.runAllTimers()", "vi.advanceTimersByTime(100)")

with open("src/components/game/DailySessionInsights.test.tsx", "w") as f:
    f.write(new_content)
