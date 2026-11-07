import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";

export interface UnitCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  earnedXp: number;
}

export const UnitCompletionModal: React.FC<UnitCompletionModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  earnedXp,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          isOpen={isOpen}
          onOpenChange={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          isDismissable={false}
        >
          <Modal className="relative w-full max-w-sm outline-none">
            <Dialog className="outline-none" aria-label={title}>
              {({ close }) => {
                const handleClose = () => {
                  close();
                  onClose();
                };

                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 30 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="flex flex-col items-center overflow-hidden rounded-3xl bg-surface p-8 text-center shadow-2xl border-2 border-emerald-500/30"
                  >
                    <motion.div
                      initial={{ scale: 0.5, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        damping: 12,
                        stiffness: 200,
                        delay: 0.2,
                      }}
                      className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-emerald-500/20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-16 w-16 text-emerald-500 drop-shadow-lg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>

                    <h2 className="mb-2 text-2xl font-black tracking-tight text-emerald-500">
                      ¡Felicidades!
                    </h2>

                    <p className="mb-1 text-lg font-bold text-text-primary">
                      {title}
                    </p>

                    <p className="mb-6 text-sm text-text-secondary">
                      {description}
                    </p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-8 flex items-center justify-center gap-2 rounded-xl bg-surface-2 px-5 py-3 border border-border"
                    >
                      <span className="text-sm font-black uppercase tracking-wider text-text-muted">
                        Recompensa
                      </span>
                      <span className="text-xl font-black text-accent">
                        +{earnedXp} XP
                      </span>
                    </motion.div>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full rounded-2xl bg-emerald-500 px-6 py-4 text-base font-black uppercase tracking-widest text-white shadow-[0_4px_0_0_rgb(16,185,129)] transition-all hover:bg-emerald-400 hover:shadow-[0_2px_0_0_rgb(16,185,129)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/40"
                    >
                      Continuar
                    </button>
                  </motion.div>
                );
              }}
            </Dialog>
          </Modal>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};
