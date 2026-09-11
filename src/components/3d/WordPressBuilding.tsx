import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FloatingMarker } from './FloatingMarker';

interface WordPressBuildingProps {
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
}

export const WordPressBuilding: React.FC<WordPressBuildingProps> = ({
  position,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const gearRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth scaling on hover
      const targetScale = hovered || isSelected ? 1.06 : 1.0;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 8
      );
    }
    if (gearRef.current) {
      gearRef.current.rotation.z += delta * 0.5;
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
        position={[0, 5.6, 0]}
        title="WORDPRESS"
        subtitle="CMS & Plugins"
        color="#0284c7"
        districtId="wordpress"
        isSelected={isSelected}
        isHovered={hovered}
        onClick={onSelect}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      {/* Building 3D Group */}
      <group
        ref={groupRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Base Foundation Platform */}
        <mesh receiveShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[4.8, 0.3, 4.8]} />
          <meshStandardMaterial
            color={hovered ? '#e0f2fe' : '#f8fafc'}
            roughness={0.6}
          />
        </mesh>

        {/* Lower Main Hall */}
        <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
          <boxGeometry args={[4.2, 2.0, 4.2]} />
          <meshStandardMaterial
            color={hovered ? '#0284c7' : '#0369a1'}
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>

        {/* Mid Tower Tier */}
        <mesh castShadow receiveShadow position={[0, 2.7, 0]}>
          <boxGeometry args={[3.2, 1.3, 3.2]} />
          <meshStandardMaterial
            color={hovered ? '#0ea5e9' : '#0284c7'}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Top Observatory / Crown */}
        <mesh castShadow receiveShadow position={[0, 3.8, 0]}>
          <boxGeometry args={[2.2, 1.0, 2.2]} />
          <meshStandardMaterial
            color={hovered ? '#38bdf8' : '#0ea5e9'}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        {/* Roof Pyramid Dome */}
        <mesh castShadow position={[0, 4.75, 0]}>
          <coneGeometry args={[1.6, 1.1, 4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>

        {/* Spire */}
        <mesh position={[0, 5.4, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 0.8, 6]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.8} />
        </mesh>

        {/* WordPress Emblem Feature: Front circular medallion with "W" style inlays */}
        <group position={[0, 2.2, 2.15]}>
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.85, 0.85, 0.12, 32]} />
            <meshStandardMaterial
              color="#0284c7"
              roughness={0.3}
              metalness={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.6, 0.75, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* "W" Wings */}
          <mesh position={[-0.3, 0, 0.08]} rotation={[0, 0, -0.25]}>
            <boxGeometry args={[0.12, 0.8, 0.02]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.3, 0, 0.08]} rotation={[0, 0, 0.25]}>
            <boxGeometry args={[0.12, 0.8, 0.02]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.1, -0.1, 0.08]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.1, 0.6, 0.02]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.1, -0.1, 0.08]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.1, 0.6, 0.02]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Glowing Office Windows */}
        {[-1.3, 0, 1.3].map((x, i) => (
          <group key={`wp-win-row1-${i}`}>
            <mesh position={[x, 1.3, 2.12]}>
              <boxGeometry args={[0.7, 0.9, 0.05]} />
              <meshBasicMaterial color={hovered ? '#bae6fd' : '#7dd3fc'} />
            </mesh>
            <mesh position={[-2.12, 1.3, x]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[0.7, 0.9, 0.05]} />
              <meshBasicMaterial color={hovered ? '#bae6fd' : '#7dd3fc'} />
            </mesh>
            <mesh position={[2.12, 1.3, x]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[0.7, 0.9, 0.05]} />
              <meshBasicMaterial color={hovered ? '#bae6fd' : '#7dd3fc'} />
            </mesh>
          </group>
        ))}

        {/* Side Plugin & WooCommerce Module (Attached Datacenter Pod) */}
        <mesh castShadow position={[-2.4, 0.8, 0]}>
          <boxGeometry args={[1.2, 1.4, 2.6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        {/* WooCommerce purple badge on side pod */}
        <mesh position={[-3.02, 0.9, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[1.4, 0.7, 0.04]} />
          <meshBasicMaterial color="#9333ea" />
        </mesh>

        {/* Rotating Cog / Gear on the side representing custom plugins & PHP engine */}
        <mesh
          ref={gearRef}
          position={[-3.06, 0.9, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <ringGeometry args={[0.2, 0.32, 8]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>

        {/* Entrance Steps and Door */}
        <mesh position={[0, 0.1, 2.4]} castShadow>
          <boxGeometry args={[1.6, 0.15, 0.6]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[0, 0.65, 2.12]}>
          <boxGeometry args={[1.1, 1.1, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
};
