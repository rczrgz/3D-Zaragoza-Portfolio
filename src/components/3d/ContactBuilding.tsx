import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FloatingMarker } from './FloatingMarker';

interface ContactBuildingProps {
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
}

export const ContactBuilding: React.FC<ContactBuildingProps> = ({
  position,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const dishRef = useRef<THREE.Group>(null);
  const beaconRingsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetScale = hovered || isSelected ? 1.06 : 1.0;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 8
      );
    }
    if (dishRef.current) {
      dishRef.current.rotation.y += delta * 0.7;
    }
    if (beaconRingsRef.current) {
      // Pulsing transmission ring expansion
      const s = 1.0 + ((state.clock.elapsedTime * 1.5) % 1) * 0.6;
      beaconRingsRef.current.scale.set(s, s, s);
    }
  });

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={position}>
      {/* Floating Marker */}
      <FloatingMarker
        position={[0, 6.8, 0]}
        title="CONTACT"
        subtitle="Get in Touch"
        color="#14b8a6"
        districtId="contact"
        isSelected={isSelected}
        isHovered={hovered}
        onClick={onSelect}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      <group
        ref={groupRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Foundation Platform */}
        <mesh receiveShadow position={[0, 0.15, 0]}>
          <cylinderGeometry args={[3.2, 3.5, 0.3, 16]} />
          <meshStandardMaterial color={hovered ? '#ccfbf1' : '#f8fafc'} roughness={0.6} />
        </mesh>

        {/* Cyber Station Command Hub */}
        <mesh castShadow position={[0, 1.2, 0]}>
          <cylinderGeometry args={[2.0, 2.5, 1.8, 16]} />
          <meshStandardMaterial
            color={hovered ? '#0d9488' : '#0f766e'}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>

        {/* Observation Ring Glass */}
        <mesh position={[0, 2.3, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.6, 16]} />
          <meshStandardMaterial
            color="#2dd4bf"
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Upper Spire Base */}
        <mesh position={[0, 3.0, 0]} castShadow>
          <cylinderGeometry args={[0.8, 1.6, 0.8, 8]} />
          <meshStandardMaterial color="#115e59" roughness={0.4} />
        </mesh>

        {/* High-Gain Antenna Tower Spire */}
        <mesh position={[0, 4.4, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.25, 2.0, 8]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Rotating Satellite Dish on Side Bracket */}
        <group ref={dishRef} position={[0.8, 3.4, 0]}>
          <mesh position={[0.4, 0.2, 0]} rotation={[0, 0, -Math.PI / 3]}>
            <cylinderGeometry args={[0.6, 0.1, 0.15, 16]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.6, 0.3, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#2dd4bf" />
          </mesh>
        </group>

        {/* Pulsing Beacon Signal Rings */}
        <group ref={beaconRingsRef} position={[0, 5.4, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.4, 0.5, 16]} />
            <meshBasicMaterial color="#2dd4bf" transparent opacity={0.6} />
          </mesh>
        </group>

        {/* Top Glowing Signal Orb */}
        <mesh position={[0, 5.5, 0]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#14b8a6"
            emissiveIntensity={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};
