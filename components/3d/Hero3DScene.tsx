"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, RoundedBox, ContactShadows, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function GrowthSculpture() {
  const root = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const coin = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, state.pointer.x * 0.12 + Math.sin(t * 0.25) * 0.08, 3, delta);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -state.pointer.y * 0.08, 3, delta);
    }
    if (ring.current) ring.current.rotation.z = t * 0.14;
    if (coin.current) coin.current.rotation.y = t * 0.55;
  });

  return (
    <group ref={root} position={[0, -0.2, 0]}>
      {/* Floating glass-like foundation */}
      <mesh position={[0, -1.2, 0]} rotation={[0.04, 0, 0]}>
        <cylinderGeometry args={[2.05, 2.2, 0.18, 96]} />
        <meshPhysicalMaterial color="#e9edff" metalness={0.55} roughness={0.2} clearcoat={1} />
      </mesh>
      <mesh position={[0, -1.095, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.92, 0.025, 12, 100]} />
        <meshBasicMaterial color="#8ca5ff" />
      </mesh>

      {/* Main premium financial dashboard slab */}
      <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.13}>
        <group position={[0, 0.12, 0.12]} rotation={[-0.06, -0.22, 0]}>
          <RoundedBox args={[2.45, 2.45, 0.18]} radius={0.16} smoothness={5} position={[0, 0, 0]}>
            <meshPhysicalMaterial color="#192747" roughness={0.23} metalness={0.25} clearcoat={1} clearcoatRoughness={0.16} />
          </RoundedBox>
          <RoundedBox args={[2.12, 2.1, 0.055]} radius={0.1} smoothness={5} position={[0, 0.04, 0.12]}>
            <meshPhysicalMaterial color="#263b68" roughness={0.25} metalness={0.12} clearcoat={0.8} />
          </RoundedBox>
          {/* Chart bars, carefully arranged on the front face */}
          {[
            { x: -0.67, h: 0.42, c: "#7e9aff" },
            { x: -0.34, h: 0.7, c: "#8ba8ff" },
            { x: -0.01, h: 0.92, c: "#a5b8ff" },
            { x: 0.32, h: 1.12, c: "#c0cbff" },
            { x: 0.65, h: 1.38, c: "#72e2c2" },
          ].map((bar) => (
            <RoundedBox key={bar.x} args={[0.19, bar.h, 0.045]} radius={0.035} smoothness={4} position={[bar.x, -0.62 + bar.h / 2, 0.19]}>
              <meshStandardMaterial color={bar.c} emissive={bar.c} emissiveIntensity={0.12} roughness={0.28} metalness={0.18} />
            </RoundedBox>
          ))}
          <mesh position={[0.02, 0.55, 0.19]}>
            <boxGeometry args={[1.45, 0.018, 0.025]} />
            <meshBasicMaterial color="#7188bf" transparent opacity={0.75} />
          </mesh>
          <mesh position={[0.02, 0.28, 0.19]}>
            <boxGeometry args={[1.45, 0.012, 0.025]} />
            <meshBasicMaterial color="#7188bf" transparent opacity={0.45} />
          </mesh>
        </group>
      </Float>

      {/* Rising columns: sculptural, not block-house geometry */}
      <group position={[0, -0.78, -0.55]} rotation={[0, -0.25, 0]}>
        {[
          { x: -0.9, h: 0.62, c: "#5b76d8" },
          { x: -0.45, h: 0.88, c: "#718bea" },
          { x: 0, h: 1.12, c: "#879eff" },
          { x: 0.45, h: 1.38, c: "#8bb5ff" },
          { x: 0.9, h: 1.65, c: "#79d9c2" },
        ].map((bar) => (
          <Float key={bar.x} speed={1.5 + bar.h / 2} floatIntensity={0.08} rotationIntensity={0.02}>
            <RoundedBox args={[0.22, bar.h, 0.22]} radius={0.07} smoothness={5} position={[bar.x, bar.h / 2 - 0.02, 0]}>
              <meshPhysicalMaterial color={bar.c} metalness={0.32} roughness={0.23} clearcoat={0.9} />
            </RoundedBox>
          </Float>
        ))}
      </group>

      {/* Orbiting metallic coin */}
      <Float speed={1.7} rotationIntensity={0.15} floatIntensity={0.25} position={[1.75, 1.35, 0.45]}>
        <group ref={coin}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.1, 64]} />
            <meshPhysicalMaterial color="#f3bd63" metalness={0.88} roughness={0.19} clearcoat={1} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0.2]} position={[0, 0, 0.055]}>
            <torusGeometry args={[0.28, 0.018, 10, 64]} />
            <meshStandardMaterial color="#ffe1a0" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </Float>

      {/* Orbit ring */}
      <mesh ref={ring} position={[0.1, 0.15, -0.45]} rotation={[1.18, 0.28, 0.2]}>
        <torusGeometry args={[2.35, 0.012, 8, 128]} />
        <meshBasicMaterial color="#7d95ff" transparent opacity={0.55} />
      </mesh>
      <Float speed={1.4} floatIntensity={0.2} rotationIntensity={0.08} position={[-1.75, 0.9, 0.5]}>
        <RoundedBox args={[0.68, 0.48, 0.12]} radius={0.08} smoothness={5}>
          <meshPhysicalMaterial color="#f5f7ff" metalness={0.2} roughness={0.18} clearcoat={1} />
        </RoundedBox>
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[0.32, 0.025, 0.01]} />
          <meshBasicMaterial color="#839aff" />
        </mesh>
      </Float>
    </group>
  );
}

export function Hero3DScene() {
  return (
    <div className="vsr-hero-canvas relative w-full h-[330px] sm:h-[410px] md:h-[470px] overflow-hidden rounded-[30px] border border-white/10 shadow-2xl">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(76,101,185,.24), transparent 58%), linear-gradient(145deg, #182341, #11182d 72%)" }} />
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.4, 7.6], fov: 37 }}
        className="relative z-10 w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0.35, 7.6]} fov={37} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 5]} intensity={2.6} color="#ffffff" />
        <pointLight position={[-4, 2, 2]} intensity={2.4} color="#718cff" />
        <pointLight position={[3, -2, 1]} intensity={1.5} color="#54d9c0" />
        <spotLight position={[0, 5, -2]} intensity={1.8} angle={0.65} penumbra={0.8} color="#9cb1ff" />
        <Environment preset="city" />
        <Sparkles count={38} scale={6.5} size={1.5} speed={0.18} color="#c5d0ff" opacity={0.55} />
        <GrowthSculpture />
        <ContactShadows position={[0, -1.25, 0]} opacity={0.38} scale={6.5} blur={2.8} far={3.5} />
      </Canvas>
      <div className="vsr-art-caption" aria-hidden="true"><span className="vsr-art-caption-dot" /> Plan with clarity <span>·</span> Move with confidence</div>
    </div>
  );
}
