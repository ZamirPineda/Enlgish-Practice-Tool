import { renderHook, act } from "@testing-library/react";
import { useNetworkStatus } from "./useNetworkStatus";

describe("useNetworkStatus", () => {
  let originalNavigatorOnLine: boolean;

  beforeAll(() => {
    originalNavigatorOnLine = navigator.onLine;
  });

  afterAll(() => {
    Object.defineProperty(navigator, "onLine", {
      value: originalNavigatorOnLine,
      configurable: true,
    });
  });

  it("should return true when online", () => {
    Object.defineProperty(navigator, "onLine", {
      value: true,
      configurable: true,
    });
    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current.isOnline).toBe(true);
  });

  it("should return false when offline", () => {
    Object.defineProperty(navigator, "onLine", {
      value: false,
      configurable: true,
    });
    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current.isOnline).toBe(false);
  });

  it("should update status when offline event is fired", () => {
    Object.defineProperty(navigator, "onLine", {
      value: true,
      configurable: true,
    });
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.isOnline).toBe(true);

    act(() => {
      window.dispatchEvent(new Event("offline"));
    });

    expect(result.current.isOnline).toBe(false);
  });

  it("should update status when online event is fired", () => {
    Object.defineProperty(navigator, "onLine", {
      value: false,
      configurable: true,
    });
    // Setting navigator.onLine to false initially so the hook starts offline
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.isOnline).toBe(false);

    act(() => {
      window.dispatchEvent(new Event("online"));
    });

    expect(result.current.isOnline).toBe(true);
  });
});
