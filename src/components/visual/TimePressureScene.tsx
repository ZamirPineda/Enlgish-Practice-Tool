import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

interface TimePressureSceneProps {
  timeLeft: number;
  maxTime: number;
  className?: string;
}

const PressureOrb = ({ intensity }: { intensity: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    // Rotate faster as intensity increases
    meshRef.current.rotation.y += 0.01 + intensity * 0.05;
    meshRef.current.rotation.x += 0.005 + intensity * 0.02;

    // Distort more as intensity increases
    materialRef.current.distort = 0.2 + intensity * 0.6;
    materialRef.current.speed = 1 + intensity * 4;
  });

  // Color transitions from calm blue/green to urgent red/orange
  const color = useMemo(() => {
    const calm = new THREE.Color("#0ea5e9"); // Tailwind sky-500
    const urgent = new THREE.Color("#ef4444"); // Tailwind red-500
    return calm.lerp(urgent, intensity);
  }, [intensity]);

  const emissive = useMemo(() => {
    const calmE = new THREE.Color("#0284c7"); // Tailwind sky-600
    const urgentE = new THREE.Color("#b91c1c"); // Tailwind red-700
    return calmE.lerp(urgentE, intensity);
  }, [intensity]);

  return (
    <Float
      speed={1 + intensity * 3}
      rotationIntensity={0.5 + intensity}
      floatIntensity={0.5 + intensity * 2}
    >
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          ref={materialRef}
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5 + intensity * 1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={intensity > 0.8}
        />
      </Sphere>
    </Float>
  );
};

const TimePressureScene: React.FC<TimePressureSceneProps> = ({
  timeLeft,
  maxTime,
  className = "",
}) => {
  // Intensity is 0 when time is full, 1 when time is 0
  const intensity = Math.max(0, Math.min(1, 1 - timeLeft / maxTime));

  const bgGradient =
    intensity > 0.7
      ? "bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.15),_rgba(0,0,0,0)_70%)]"
      : "bg-transparent";

  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${bgGradient} ${className}`}
      style={{ zIndex: -1 }} // Keep it behind the interactive UI
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.5 + intensity * 0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1 + intensity} />
        <pointLight
          position={[-10, -10, -5]}
          color={intensity > 0.5 ? "#ef4444" : "#0ea5e9"}
          intensity={2}
        />

        <PressureOrb intensity={intensity} />

        <Sparkles
          count={50 + Math.floor(intensity * 100)}
          scale={6}
          size={1 + intensity * 3}
          speed={0.2 + intensity * 1.5}
          color={intensity > 0.6 ? "#fca5a5" : "#bae6fd"}
        />
      </Canvas>

      {/* Rive Placeholder for the actual Timer Clock */}
      {/* When the user provides a .riv file for the timer, it can be mounted here */}
      {/* 
      <div className="absolute top-4 right-4 w-16 h-16 opacity-50">
         <Rive src="/rive/timer.riv" stateMachines="State Machine 1" />
      </div>
      */}
    </div>
  );
};

export default TimePressureScene;
