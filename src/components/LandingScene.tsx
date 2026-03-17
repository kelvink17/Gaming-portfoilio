"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ------------------------------------------------------------
// 3D Starfield (floating particles)
// ------------------------------------------------------------
function StarField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 1500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // Random sphere distribution
    const r = 5 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Random neon colors
    const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.6);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  useFrame(() => {
    pointsRef.current.rotation.y += 0.0002;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={0.1}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ------------------------------------------------------------
// Main 3D scene – reacts to mouse
// ------------------------------------------------------------
function SceneContent() {
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  useFrame(() => {
    // Subtle rotation based on mouse position
    groupRef.current.rotation.y += 0.001;
    groupRef.current.rotation.x = mouse.y * 0.2;
    groupRef.current.rotation.y += mouse.x * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing sphere (gaming/football vibe) */}
      <Sphere args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00d4ff"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>

      {/* Outer rotating torus knots */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <torusKnotGeometry args={[2.5, 0.3, 100, 16]} />
        <meshStandardMaterial
          color="#b026ff"
          emissive="#b026ff"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusKnotGeometry args={[3, 0.2, 100, 16]} />
        <meshStandardMaterial
          color="#ff006e"
          emissive="#ff006e"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>

      {/* Floating cubes around the ball */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3.8;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.5,
              0,
            ]}
            scale={0.2}
          >
            <boxGeometry />
            <meshStandardMaterial
              color="#39ff14"
              emissive="#39ff14"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ------------------------------------------------------------
// Camera setup
// ------------------------------------------------------------
function CameraController() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 1, 8);
  }, [camera]);
  return null;
}

// ------------------------------------------------------------
// Main export
// ------------------------------------------------------------
export default function LandingScene() {
  return (
    <div className="w-full h-full bg-transparent">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={["#050510"]} />
        <CameraController />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00d4ff" />
        <pointLight position={[-5, -3, 5]} intensity={1.2} color="#b026ff" />
        <pointLight position={[3, -5, 5]} intensity={1} color="#ff006e" />

        <SceneContent />
        <StarField />

        <OrbitControls
          autoRotate
          autoRotateSpeed={0.8}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
        />

        {/* Bloom effect for that neon glow */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={1.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
