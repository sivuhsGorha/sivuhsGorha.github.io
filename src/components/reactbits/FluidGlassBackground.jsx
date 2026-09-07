/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlassBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true, toneMapping: THREE.NoToneMapping }}
      style={{ backgroundColor: 'transparent', position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <MotionBackground />
    </Canvas>
  );
}



function MotionBackground() {
  const group = useRef();
  
  useFrame((state, delta) => {
    if (group.current) {
      easing.dampE(group.current.rotation, [state.pointer.y * 0.2, state.pointer.x * 0.3, 0], 1.5, delta);
      easing.damp3(group.current.position, [state.pointer.x * 1.2, -state.pointer.y * 1.2, -5], 1.5, delta);
    }
  });

  const metallicProps = {
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  };

  return (
    <group ref={group} position={[0, 0, -5]}>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 20, 10]} intensity={0.5} color="#ffffff" />
      <directionalLight position={[-10, -20, -10]} intensity={0.3} color="#00ffff" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={3}>
        <mesh position={[-2, 2, -2]}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshPhysicalMaterial color="#aa00aa" emissive="#220022" emissiveIntensity={0.2} {...metallicProps} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={4}>
        <mesh position={[2, -3, -1]}>
          <sphereGeometry args={[3, 64, 64]} />
          <meshPhysicalMaterial color="#0088aa" emissive="#001122" emissiveIntensity={0.2} {...metallicProps} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[0, 0, -6]}>
          <sphereGeometry args={[4, 64, 64]} />
          <meshPhysicalMaterial color="#4a1b82" emissive="#110022" emissiveIntensity={0.2} {...metallicProps} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={5}>
        <mesh position={[1.5, 4, -4]}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshPhysicalMaterial color="#aa2200" emissive="#220000" emissiveIntensity={0.2} {...metallicProps} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={3}>
        <mesh position={[-2.5, -4, -3]}>
          <sphereGeometry args={[2.8, 64, 64]} />
          <meshPhysicalMaterial color="#00aa44" emissive="#002211" emissiveIntensity={0.2} {...metallicProps} />
        </mesh>
      </Float>
    </group>
  );
}
