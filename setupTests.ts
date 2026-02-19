import "@testing-library/jest-dom";
import { beforeEach, vi } from "vitest";

type StorageMap = Record<string, string>;
let storage: StorageMap = {};

const localStorageMock = {
  getItem: vi.fn((key: string) => (key in storage ? storage[key] : null)),
  setItem: vi.fn((key: string, value: string) => {
    storage[key] = String(value);
  }),
  removeItem: vi.fn((key: string) => {
    delete storage[key];
  }),
  clear: vi.fn(() => {
    storage = {};
  }),
};

const fetchMock = vi.fn();

vi.stubGlobal("localStorage", localStorageMock);
vi.stubGlobal("fetch", fetchMock);

beforeEach(() => {
  storage = {};
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  fetchMock.mockReset();
  fetchMock.mockResolvedValue(
    new Response("{}", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  );
});
