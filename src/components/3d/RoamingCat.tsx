import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { soundManager } from '../../utils/sound';

interface RoamingCatProps {
  onSelectCat: () => void;
}

export const RoamingCat: React.FC<RoamingCatProps> = ({ onSelectCat }) => {
  const catGroupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const frontLeftLegRef = useRef<THREE.Mesh>(null);
  const frontRightLegRef = useRef<THREE.Mesh>(null);
  const backLeftLegRef = useRef<THREE.Mesh>(null);
  const backRightLegRef = useRef<THREE.Mesh>(null);

  const [isHovered, setIsHovered] = useState(false);
  const lastMeowTimeRef = useRef<number>(0);

  // Path parameters for smooth, organic wandering around the central plaza
  useFrame((state) => {
    if (!catGroupRef.current) return;

    const time = state.clock.elapsedTime * 0.4; // movement speed
    
    // Check if cat is in a brief "pause and look around" resting phase (every ~18s)
    const cycle = (state.clock.elapsedTime * 0.5) % 18;
    const isPausing = cycle > 14 && cycle < 17;

    // Organic path around the central cobblestone plaza / fountain perimeter (radius ~2.8 - 3.8)
    const t = isPausing ? Math.floor(time * 4) / 4 : time;
    const posX = Math.sin(t) * 3.3 + Math.sin(t * 2.3) * 0.7;
    const posZ = Math.cos(t * 0.9) * 2.9 + Math.cos(t * 1.8) * 0.6;
    const posY = 0.12;

    // Calculate tangent direction for smooth heading rotation
    const dt = 0.05;
    const nextX = Math.sin(t + dt) * 3.3 + Math.sin((t + dt) * 2.3) * 0.7;
    const nextZ = Math.cos((t + dt) * 0.9) * 2.9 + Math.cos((t + dt) * 1.8) * 0.6;
    const targetAngle = Math.atan2(nextX - posX, nextZ - posZ);

    if (!isPausing) {
      catGroupRef.current.position.x = posX;
      catGroupRef.current.position.z = posZ;
      // Gentle walk bobbing
      const walkBob = Math.abs(Math.sin(state.clock.elapsedTime * 7)) * 0.035;
      catGroupRef.current.position.y = posY + walkBob;

      // Smooth rotation toward motion vector
      catGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        catGroupRef.current.rotation.y,
        targetAngle,
        0.1
      );

      // Leg swings
      const legSwing = Math.sin(state.clock.elapsedTime * 7) * 0.45;
      if (frontLeftLegRef.current) frontLeftLegRef.current.rotation.x = legSwing;
      if (frontRightLegRef.current) frontRightLegRef.current.rotation.x = -legSwing;
      if (backLeftLegRef.current) backLeftLegRef.current.rotation.x = -legSwing;
      if (backRightLegRef.current) backRightLegRef.current.rotation.x = legSwing;
    } else {
      // Resting / sitting: reset legs, tilt head slightly
      if (frontLeftLegRef.current) frontLeftLegRef.current.rotation.x = 0;
      if (frontRightLegRef.current) frontRightLegRef.current.rotation.x = 0;
      if (backLeftLegRef.current) backLeftLegRef.current.rotation.x = 0;
      if (backRightLegRef.current) backRightLegRef.current.rotation.x = 0;
      catGroupRef.current.position.y = posY;
    }

    // Tail waving (British Shorthair plush tail sway)
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.35 + 0.1;
      tailRef.current.rotation.x = 0.4 + Math.cos(state.clock.elapsedTime * 2) * 0.15;
    }

    // Head curious tilt
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      headRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    soundManager.playMeow();
    onSelectCat();
  };

  const coatColor = isHovered ? '#718096' : '#64748b'; // Classic British Shorthair blue-grey
  const secondaryCoat = '#475569';
  const innerEarColor = '#fda4af'; // soft pink
  const eyeColor = '#f59e0b'; // signature British Shorthair warm copper/amber eyes
  const noseColor = '#fb7185'; // soft pink nose

  return (
    <group
      ref={catGroupRef}
      position={[0, 0.12, 2.8]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        setIsHovered(true);
        const now = Date.now();
        if (now - lastMeowTimeRef.current > 600) {
          soundManager.playMeow();
          lastMeowTimeRef.current = now;
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setIsHovered(false);
      }}
    >
      {/* Floating Name Tag: Shows his name only when hovered */}
      {isHovered && (
        <Html
          position={[0, 0.65, 0]}
          center
          distanceFactor={18}
          zIndexRange={[50, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div className="px-3 py-1 rounded-full bg-slate-900/90 text-white font-bold text-xs shadow-xl border border-amber-400/70 backdrop-blur-md whitespace-nowrap tracking-wide select-none text-center">
            Asher
          </div>
        </Html>
      )}

      {/* Invisible generous click-detection target so clicking Asher while moving is effortless */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.55, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Soft Ground Shadow Ellipse */}
      <mesh position={[0, -0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.34, 16]} />
        <meshBasicMaterial
          color="#0f172a"
          transparent
          opacity={isHovered ? 0.6 : 0.35}
        />
      </mesh>

      {/* 1. Body: Plump, sturdy British Shorthair Torso */}
      <mesh castShadow position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.16, 0.28, 8, 16]} />
        <meshStandardMaterial
          color={coatColor}
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>

      {/* Chest Fluff Accent */}
      <mesh position={[0, 0.22, 0.16]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.8}
        />
      </mesh>

      {/* 2. Head Group: Round chubby British Shorthair head */}
      <group ref={headRef} position={[0, 0.34, 0.22]}>
        {/* Main Round Skull */}
        <mesh castShadow position={[0, 0, 0]}>
          <sphereGeometry args={[0.17, 18, 18]} />
          <meshStandardMaterial
            color={coatColor}
            roughness={0.6}
            metalness={0.05}
          />
        </mesh>

        {/* Signature British Shorthair Chubby Cheeks */}
        <mesh position={[-0.09, -0.04, 0.08]}>
          <sphereGeometry args={[0.075, 12, 12]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        </mesh>
        <mesh position={[0.09, -0.04, 0.08]}>
          <sphereGeometry args={[0.075, 12, 12]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        </mesh>

        {/* Soft Muzzle / Chin */}
        <mesh position={[0, -0.05, 0.11]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
        </mesh>

        {/* Tiny Pink Nose */}
        <mesh position={[0, -0.025, 0.17]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color={noseColor} roughness={0.4} />
        </mesh>

        {/* British Shorthair Signature Copper/Amber Eyes */}
        {/* Left Eye */}
        <group position={[-0.07, 0.03, 0.14]} rotation={[0, -0.2, 0]}>
          <mesh>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={0.3}
              roughness={0.1}
            />
          </mesh>
          {/* Pupil */}
          <mesh position={[0, 0, 0.028]} scale={[0.3, 1, 0.2]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>

        {/* Right Eye */}
        <group position={[0.07, 0.03, 0.14]} rotation={[0, 0.2, 0]}>
          <mesh>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={0.3}
              roughness={0.1}
            />
          </mesh>
          {/* Pupil */}
          <mesh position={[0, 0, 0.028]} scale={[0.3, 1, 0.2]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>

        {/* Ears with rounded tips and pink inner lining */}
        {/* Left Ear */}
        <group position={[-0.1, 0.14, -0.02]} rotation={[0.2, -0.2, -0.3]}>
          <mesh castShadow>
            <coneGeometry args={[0.065, 0.11, 4]} />
            <meshStandardMaterial color={coatColor} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.01, 0.02]} rotation={[-0.1, 0, 0]}>
            <coneGeometry args={[0.045, 0.08, 3]} />
            <meshStandardMaterial color={innerEarColor} roughness={0.5} />
          </mesh>
        </group>

        {/* Right Ear */}
        <group position={[0.1, 0.14, -0.02]} rotation={[0.2, 0.2, 0.3]}>
          <mesh castShadow>
            <coneGeometry args={[0.065, 0.11, 4]} />
            <meshStandardMaterial color={coatColor} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.01, 0.02]} rotation={[-0.1, 0, 0]}>
            <coneGeometry args={[0.045, 0.08, 3]} />
            <meshStandardMaterial color={innerEarColor} roughness={0.5} />
          </mesh>
        </group>

        {/* Collar & Golden Bell */}
        <mesh position={[0, -0.12, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.14, 0.022, 8, 16]} />
          <meshStandardMaterial color="#059669" roughness={0.3} />
        </mesh>
        {/* Shiny Bell */}
        <mesh position={[0, -0.15, 0.11]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.2}
            emissive="#ca8a04"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* 3. Four Cute Walking Legs with rounded paws */}
      {/* Front Left Leg */}
      <mesh
        ref={frontLeftLegRef}
        castShadow
        position={[-0.09, 0.1, 0.14]}
      >
        <cylinderGeometry args={[0.04, 0.045, 0.18, 10]} />
        <meshStandardMaterial color={secondaryCoat} roughness={0.7} />
        {/* Paw */}
        <mesh position={[0, -0.08, 0.02]}>
          <sphereGeometry args={[0.048, 8, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.6} />
        </mesh>
      </mesh>

      {/* Front Right Leg */}
      <mesh
        ref={frontRightLegRef}
        castShadow
        position={[0.09, 0.1, 0.14]}
      >
        <cylinderGeometry args={[0.04, 0.045, 0.18, 10]} />
        <meshStandardMaterial color={secondaryCoat} roughness={0.7} />
        {/* Paw */}
        <mesh position={[0, -0.08, 0.02]}>
          <sphereGeometry args={[0.048, 8, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.6} />
        </mesh>
      </mesh>

      {/* Back Left Leg */}
      <mesh
        ref={backLeftLegRef}
        castShadow
        position={[-0.09, 0.1, -0.14]}
      >
        <cylinderGeometry args={[0.045, 0.045, 0.18, 10]} />
        <meshStandardMaterial color={secondaryCoat} roughness={0.7} />
        {/* Paw */}
        <mesh position={[0, -0.08, 0.02]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.6} />
        </mesh>
      </mesh>

      {/* Back Right Leg */}
      <mesh
        ref={backRightLegRef}
        castShadow
        position={[0.09, 0.1, -0.14]}
      >
        <cylinderGeometry args={[0.045, 0.045, 0.18, 10]} />
        <meshStandardMaterial color={secondaryCoat} roughness={0.7} />
        {/* Paw */}
        <mesh position={[0, -0.08, 0.02]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.6} />
        </mesh>
      </mesh>

      {/* 4. Plush British Shorthair Tail (curled up & swaying) */}
      <group ref={tailRef} position={[0, 0.24, -0.2]}>
        <mesh castShadow position={[0, 0.12, -0.06]} rotation={[0.6, 0, 0]}>
          <cylinderGeometry args={[0.038, 0.048, 0.26, 10]} />
          <meshStandardMaterial color={coatColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.24, -0.14]} rotation={[1.1, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.038, 0.16, 10]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.3, -0.2]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
};
