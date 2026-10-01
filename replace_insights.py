with open("src/components/game/DailySessionInsights.test.tsx", "r") as f:
    content = f.read()

new_content = content.replace("""    render(<DailySessionInsights />);

    const claimButton = screen.getByRole("button", {""", """    render(<DailySessionInsights />);

    act(() => {
        vi.runAllTimers();
    });

    const claimButton = screen.getByRole("button", {""")

with open("src/components/game/DailySessionInsights.test.tsx", "w") as f:
    f.write(new_content)
