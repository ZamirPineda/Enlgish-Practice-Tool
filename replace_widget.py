with open("src/components/DailyProgressWidget.test.tsx", "r") as f:
    content = f.read()

new_content = content.replace("""  it("shows session summary and allows claiming the daily session reward once", () => {
    render(
      <MemoryRouter>
        <DailyProgressWidget />
      </MemoryRouter>,
    );

    const rewardButtonBefore = screen.getByRole("button", {""", """  it("shows session summary and allows claiming the daily session reward once", () => {
    render(
      <MemoryRouter>
        <DailyProgressWidget />
      </MemoryRouter>,
    );

    act(() => {
        vi.runAllTimers();
    });

    const rewardButtonBefore = screen.getByRole("button", {""")

new_content = new_content.replace("""    act(() => {
      fireEvent.click(rewardButton);
    });""", """    act(() => {
      fireEvent.click(rewardButton);
      vi.runAllTimers();
    });""")

new_content = new_content.replace("""    render(
      <MemoryRouter>
        <DailyProgressWidget />
      </MemoryRouter>,
    );

    expect(screen.getByText(/3 \\/ 7 active days/i)).toBeInTheDocument();""", """    render(
      <MemoryRouter>
        <DailyProgressWidget />
      </MemoryRouter>,
    );

    act(() => {
        vi.runAllTimers();
    });

    expect(screen.getByText(/3 \\/ 7 active days/i)).toBeInTheDocument();""")

new_content = new_content.replace("""    act(() => {
      fireEvent.click(weeklyClaimButton);
    });""", """    act(() => {
      fireEvent.click(weeklyClaimButton);
      vi.runAllTimers();
    });""")

with open("src/components/DailyProgressWidget.test.tsx", "w") as f:
    f.write(new_content)
