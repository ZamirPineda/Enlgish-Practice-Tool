import React, { useState, useEffect } from 'react';

interface FileNode {
    name: string;
    path: string;
    type: 'file' | 'directory';
    children?: FileNode[];
}

const StudyDocsView: React.FC = () => {
    const [fileTree, setFileTree] = useState<FileNode[]>([]);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('./study-docs/index.json')
            .then(res => {
                if (!res.ok) throw new Error("Failed to load index");
                return res.json();
            })
            .then(data => {
                setFileTree(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Could not load documentation index.");
                setIsLoading(false);
            });
    }, []);

    const toggleFolder = (path: string) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(path)) {
            newExpanded.delete(path);
        } else {
            newExpanded.add(path);
        }
        setExpandedFolders(newExpanded);
    };

    const handleFileSelect = (path: string) => {
        // Encode the path components to handle special characters in URL
        // But the path from index.json is relative. content is served statically.
        // We need to make sure we encode URI properly.
        // The path in JSON is like "Folder/File.html"
        // We need "/study-docs/Folder/File.html"
        const encodedPath = path.split('/').map(encodeURIComponent).join('/');
        setSelectedFile(`./study-docs/${encodedPath}`);
    };

    // Filter logic
    const filterNodes = (nodes: FileNode[]): FileNode[] => {
        if (!searchTerm) return nodes;

        return nodes.map(node => {
            if (node.type === 'file') {
                return node.name.toLowerCase().includes(searchTerm.toLowerCase()) ? node : null;
            } else if (node.children) {
                const filteredChildren = filterNodes(node.children);
                if (filteredChildren.length > 0) {
                    return { ...node, children: filteredChildren };
                }
            }
            return null;
        }).filter(Boolean) as FileNode[];
    };

    const displayedTree = filterNodes(fileTree);

    // Recursive tree renderer
    const renderTree = (nodes: FileNode[], level = 0) => {
        return nodes.map((node) => {
            if (node.type === 'directory') {
                const isExpanded = expandedFolders.has(node.path) || searchTerm !== '';
                return (
                    <div key={node.path} className="select-none">
                        <div
                            className={`flex items-center py-1 px-2 hover:bg-slate-700/50 cursor-pointer text-slate-300 transition-colors ${level === 0 ? 'font-semibold text-slate-200' : ''}`}
                            style={{ paddingLeft: `${level * 12 + 8}px` }}
                            onClick={() => toggleFolder(node.path)}
                        >
                            <span className="mr-2 text-xs opacity-70">
                                {isExpanded ? '📂' : '📁'}
                            </span>
                            <span className="truncate">{node.name}</span>
                        </div>
                        {isExpanded && node.children && (
                            <div className="border-l border-slate-700/50 ml-3">
                                {renderTree(node.children, level + 1)}
                            </div>
                        )}
                    </div>
                );
            } else {
                return (
                    <div
                        key={node.path}
                        className={`flex items-center py-1 px-2 cursor-pointer transition-colors ${selectedFile?.includes(encodeURIComponent(node.name)) ? 'bg-sky-600/30 text-sky-300' : 'hover:bg-slate-700/50 text-slate-400'}`}
                        style={{ paddingLeft: `${level * 12 + 8}px` }}
                        onClick={() => handleFileSelect(node.path)}
                    >
                        <span className="mr-2 text-xs opacity-70">📄</span>
                        <span className="truncate">{node.name}</span>
                    </div>
                );
            }
        });
    };

    if (isLoading) return <div className="p-8 text-center text-slate-400">Loading study docs...</div>;
    if (error) return <div className="p-8 text-center text-red-400">{error}</div>;

    return (
        <div className="flex h-full overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 flex-shrink-0 border-r border-slate-700 bg-slate-800/30 flex flex-col">
                <div className="p-4 border-b border-slate-700">
                    <input
                        type="text"
                        placeholder="Search docs..."
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-2">
                    {displayedTree.length > 0 ? renderTree(displayedTree) : (
                        <div className="text-center text-slate-500 py-4 text-sm">No matches found</div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white h-full relative">
                {selectedFile ? (
                    <iframe
                        src={selectedFile}
                        className="w-full h-full border-none"
                        title="Document Viewer"
                        sandbox="allow-same-origin allow-scripts"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full bg-slate-900 text-slate-500">
                        <div className="text-center">
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
