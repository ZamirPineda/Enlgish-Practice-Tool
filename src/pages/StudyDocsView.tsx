import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import StudyDocsGameView from "@/pages/StudyDocsGameView";
import StudyDocsQuizView from "@/pages/StudyDocsQuizView";

interface FileNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileNode[];
}

const StudyDocsView: React.FC = () => {
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [allFileTree, setAllFileTree] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const location = useLocation();
  const [viewMode, setViewMode] = useState<"reader" | "game" | "quiz">(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode") as "reader" | "game" | "quiz";
    return mode || "reader";
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode") as "reader" | "game" | "quiz";
    if (mode) setViewMode(mode);
  }, [location.search]);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(new URL("../searchWorker.ts", import.meta.url), {
      type: "module",
    });
    workerRef.current = worker;

    worker.onmessage = (
      event: MessageEvent<{ results?: FileNode[]; error?: string }>,
    ) => {
      if (event.data.error) {
        setError("Could not load documentation index.");
        setIsLoading(false);
        return;
      }

      setError(null);
      const results = event.data.results ?? [];
      setFileTree(results);
      setAllFileTree((previous) => (previous.length > 0 ? previous : results));
      setIsLoading(false);
    };

    worker.onerror = (err) => {
      console.error(err);
      setError("Could not load documentation index.");
      setIsLoading(false);
    };

    worker.postMessage({ term: "" });

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!workerRef.current) return;
    workerRef.current.postMessage({ term: searchTerm });
  }, [searchTerm]);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar on mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleFileSelect = (path: string) => {
    const encodedPath = path
      .split("/")
      .map((segment) => encodeURIComponent(segment).replace(/%26/g, "&"))
      .join("/");
    setSelectedFile(`${import.meta.env.BASE_URL}study-docs/${encodedPath}`);
    // Auto-close sidebar on mobile when a file is selected
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleCopyLink = () => {
    if (!selectedFile) return;
    const url = new URL(selectedFile, window.location.origin).href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Recursive tree renderer
  const renderTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => {
      if (node.type === "directory") {
        const isExpanded = expandedFolders.has(node.path) || searchTerm !== "";
        return (
          <div key={node.path} className="select-none">
            <button
              type="button"
              className={`w-full text-left flex items-center py-1.5 px-2 min-h-[36px] hover:bg-slate-700/50 text-slate-300 transition-colors active:scale-[0.99] rounded-md mx-1 my-0.5 group ${level === 0 ? "font-medium text-slate-200" : "text-sm"}`}
              style={{ paddingLeft: `${level * 12 + 8}px` }}
              onClick={() => toggleFolder(node.path)}
              aria-expanded={isExpanded}
              aria-controls={`docs-folder-${node.path.replace(/[^a-z0-9]/gi, "-")}`}
            >
              <span className="mr-2 text-slate-400 group-hover:text-sky-400 transition-colors">
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <span className="mr-2 text-sky-400/70">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </span>
              <span className="truncate">{node.name}</span>
            </button>
            {isExpanded && node.children && (
              <div
                id={`docs-folder-${node.path.replace(/[^a-z0-9]/gi, "-")}`}
                className="border-l border-slate-700/30 ml-4 mt-0.5"
              >
                {renderTree(node.children, level + 1)}
              </div>
            )}
          </div>
        );
      } else {
        const isSelected = selectedFile?.includes(
          encodeURIComponent(node.name).replace(/%26/g, "&"),
        );
        return (
          <button
            type="button"
            key={node.path}
            className={`w-full text-left flex items-center py-1.5 px-2 min-h-[36px] transition-all rounded-md mx-1 my-0.5 text-sm group active:scale-[0.99]
              ${
                isSelected
                  ? "bg-sky-500/10 text-sky-300 font-medium border-l-2 border-sky-500"
                  : "hover:bg-slate-700/30 text-slate-400 hover:text-slate-200 border-l-2 border-transparent"
              }`}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
            onClick={() => handleFileSelect(node.path)}
            aria-current={isSelected ? "page" : undefined}
          >
            <span
              className={`mr-2 ${isSelected ? "text-sky-400" : "text-slate-400 group-hover:text-slate-300"}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            <span className="truncate">{node.name}</span>
          </button>
        );
      }
    });
  };

  if (isLoading)
    return (
      <div className="p-8 text-center text-slate-400">
        Loading study docs...
      </div>
    );
  if (error) return <div className="p-8 text-center text-red-400">{error}</div>;

  if (viewMode !== "reader") {
    return (
      <div className="h-full bg-slate-900 overflow-y-auto overscroll-y-contain">
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-700 p-3 flex justify-end">
          <button
            type="button"
            onClick={() => setViewMode("reader")}
            className="min-h-[40px] px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest bg-slate-800 text-slate-200 hover:bg-slate-700 active:scale-[0.98]"
          >
            ← Reader
          </button>
        </div>
        {viewMode === "game" && (
          <StudyDocsGameView
            fileTree={allFileTree.length > 0 ? allFileTree : fileTree}
          />
        )}
        {viewMode === "quiz" && <StudyDocsQuizView />}
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden relative">
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setViewMode("quiz")}
          className="min-h-[40px] px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest bg-indigo-500 text-white hover:bg-indigo-400 active:scale-[0.98] shadow-lg"
        >
          📝 Quiz
        </button>
        <button
          type="button"
          onClick={() => setViewMode("game")}
          className="min-h-[40px] px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest bg-rose-500 text-white hover:bg-rose-400 active:scale-[0.98] shadow-lg"
        >
          🎮 Hunt
        </button>
      </div>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 left-4 z-50 min-h-[44px] min-w-[44px] p-2 bg-slate-800 text-white rounded-lg shadow-lg active:scale-[0.98]"
        aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`
                absolute md:relative z-40 h-full w-80 bg-slate-900 md:bg-slate-800/30 border-r border-slate-700 flex flex-col transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                ${zenMode ? "hidden md:hidden" : ""}
            `}
      >
        <div className="p-4 border-b border-slate-700 mt-12 md:mt-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Documentation
            </h2>
            <button
              onClick={() => setExpandedFolders(new Set())}
              className="text-xs text-slate-400 hover:text-sky-400 transition-colors active:scale-[0.98] rounded-md px-1 py-1 flex items-center gap-1"
              title="Collapse All Folders"
              aria-label="Collapse All Folders"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              Collapse
            </button>
          </div>
          <div className="relative">
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search docs..."
              className="w-full min-h-[44px] bg-slate-950 md:bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-y-contain overflow-x-hidden p-2">
          {fileTree.length > 0 ? (
            renderTree(fileTree)
          ) : (
            <div className="text-center text-slate-400 py-4 text-sm">
              No matches found
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="absolute inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 bg-slate-900 h-full relative w-full flex flex-col transition-all duration-300 ${zenMode ? "max-w-4xl mx-auto shadow-2xl" : ""}`}
      >
        {selectedFile ? (
          <>
            {/* Document Toolbar */}
            <div className="h-12 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between px-4 shrink-0">
              <div className="text-sm text-slate-300 truncate max-w-[60%] flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {decodeURIComponent(selectedFile.split("/").pop() || "")}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZenMode(!zenMode)}
                  className={`p-1.5 min-h-[36px] rounded-md transition-colors active:scale-[0.98] flex items-center gap-1.5 text-xs font-medium ${zenMode ? "bg-sky-500/20 text-sky-400" : "text-slate-400 hover:text-sky-400 hover:bg-slate-700/50"}`}
                  title="Toggle Zen Mode"
                  aria-label="Toggle Zen Mode"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                  <span className="hidden sm:inline">Zen Mode</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 min-h-[36px] text-slate-400 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors active:scale-[0.98] flex items-center gap-1.5 text-xs font-medium relative"
                  title="Copy Link"
                  aria-label="Copy Link"
                >
                  {copiedLink ? (
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  )}
                  <span className="hidden sm:inline">
                    {copiedLink ? "Copied!" : "Copy Link"}
                  </span>
                </button>
                <a
                  href={selectedFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 min-h-[36px] text-slate-400 hover:text-sky-400 hover:bg-slate-700/50 rounded-md transition-colors active:scale-[0.98] flex items-center gap-1.5 text-xs font-medium"
                  title="Open in New Tab"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <span className="hidden sm:inline">Open</span>
                </a>
              </div>
            </div>
            <div className="flex-1 bg-white overflow-hidden overscroll-y-contain">
              <iframe
                src={selectedFile}
                className="w-full h-full border-none"
                title="Document Viewer"
                sandbox="allow-same-origin allow-scripts"
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-slate-900 text-slate-400">
            <div className="text-center p-4">
              <div className="text-4xl mb-4">📚</div>
              <p>Select a document to start reading</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyDocsView;
