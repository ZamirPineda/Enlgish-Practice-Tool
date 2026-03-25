import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

interface AnswerFeedbackProps {
  type: "success" | "error" | "info" | null;
  message?: string;
  onComplete?: () => void;
}

const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({
  type,
  message,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (type) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 1500); // Quick burst duration
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [type, onComplete]);

  if (!type && !isVisible) return null;

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="absolute inset-x-0 bottom-full mb-4 pointer-events-none flex justify-center items-center z-50"
        >
          {/* Confetti / Sparkles Canvas */}
          <div className="absolute inset-0 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <Canvas
              camera={{ position: [0, 0, 5] }}
              style={{ pointerEvents: "none" }}
              gl={{ alpha: true }}
            >
              {isSuccess ? (
                <>
                  <ambientLight intensity={1} />
                  <Stars
                    radius={2}
                    depth={10}
                    count={300}
                    factor={4}
                    saturation={1}
                    fade
                    speed={2}
                  />
                  <Sparkles
                    color="#34d399"
                    count={100}
                    scale={4}
                    size={4}
                    speed={0.8}
                  />
                </>
              ) : (
                <>
                  <ambientLight intensity={1} color="#ef4444" />
                  <Sparkles
                    color="#ef4444"
                    count={80}
                    scale={5}
                    size={6}
                    speed={2}
                    noise={1}
                  />
                </>
              )}
            </Canvas>
          </div>

          {/* Rive Placeholder for Check/Cross */}
          {/* 
          <div className="relative z-10 w-24 h-24 bg-surface-2 rounded-full border-4 shadow-xl flex items-center justify-center 
            ${isSuccess ? 'border-success text-success' : 'border-error text-error'}">
             <Rive src="/rive/feedback.riv" stateMachines="State Machine" />
             <span className="text-4xl">{isSuccess ? '✓' : '✗'}</span>
          </div>
          */}

          <div
            className={`relative z-10 px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 text-white font-black text-xl tracking-wider uppercase
              ${
                isSuccess
                  ? "bg-emerald-500/80 shadow-emerald-500/50"
                  : "bg-red-500/80 shadow-red-500/50"
              }`}
          >
            {isSuccess ? "Correct!" : "Incorrect!"}
            {message && (
              <div className="text-sm font-medium mt-1 uppercase tracking-normal">
                {message}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnswerFeedback;
