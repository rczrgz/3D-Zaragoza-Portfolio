import React, { useMemo } from 'react';

interface PineTreeProps {
  position: [number, number, number];
  scale?: number;
}

export const PineTree: React.FC<PineTreeProps> = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.8, 6]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      {/* Bottom Cone */}
      <mesh castShadow position={[0, 1.0, 0]}>
        <coneGeometry args={[0.9, 1.1, 7]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
      {/* Middle Cone */}
      <mesh castShadow position={[0, 1.6, 0]}>
        <coneGeometry args={[0.7, 0.9, 7]} />
        <meshStandardMaterial color="#16a34a" roughness={0.8} />
      </mesh>
      {/* Top Cone */}
      <mesh castShadow position={[0, 2.1, 0]}>
        <coneGeometry args={[0.48, 0.8, 7]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>
    </group>
  );
};

interface RoundTreeProps {
  position: [number, number, number];
  scale?: number;
}

export const RoundTree: React.FC<RoundTreeProps> = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.14, 0.2, 1.0, 6]} />
        <meshStandardMaterial color="#5c381c" roughness={0.9} />
      </mesh>
      {/* Main Foliage */}
      <mesh castShadow position={[0, 1.6, 0]}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#4ade80" roughness={0.8} />
      </mesh>
      {/* Upper Cluster */}
      <mesh castShadow position={[0.2, 2.1, 0.1]}>
        <dodecahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color="#86efac" roughness={0.8} />
      </mesh>
    </group>
  );
};

interface RockProps {
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

export const Rock: React.FC<RockProps> = ({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  return (
    <mesh castShadow position={position} scale={scale} rotation={rotation}>
      <dodecahedronGeometry args={[0.45, 0]} />
      <meshStandardMaterial color="#64748b" roughness={0.9} metalness={0.1} />
    </mesh>
  );
};

interface BenchProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const Bench: React.FC<BenchProps> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Wooden seat slats */}
      <mesh castShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[1.1, 0.08, 0.35]} />
        <meshStandardMaterial color="#92400e" roughness={0.7} />
      </mesh>
      {/* Backrest */}
      <mesh castShadow position={[0, 0.5, -0.15]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[1.1, 0.3, 0.06]} />
        <meshStandardMaterial color="#92400e" roughness={0.7} />
      </mesh>
      {/* Iron legs */}
      <mesh position={[-0.45, 0.15, 0]} castShadow>
        <boxGeometry args={[0.06, 0.3, 0.35]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.45, 0.15, 0]} castShadow>
        <boxGeometry args={[0.06, 0.3, 0.35]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

export const TreesAndNature: React.FC = () => {
  // Memoized positions for trees, rocks, and benches around the city
  const pineTrees = useMemo<Array<{ pos: [number, number, number]; scale: number }>>(() => [
    { pos: [-3.5, 0, -5], scale: 1.1 },
    { pos: [-2, 0, -8.5], scale: 1.2 },
    { pos: [2.5, 0, -8.5], scale: 1.05 },
    { pos: [-16, 0, -2], scale: 1.25 },
    { pos: [-18, 0, 3], scale: 1.1 },
    { pos: [-17, 0, 9], scale: 1.3 },
    { pos: [-6, 0, 11], scale: 1.15 },
    { pos: [6, 0, 11], scale: 1.1 },
    { pos: [16, 0, 6], scale: 1.2 },
    { pos: [18, 0, -3], scale: 1.3 },
    { pos: [17, 0, -13], scale: 1.15 },
    { pos: [-18, 0, -14], scale: 1.35 },
    { pos: [-5, 0, -17], scale: 1.2 },
    { pos: [5, 0, -17], scale: 1.25 },
  ], []);

  const roundTrees = useMemo<Array<{ pos: [number, number, number]; scale: number }>>(() => [
    { pos: [3.8, 0, -3], scale: 1.0 },
    { pos: [-4.2, 0, 2], scale: 1.1 },
    { pos: [4.2, 0, 2], scale: 1.0 },
    { pos: [-8, 0, 12], scale: 1.2 },
    { pos: [8, 0, 12], scale: 1.2 },
    { pos: [-15, 0, 14], scale: 1.3 },
    { pos: [15, 0, 14], scale: 1.25 },
    { pos: [-18, 0, -7], scale: 1.15 },
    { pos: [18, 0, -8], scale: 1.2 },
    { pos: [-9, 0, -15], scale: 1.1 },
    { pos: [9, 0, -15], scale: 1.15 },
    { pos: [0, 0, -18], scale: 1.3 },
  ], []);

  const rocks = useMemo<Array<{ pos: [number, number, number]; scale: [number, number, number]; rot: [number, number, number] }>>(() => [
    { pos: [5.2, 0.1, -1.8], scale: [1.1, 0.8, 1.2], rot: [0.2, 0.4, 0] },
    { pos: [3.2, 0.1, 3.8], scale: [0.8, 0.6, 0.9], rot: [0, 0.6, 0.1] },
    { pos: [-2.5, 0.1, 5.5], scale: [1.3, 0.9, 1.1], rot: [0.3, 0.1, 0.2] },
    { pos: [8.5, 0.1, -9.2], scale: [1.4, 1.0, 1.2], rot: [0.1, 0.5, 0] },
    { pos: [-7.8, 0.1, -3.2], scale: [0.9, 0.7, 0.8], rot: [0.4, 0.2, 0] },
    { pos: [15, 0.1, 10], scale: [1.5, 1.2, 1.3], rot: [0, 0.8, 0.2] },
    { pos: [-15, 0.1, -12], scale: [1.6, 1.1, 1.4], rot: [0.2, 0.3, 0] },
  ], []);

  return (
    <group>
      {/* Pine Trees */}
      {pineTrees.map((tree, idx) => (
        <PineTree key={`pine-${idx}`} position={tree.pos} scale={tree.scale} />
      ))}

      {/* Round Foliage Trees */}
      {roundTrees.map((tree, idx) => (
        <RoundTree key={`round-${idx}`} position={tree.pos} scale={tree.scale} />
      ))}

      {/* Decorative Boulders / Rocks */}
      {rocks.map((rock, idx) => (
        <Rock key={`rock-${idx}`} position={rock.pos} scale={rock.scale} rotation={rock.rot} />
      ))}

      {/* Park Benches along the Central Walkway */}
      <Bench position={[-2.8, 0, 1.8]} rotation={[0, Math.PI / 3, 0]} />
      <Bench position={[2.8, 0, 1.8]} rotation={[0, -Math.PI / 3, 0]} />
      <Bench position={[0, 0, -3.4]} rotation={[0, 0, 0]} />

      {/* Low-Poly Flower Tufts (colorful small dodecahedrons) */}
      {[
        { pos: [-1.8, 0.05, 3.2], col: '#f43f5e' },
        { pos: [-1.5, 0.05, 3.5], col: '#fbbf24' },
        { pos: [1.8, 0.05, 3.2], col: '#38bdf8' },
        { pos: [1.5, 0.05, 3.5], col: '#ec4899' },
        { pos: [-4.2, 0.05, -2.8], col: '#a855f7' },
        { pos: [4.2, 0.05, -2.8], col: '#fbbf24' },
      ].map((flower, i) => (
        <mesh key={`flower-${i}`} position={flower.pos as [number, number, number]}>
          <dodecahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color={flower.col} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};
