import React, { useEffect, useRef } from "react";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SlideOver: React.FC<SlideOverProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    panelRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const titleId = `slideover-title-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="w-screen max-w-md transform transition-transform duration-300 ease-in-out translate-x-0 bg-surface-1 border-l border-border shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 id={titleId} className="text-xl font-black text-text-primary">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary hover:bg-surface-2 p-2 rounded-lg transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none"
              aria-label="Close panel"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SlideOver;
