with open("src/components/game/DailySessionInsights.test.tsx", "r") as f:
    content = f.read()

new_content = content.replace("""    const claimButton = screen.getByRole("button", {
      name: "Claim +40 XP for daily session",
    });
    expect(claimButton).toBeEnabled();

    fireEvent.click(claimButton);
    act(() => {
      vi.runAllTimers();
    });

    expect(""", """    const claimButton = screen.getByRole("button", {
      name: "Claim +40 XP for daily session",
    });
    expect(claimButton).toBeEnabled();

    act(() => {
      fireEvent.click(claimButton);
      vi.runAllTimers();
    });

    expect(""")

with open("src/components/game/DailySessionInsights.test.tsx", "w") as f:
    f.write(new_content)
