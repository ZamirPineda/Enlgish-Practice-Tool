import React from "react";
import Card from "./Card";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[70] animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <Card
        className={`relative w-full max-w-md bg-[var(--color-surface-1)] ${className}`.trim()}
        elevated
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </Card>
    </div>
  );
};

export default Modal;
