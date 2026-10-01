with open("src/components/DailyProgressWidget.test.tsx", "r") as f:
    content = f.read()

new_content = content.replace("""    act(() => {
        vi.runAllTimers();
    });""", """    act(() => {
        vi.advanceTimersByTime(100);
    });""")

new_content = new_content.replace("""    act(() => {
      fireEvent.click(rewardButton);
      vi.runAllTimers();
    });""", """    act(() => {
      fireEvent.click(rewardButton);
      vi.advanceTimersByTime(100);
    });""")

new_content = new_content.replace("""    act(() => {
      fireEvent.click(weeklyClaimButton);
      vi.runAllTimers();
    });""", """    act(() => {
      fireEvent.click(weeklyClaimButton);
      vi.advanceTimersByTime(100);
    });""")

with open("src/components/DailyProgressWidget.test.tsx", "w") as f:
    f.write(new_content)
