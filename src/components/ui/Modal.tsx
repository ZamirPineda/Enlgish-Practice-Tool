import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Card from "@/components/ui/Card";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  ariaLabel = "Modal dialog",
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] animate-fade-in" />
        <Dialog.Content
          aria-label={ariaLabel}
          className="fixed left-[50%] top-[50%] z-[71] w-full max-w-md translate-x-[-50%] translate-y-[-50%] p-4 focus:outline-none animate-fade-in"
        >
          <Card
            className={`relative w-full max-w-md bg-surface-1 ${className}`.trim()}
            elevated
          >
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-4 top-4 text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded"
                aria-label="Close modal"
              >
                ✕
              </button>
            </Dialog.Close>
            {children}
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
