import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

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
  const titleId = `slideover-title-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in" />
        <Dialog.Content
          aria-labelledby={titleId}
          className="fixed inset-y-0 right-0 z-[81] flex w-screen max-w-md flex-col bg-surface-1 border-l border-border shadow-2xl focus:outline-none"
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Dialog.Title
              id={titleId}
              className="text-xl font-black text-text-primary"
            >
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
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
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SlideOver;
