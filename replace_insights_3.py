with open("src/components/game/DailySessionInsights.test.tsx", "r") as f:
    content = f.read()

new_content = content.replace("""    act(() => {
      fireEvent.click(claimButton);
      vi.runAllTimers();
    });""", """    fireEvent.click(claimButton);
    act(() => {
      vi.runAllTimers();
    });""")

with open("src/components/game/DailySessionInsights.test.tsx", "w") as f:
    f.write(new_content)
