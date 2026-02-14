"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function RotatingMesh() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={meshRef}>
      <Sphere args={[2, 100, 100]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00d4ff"
          speed={2}
          distort={0.6}
          emissive="#00d4ff"
          emissiveIntensity={0.5}
        />
      </Sphere>

      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.2, 16, 100]} />
        <meshPhongMaterial
          color="#b026ff"
          wireframe={false}
          emissive="#b026ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3, 0.15, 16, 100]} />
        <meshPhongMaterial
          color="#ff006e"
          wireframe={false}
          emissive="#ff006e"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function CameraControl() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 6);
  }, [camera]);

  return null;
}

function LandingScene() {
  return (
    <Canvas className="w-full h-full" dpr={[1, 2]}>
      <CameraControl />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, 10]} intensity={1} color="#b026ff" />
      <RotatingMesh />
      <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
    </Canvas>
  );
}

export default LandingScene;
