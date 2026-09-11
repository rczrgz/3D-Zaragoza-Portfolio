import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FloatingMarker } from './FloatingMarker';

interface ShopifyBuildingProps {
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
}

export const ShopifyBuilding: React.FC<ShopifyBuildingProps> = ({
  position,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const bagFloatRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetScale = hovered || isSelected ? 1.06 : 1.0;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 8
      );
    }
    if (bagFloatRef.current) {
      bagFloatRef.current.position.y = 4.2 + Math.sin(state.clock.elapsedTime * 2) * 0.12;
      bagFloatRef.current.rotation.y += delta * 0.7;
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
        position={[0, 5.4, 0]}
        title="SHOPIFY"
        subtitle="E-Commerce & Liquid"
        color="#059669"
        districtId="shopify"
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
        {/* Base Platform */}
        <mesh receiveShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[4.6, 0.3, 4.4]} />
          <meshStandardMaterial color={hovered ? '#d1fae5' : '#f8fafc'} roughness={0.6} />
        </mesh>

        {/* Main Storefront Body */}
        <mesh castShadow receiveShadow position={[0, 1.4, 0]}>
          <boxGeometry args={[4.0, 2.3, 3.8]} />
          <meshStandardMaterial
            color={hovered ? '#059669' : '#047857'}
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>

        {/* Second Level Glass Office / Studio */}
        <mesh castShadow receiveShadow position={[0, 2.9, 0]}>
          <boxGeometry args={[3.4, 1.3, 3.2]} />
          <meshStandardMaterial
            color={hovered ? '#10b981' : '#059669'}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>

        {/* Storefront Striped Canopy Awning */}
        <group position={[0, 2.0, 2.15]} rotation={[Math.PI / 8, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[3.6, 0.1, 1.2]} />
            <meshStandardMaterial color="#10b981" roughness={0.5} />
          </mesh>
          {/* Canopy stripes */}
          {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
            <mesh key={`canopy-stripe-${i}`} position={[x, 0.055, 0]}>
              <boxGeometry args={[0.35, 0.02, 1.2]} />
              <meshStandardMaterial color="#ffffff" roughness={0.5} />
            </mesh>
          ))}
        </group>

        {/* Glass Display Windows on Storefront */}
        <mesh position={[-1.1, 1.0, 1.92]}>
          <boxGeometry args={[1.3, 1.2, 0.05]} />
          <meshBasicMaterial color={hovered ? '#a7f3d0' : '#6ee7b7'} />
        </mesh>
        <mesh position={[1.1, 1.0, 1.92]}>
          <boxGeometry args={[1.3, 1.2, 0.05]} />
          <meshBasicMaterial color={hovered ? '#a7f3d0' : '#6ee7b7'} />
        </mesh>

        {/* Boutique Doorway */}
        <mesh position={[0, 0.8, 1.92]}>
          <boxGeometry args={[0.8, 1.4, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>

        {/* Floating 3D Shopify Shopping Bag on Roof */}
        <group ref={bagFloatRef}>
          {/* Bag Body */}
          <mesh castShadow>
            <boxGeometry args={[0.9, 1.0, 0.6]} />
            <meshStandardMaterial
              color="#10b981"
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
          {/* Bag Handles */}
          <mesh position={[0, 0.6, 0]}>
            <torusGeometry args={[0.25, 0.04, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* White 'S' letter emblem on the bag */}
          <mesh position={[0, 0, 0.31]}>
            <circleGeometry args={[0.22, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Decorative e-commerce delivery parcels / boxes outside */}
        <group position={[2.1, 0.3, 1.2]} rotation={[0, 0.2, 0]}>
          <mesh castShadow position={[0, 0, 0]}>
            <boxGeometry args={[0.5, 0.4, 0.5]} />
            <meshStandardMaterial color="#d97706" roughness={0.8} />
          </mesh>
          <mesh castShadow position={[0.1, 0.35, 0.05]} rotation={[0, 0.4, 0]}>
            <boxGeometry args={[0.35, 0.3, 0.35]} />
            <meshStandardMaterial color="#b45309" roughness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
