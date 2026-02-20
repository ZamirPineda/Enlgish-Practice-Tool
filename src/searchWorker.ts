interface FileNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileNode[];
}

let docsTree: FileNode[] = [];
let docsTreePromise: Promise<void> | null = null;

const loadDocsTree = () => {
  if (docsTreePromise) return docsTreePromise;

  const docsIndexUrl = new URL(
    "study-docs/index.json",
    `${self.location.origin}${import.meta.env.BASE_URL}`,
  ).toString();

  docsTreePromise = fetch(docsIndexUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load index");
      return response.json() as Promise<FileNode[]>;
    })
    .then((data) => {
      docsTree = data;
    });

  return docsTreePromise;
};

const filterNodes = (nodes: FileNode[], searchTerm: string): FileNode[] => {
  if (!searchTerm) return nodes;

  return nodes
    .map((node) => {
      if (node.type === "file") {
        return node.name.toLowerCase().includes(searchTerm) ? node : null;
      }
      if (node.children) {
        const filteredChildren = filterNodes(node.children, searchTerm);
        if (filteredChildren.length > 0) {
          return { ...node, children: filteredChildren };
        }
      }
      return null;
    })
    .filter(Boolean) as FileNode[];
};

self.onmessage = async (event: MessageEvent<{ term?: string }>) => {
  try {
    await loadDocsTree();
    const normalizedTerm = event.data.term?.trim().toLowerCase() ?? "";
    self.postMessage({ results: filterNodes(docsTree, normalizedTerm) });
  } catch {
    self.postMessage({ error: "Could not load documentation index." });
  }
};

export {};
