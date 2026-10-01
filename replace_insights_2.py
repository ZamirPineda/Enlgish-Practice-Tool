with open("src/components/game/DailySessionInsights.test.tsx", "r") as f:
    content = f.read()

new_content = content.replace("""  it("shows locked reward by default", () => {
    render(<DailySessionInsights />);

    expect(""", """  it("shows locked reward by default", () => {
    render(<DailySessionInsights />);
    act(() => {
        vi.runAllTimers();
    });

    expect(""")

new_content = new_content.replace("""    act(() => {
      fireEvent.click(claimButton);
    });""", """    act(() => {
      fireEvent.click(claimButton);
      vi.runAllTimers();
    });""")

with open("src/components/game/DailySessionInsights.test.tsx", "w") as f:
    f.write(new_content)
