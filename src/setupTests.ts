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

class WorkerMock {
  private items: Array<Record<string, any>> = [];
  onmessage: ((ev: MessageEvent) => any) | null = null;

  postMessage(msg: any) {
    if (msg?.type === "INIT") {
      this.items = Array.isArray(msg.payload) ? msg.payload : [];
      return;
    }

    if (msg?.type === "SEARCH") {
      const query = String(msg?.payload?.query ?? "")
        .trim()
        .toLowerCase();

      const payload = this.items
        .filter((item) => {
          if (!query) return true;
          const word = String(item.word ?? "").toLowerCase();
          const definition = String(item.definition ?? "").toLowerCase();
          const tags = Array.isArray(item.tags)
            ? item.tags.map((tag: string) => String(tag).toLowerCase())
            : [];
          return (
            word.includes(query) ||
            definition.includes(query) ||
            tags.some((tag: string) => tag.includes(query))
          );
        })
        .map((item) => ({ item, matches: [] }));

      setTimeout(() => {
        this.onmessage?.({
          data: {
            type: "SEARCH_RESULT",
            id: msg.id,
            payload,
          },
        } as MessageEvent);
      }, 0);
    }
  }
  terminate() {}
  addEventListener() {}
  removeEventListener() {}
}

vi.stubGlobal("localStorage", localStorageMock);
vi.stubGlobal("fetch", fetchMock);
vi.stubGlobal("Worker", WorkerMock);

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
