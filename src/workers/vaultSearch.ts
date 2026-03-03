import { SrsVocabularyItem } from "@/types";
import {
  VaultSearchFilters,
  VaultSortMode,
  VaultSearchResult,
  WorkerSearchResponse,
  WorkerMessage,
} from "./vaultSearch.worker";

let worker: Worker | null = null;
let resolveMap = new Map<string, (results: VaultSearchResult[]) => void>();

export function initVaultSearchWorker() {
  if (worker) return; // already initialized

  // We instantiate the worker using Vite's ?worker suffix
  worker = new Worker(new URL("./vaultSearch.worker.ts", import.meta.url), {
    type: "module",
  });

  worker.onmessage = (event: MessageEvent<WorkerSearchResponse>) => {
    const data = event.data;
    if (data.type === "SEARCH_RESULT") {
      const resolver = resolveMap.get(data.id);
      if (resolver) {
        resolver(data.payload);
        resolveMap.delete(data.id);
      }
    }
  };
}

export function updateWorkerDeck(deck: SrsVocabularyItem[]) {
  if (!worker) initVaultSearchWorker();
  worker!.postMessage({
    type: "INIT",
    payload: deck,
  } as WorkerMessage);
}

export function searchVault(
  query: string,
  filters: VaultSearchFilters,
  sort: VaultSortMode,
): Promise<VaultSearchResult[]> {
  return new Promise((resolve) => {
    if (!worker) initVaultSearchWorker();

    const id = Math.random().toString(36).substring(2, 9);
    resolveMap.set(id, resolve);

    worker!.postMessage({
      type: "SEARCH",
      id,
      payload: { query, filters, sort },
    } as WorkerMessage);
  });
}

export function terminateVaultSearchWorker() {
  if (worker) {
    worker.terminate();
    worker = null;
    resolveMap.clear();
  }
}
