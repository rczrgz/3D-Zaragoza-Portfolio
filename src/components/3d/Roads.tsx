import React from 'react';

interface StreetLightProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

const StreetLight: React.FC<StreetLightProps> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh castShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.2, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Pole */}
      <mesh castShadow position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 2.2, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Arm */}
      <mesh castShadow position={[0.25, 2.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.04, 0.05, 0.6, 6]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Lamp Head */}
      <mesh position={[0.45, 2.35, 0]}>
        <coneGeometry args={[0.16, 0.15, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Glowing Lamp Bulb */}
      <mesh position={[0.45, 2.28, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
      {/* Warm Point Light */}
      <pointLight position={[0.45, 2.2, 0]} color="#fef08a" intensity={0.4} distance={4} />
    </group>
  );
};

export const Roads: React.FC = () => {
  return (
    <group>
      {/* Center Plaza Circular Road / Paving */}
      <mesh receiveShadow position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.2, 6.2, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      <mesh receiveShadow position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.15, 5.25, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.5} />
      </mesh>

      {/* South-West Road to WordPress */}
      <mesh receiveShadow position={[-5.5, 0.01, 4.5]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[2.2, 0.02, 9]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* South-East Road to Shopify */}
      <mesh receiveShadow position={[5.5, 0.01, 4.5]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[2.2, 0.02, 9]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* West Road to Skills */}
      <mesh receiveShadow position={[-7.5, 0.01, 0]}>
        <boxGeometry args={[7, 0.02, 2.2]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* East Road to Contact */}
      <mesh receiveShadow position={[7.5, 0.01, 0]}>
        <boxGeometry args={[7, 0.02, 2.2]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* North Road to Experience Monument */}
      <mesh receiveShadow position={[0, 0.01, -7]}>
        <boxGeometry args={[2.4, 0.02, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* North-West Road to Projects District */}
      <mesh receiveShadow position={[-6.5, 0.01, -5.5]} rotation={[0, -Math.PI / 3.5, 0]}>
        <boxGeometry args={[2.2, 0.02, 8.5]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* North-East Road to Education */}
      <mesh receiveShadow position={[6.5, 0.01, -5.5]} rotation={[0, Math.PI / 3.5, 0]}>
        <boxGeometry args={[2.2, 0.02, 8.5]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* Pedestrian Crosswalks (White zebra stripes) */}
      {/* North crosswalk */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <mesh key={`cw-north-${i}`} position={[x, 0.025, -4.5]}>
          <boxGeometry args={[0.25, 0.01, 0.8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      ))}

      {/* West crosswalk */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((z, i) => (
        <mesh key={`cw-west-${i}`} position={[-4.5, 0.025, z]}>
          <boxGeometry args={[0.8, 0.01, 0.25]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      ))}

      {/* East crosswalk */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((z, i) => (
        <mesh key={`cw-east-${i}`} position={[4.5, 0.025, z]}>
          <boxGeometry args={[0.8, 0.01, 0.25]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      ))}

      {/* Street Lamps along the pathways */}
      <StreetLight position={[-4.8, 0, 3.2]} rotation={[0, Math.PI / 4, 0]} />
      <StreetLight position={[4.8, 0, 3.2]} rotation={[0, -Math.PI / 4, 0]} />
      <StreetLight position={[-6.2, 0, -1.4]} rotation={[0, 0, 0]} />
      <StreetLight position={[6.2, 0, -1.4]} rotation={[0, Math.PI, 0]} />
      <StreetLight position={[-1.5, 0, -6.5]} rotation={[0, Math.PI / 2, 0]} />
      <StreetLight position={[1.5, 0, -6.5]} rotation={[0, -Math.PI / 2, 0]} />
      <StreetLight position={[-9, 0, -6]} rotation={[0, Math.PI / 4, 0]} />
      <StreetLight position={[9, 0, -6]} rotation={[0, -Math.PI / 4, 0]} />
      <StreetLight position={[-8.5, 0, 6.5]} rotation={[0, -Math.PI / 4, 0]} />
      <StreetLight position={[8.5, 0, 6.5]} rotation={[0, Math.PI / 4, 0]} />
    </group>
  );
};
