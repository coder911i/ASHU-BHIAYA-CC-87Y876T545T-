"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Stylized Architectural Modern Home & Floating Growth Glyphs
function ArchitecturalHouse() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      Math.sin(t * 0.4) * 0.15 + (state.pointer.x * 0.25),
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      Math.cos(t * 0.3) * 0.05 - (state.pointer.y * 0.12),
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Foundation Platform / Pedestal - Crisp Slate & Chrome */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[2.8, 3.1, 0.25, 32]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.4} roughness={0.2} />
      </mesh>

      {/* Blue Accent Ring */}
      <mesh position={[0, -0.66, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.68, 32]} />
        <meshBasicMaterial color="#0284C7" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Modern Main Living Pavilion */}
      <mesh position={[-0.4, 0, 0]}>
        <boxGeometry args={[2.0, 1.2, 1.6]} />
        <meshStandardMaterial
          color="#1E293B"
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Upper Architectural Cantilever Cube */}
      <mesh position={[0.4, 0.8, 0.2]}>
        <boxGeometry args={[1.8, 1.0, 1.4]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Illuminated Architectural Windows */}
      <mesh position={[-0.4, 0, 0.81]}>
        <planeGeometry args={[1.6, 0.8]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      <mesh position={[0.4, 0.8, 0.91]}>
        <planeGeometry args={[1.4, 0.6]} />
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#2563EB"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Gable Roof Feature / Angular Canopy */}
      <mesh position={[-0.4, 0.72, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.12, 1.8]} />
        <meshStandardMaterial color="#0284C7" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0.4, 1.42, 0.2]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.0, 0.12, 1.6]} />
        <meshStandardMaterial color="#2563EB" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Upward Growth Financial Pillar */}
      <mesh position={[1.4, 0.3, -0.6]}>
        <boxGeometry args={[0.3, 2.2, 0.3]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#059669"
          emissiveIntensity={0.5}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

// Floating Financial Tokens & Growth Cards
function FloatingFintechCards() {
  const cardGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!cardGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    cardGroupRef.current.rotation.y = t * 0.15;
  });

  return (
    <group ref={cardGroupRef}>
      {/* Floating Card 1: Home Loan */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8} position={[-2.2, 1.2, 0.8]}>
        <mesh rotation={[0.2, 0.4, 0]}>
          <boxGeometry args={[1.2, 0.7, 0.05]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#0284C7"
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Floating Card 2: Growth Badge */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.7} position={[2.2, 0.9, -0.5]}>
        <mesh rotation={[-0.2, -0.4, 0]}>
          <boxGeometry args={[1.1, 0.65, 0.05]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#10B981"
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Floating Golden Sphere Beacon */}
      <Float speed={3} rotationIntensity={0.2} floatIntensity={1} position={[1.6, 2.2, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function Hero3DScene() {
  return (
    <div className="relative w-full h-[300px] sm:h-[390px] md:h-[440px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#182345] via-[#121a33] to-[#101426] border border-white/10 shadow-2xl">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <PerspectiveCamera makeDefault position={[0, 1.2, 5.5]} fov={45} />
        <ambientLight intensity={1.6} />
        <directionalLight position={[6, 8, 5]} intensity={2.2} color="#FFFFFF" />
        <pointLight position={[-4, 3, -2]} intensity={1.5} color="#93C5FD" />
        <pointLight position={[2, -1, 3]} intensity={1.2} color="#38BDF8" />

        <ArchitecturalHouse />
        <FloatingFintechCards />
      </Canvas>
    </div>
  );
}
