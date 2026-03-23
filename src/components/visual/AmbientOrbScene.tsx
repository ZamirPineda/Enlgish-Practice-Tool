import React, { Suspense, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import { Cuboid } from "lucide-react";

interface AmbientOrbSceneProps {
  className?: string;
  variant?: "sky" | "emerald" | "sunset" | "violet";
  label?: string;
  title?: string;
  description?: string;
  compact?: boolean;
  intensity?: number;
  energy?: number;
}

const isTestMode = import.meta.env.MODE === "test";

const VARIANTS = {
  sky: {
    border: "border-cyan-500/20",
    bg: "bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.34),_rgba(15,23,42,0.96)_58%)]",
    overlay:
      "bg-[linear-gradient(135deg,rgba(34,211,238,0.2),transparent_45%,rgba(16,185,129,0.18))]",
    lightA: "#7dd3fc",
    lightB: "#34d399",
    shell: "#38bdf8",
    ringA: "#67e8f9",
    ringB: "#6ee7b7",
    emissive: "#0f766e",
    text: "text-cyan-50/85",
    badge: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
  },
  emerald: {
    border: "border-emerald-500/20",
    bg: "bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.34),_rgba(6,23,23,0.96)_58%)]",
    overlay:
      "bg-[linear-gradient(135deg,rgba(16,185,129,0.2),transparent_45%,rgba(45,212,191,0.16))]",
    lightA: "#86efac",
    lightB: "#2dd4bf",
    shell: "#34d399",
    ringA: "#6ee7b7",
    ringB: "#5eead4",
    emissive: "#047857",
    text: "text-emerald-50/85",
    badge: "border-emerald-300/25 bg-emerald-300/10 text-emerald-50",
  },
  sunset: {
    border: "border-amber-500/20",
    bg: "bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.34),_rgba(67,20,7,0.96)_58%)]",
    overlay:
      "bg-[linear-gradient(135deg,rgba(249,115,22,0.2),transparent_45%,rgba(244,63,94,0.18))]",
    lightA: "#fdba74",
    lightB: "#fb7185",
    shell: "#fb923c",
    ringA: "#fdba74",
    ringB: "#fda4af",
    emissive: "#c2410c",
    text: "text-orange-50/85",
    badge: "border-orange-300/25 bg-orange-300/10 text-orange-50",
  },
  violet: {
    border: "border-violet-500/20",
    bg: "bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.34),_rgba(23,16,42,0.96)_58%)]",
    overlay:
      "bg-[linear-gradient(135deg,rgba(139,92,246,0.2),transparent_45%,rgba(236,72,153,0.18))]",
    lightA: "#c4b5fd",
    lightB: "#f472b6",
    shell: "#a78bfa",
    ringA: "#c4b5fd",
    ringB: "#f9a8d4",
    emissive: "#7c3aed",
    text: "text-violet-50/85",
    badge: "border-violet-300/25 bg-violet-300/10 text-violet-50",
  },
} as const;

const AmbientOrbScene: React.FC<AmbientOrbSceneProps> = ({
  className = "",
  variant = "sky",
  label,
  title,
  description,
  compact = false,
  intensity = 0.35,
  energy = 0.3,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const clampedIntensity = Math.max(0, Math.min(1, intensity));
  const clampedEnergy = Math.max(0, Math.min(1, energy));
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(pointerY, [-1, 1], [compact ? 4 : 6, compact ? -4 : -6]),
    {
      stiffness: 140,
      damping: 18,
      mass: 0.4,
    },
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-1, 1], [compact ? -4 : -6, compact ? 4 : 6]),
    {
      stiffness: 140,
      damping: 18,
      mass: 0.4,
    },
  );
  const driftX = useSpring(
    useTransform(pointerX, [-1, 1], [compact ? -8 : -12, compact ? 8 : 12]),
    {
      stiffness: 120,
      damping: 20,
      mass: 0.45,
    },
  );
  const driftY = useSpring(
    useTransform(pointerY, [-1, 1], [compact ? -6 : -10, compact ? 6 : 10]),
    {
      stiffness: 120,
      damping: 20,
      mass: 0.45,
    },
  );
  const glowX = useTransform(pointerX, [-1, 1], ["-8%", "8%"]);
  const glowY = useTransform(pointerY, [-1, 1], ["-6%", "6%"]);
  const contentX = useTransform(
    pointerX,
    [-1, 1],
    [compact ? -4 : -6, compact ? 4 : 6],
  );
  const contentY = useTransform(
    pointerY,
    [-1, 1],
    [compact ? -3 : -5, compact ? 3 : 5],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const updatePointerMode = () => setIsCoarsePointer(mediaQuery.matches);
    updatePointerMode();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePointerMode);
      return () => mediaQuery.removeEventListener("change", updatePointerMode);
    }

    mediaQuery.addListener(updatePointerMode);
    return () => mediaQuery.removeListener(updatePointerMode);
  }, []);

  const palette = VARIANTS[variant];
  const heightClass = compact ? "h-44" : "h-64";

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (
    event,
  ) => {
    if (event.pointerType === "touch" || isCoarsePointer) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(x);
    pointerY.set(y);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      onPointerMove={isCoarsePointer ? undefined : handlePointerMove}
      onPointerLeave={isCoarsePointer ? undefined : resetPointer}
      onPointerCancel={isCoarsePointer ? undefined : resetPointer}
      style={{
        rotateX: isCoarsePointer ? 0 : rotateX,
        rotateY: isCoarsePointer ? 0 : rotateY,
        transformStyle: "preserve-3d",
        touchAction: "pan-y pinch-zoom",
        pointerEvents: isCoarsePointer ? "none" : "auto",
      }}
      className={`relative overflow-hidden rounded-[2rem] border ${palette.border} ${palette.bg} ${heightClass} ${className}`.trim()}
    >
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${palette.overlay}`}
        style={{
          x: isCoarsePointer ? 0 : driftX,
          y: isCoarsePointer ? 0 : driftY,
          opacity: 0.65 + clampedIntensity * 0.2 + clampedEnergy * 0.15,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.18), transparent 52%)",
          x: isCoarsePointer ? "0%" : glowX,
          y: isCoarsePointer ? "0%" : glowY,
          scale: 1 + clampedIntensity * 0.08,
        }}
      />
      {isMounted && !isTestMode ? (
        <motion.div
          style={{ x: driftX, y: driftY }}
          className="pointer-events-none absolute inset-0"
        >
          <Canvas
            dpr={[1, 1.5]}
            camera={{
              position: [0, 0, compact ? 6.4 : 5.8],
              fov: compact ? 48 : 42,
            }}
            gl={{ alpha: true, antialias: true }}
          >
            <color attach="background" args={["#020617"]} />
            <fog attach="fog" args={["#020617", 5, 11]} />
            <ambientLight intensity={1.4} />
            <directionalLight
              position={[2.5, 3, 3]}
              intensity={2.6}
              color={palette.lightA}
            />
            <pointLight
              position={[-3, -1, 2]}
              intensity={12}
              color={palette.lightB}
            />
            <Suspense fallback={null}>
              <Float
                speed={2.4 + clampedEnergy * 1.1}
                rotationIntensity={1.05 + clampedEnergy * 0.55}
                floatIntensity={1.2 + clampedIntensity * 0.8}
              >
                <group scale={compact ? 0.86 : 1}>
                  <mesh>
                    <icosahedronGeometry args={[1.4, 3]} />
                    <meshStandardMaterial
                      color={palette.shell}
                      emissive={palette.emissive}
                      emissiveIntensity={0.65}
                      roughness={0.2}
                      metalness={0.7}
                      wireframe
                    />
                  </mesh>
                  <mesh rotation={[0.6, 0.7, 0.2]}>
                    <torusGeometry args={[2.1, 0.05, 24, 120]} />
                    <meshStandardMaterial
                      color={palette.ringA}
                      emissive={palette.ringA}
                      emissiveIntensity={1.1}
                    />
                  </mesh>
                  <mesh rotation={[1.2, 0.1, 1]}>
                    <torusGeometry args={[2.6, 0.035, 18, 120]} />
                    <meshStandardMaterial
                      color={palette.ringB}
                      emissive={palette.ringB}
                      emissiveIntensity={0.9}
                    />
                  </mesh>
                </group>
              </Float>
              <Sparkles
                count={compact ? 60 : 90}
                scale={[7, 4, 4]}
                size={2.4 + clampedIntensity * 0.6}
                speed={0.45 + clampedEnergy * 0.25}
                color="#ffffff"
              />
            </Suspense>
            <OrbitControls
              enableRotate={false}
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={
                0.55 + clampedEnergy * 0.35 + clampedIntensity * 0.2
              }
            />
          </Canvas>
        </motion.div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80 backdrop-blur-sm">
            <Cuboid className="h-8 w-8" />
          </div>
        </div>
      )}

      {(label || title || description) && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 p-4"
          style={{
            x: isCoarsePointer ? 0 : contentX,
            y: isCoarsePointer ? 0 : contentY,
          }}
        >
          <div className="max-w-sm">
            {label ? (
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] ${palette.badge}`}
              >
                {label}
              </div>
            ) : null}
            {title ? (
              <div className="mt-3 text-xl font-black text-white">{title}</div>
            ) : null}
            {description ? (
              <p className={`mt-2 text-sm leading-6 ${palette.text}`}>
                {description}
              </p>
            ) : null}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AmbientOrbScene;
