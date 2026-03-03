import { renderHook, act } from "@testing-library/react";
import { usePWAUpdate, isActiveSession } from "../usePWAUpdate";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Workbox } from "workbox-window";

// Mock workbox-window
vi.mock("workbox-window", () => {
  return {
    Workbox: vi.fn(),
  };
});

describe("isActiveSession", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    delete (window as any).location;
    window.location = { ...originalLocation, hash: "" } as any;
  });

  afterEach(() => {
    window.location = originalLocation as any;
  });

  it("returns false for home page", () => {
    window.location.hash = "#/";
    expect(isActiveSession()).toBe(false);
  });

  it("returns true for game modes", () => {
    window.location.hash = "#/stop?mode=game";
    expect(isActiveSession()).toBe(true);

    window.location.hash = "#/speed-builder";
    expect(isActiveSession()).toBe(true);
  });
});

describe("usePWAUpdate", () => {
  let mockAddEventListener: any;
  let mockMessageSkipWaiting: any;
  let mockRegister: any;
  let mockCatch: any;

  const originalLocation = window.location;
  const originalNavigator = window.navigator;

  beforeEach(() => {
    vi.clearAllMocks();

    mockAddEventListener = vi.fn();
    mockMessageSkipWaiting = vi.fn();
    mockCatch = vi.fn();
    mockRegister = vi.fn().mockReturnValue({ catch: mockCatch });

    (Workbox as any).mockImplementation(function () {
      return {
        addEventListener: mockAddEventListener,
        messageSkipWaiting: mockMessageSkipWaiting,
        register: mockRegister,
      };
    });

    delete (window as any).location;
    window.location = { ...originalLocation, hash: "", reload: vi.fn() } as any;

    Object.defineProperty(window, "navigator", {
      value: { serviceWorker: {} },
      writable: true,
    });

    vi.stubEnv("PROD", true); // ensure import.meta.env.PROD is true
  });

  afterEach(() => {
    window.location = originalLocation as any;
    Object.defineProperty(window, "navigator", {
      value: originalNavigator,
      writable: true,
    });
    vi.unstubAllEnvs();
  });

  it("registers service worker and listens to events", () => {
    renderHook(() => usePWAUpdate());

    expect(Workbox).toHaveBeenCalledWith("/sw.js");
    expect(mockRegister).toHaveBeenCalled();
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "waiting",
      expect.any(Function),
    );
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "installed",
      expect.any(Function),
    );
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "controlling",
      expect.any(Function),
    );
  });

  it("sets updateAvailable to true if in active session when waiting event fires", () => {
    window.location.hash = "#/stop?mode=game"; // Active session

    const { result } = renderHook(() => usePWAUpdate());

    const waitingCall = mockAddEventListener.mock.calls.find(
      (call: any[]) => call[0] === "waiting",
    );
    expect(waitingCall).toBeDefined();

    act(() => {
      waitingCall[1]();
    });

    expect(result.current.updateAvailable).toBe(true);
    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it("calls reload automatically if NOT in active session when waiting event fires", () => {
    window.location.hash = "#/"; // NOT active session

    const { result } = renderHook(() => usePWAUpdate());

    const waitingCall = mockAddEventListener.mock.calls.find(
      (call: any[]) => call[0] === "waiting",
    );

    act(() => {
      waitingCall[1]();
    });

    expect(result.current.updateAvailable).toBe(false);
    expect(mockMessageSkipWaiting).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it("handleUpdate triggers messageSkipWaiting and reload", () => {
    const { result } = renderHook(() => usePWAUpdate());

    act(() => {
      result.current.handleUpdate();
    });

    expect(mockMessageSkipWaiting).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
