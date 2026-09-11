import React from 'react';
import { Html } from '@react-three/drei';
import { Sparkles, ArrowRight } from 'lucide-react';
import { DistrictId } from '../../types';

interface FloatingMarkerProps {
  position: [number, number, number];
  title: string;
  subtitle?: string;
  color: string;
  districtId: DistrictId;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}

export const FloatingMarker: React.FC<FloatingMarkerProps> = ({
  position,
  title,
  subtitle,
  color,
  isSelected,
  isHovered,
  onClick,
  onPointerOver,
  onPointerOut,
}) => {
  return (
    <group position={position}>
      {/* 3D Animated hovering diamond marker */}
      <mesh position={[0, 0.4, 0]} rotation={[0, isHovered ? Math.PI / 4 : 0, 0]}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered || isSelected ? 0.8 : 0.25}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Pulsing ring underneath diamond */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.38, 0.48, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHovered || isSelected ? 0.8 : 0.35}
        />
      </mesh>

      {/* HTML Tag Label */}
      <Html
        position={[0, 1.1, 0]}
        center
        distanceFactor={22}
        zIndexRange={[5, 0]}
        style={{ pointerEvents: 'auto' }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onMouseEnter={onPointerOver}
          onMouseLeave={onPointerOut}
          className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg backdrop-blur-md transition-all duration-300 transform cursor-pointer border ${
            isSelected
              ? 'scale-110 shadow-xl ring-2 ring-white/90 text-white'
              : isHovered
              ? 'scale-105 shadow-md text-white'
              : 'scale-95 bg-slate-900/80 hover:bg-slate-900 text-slate-100 border-white/20'
          }`}
          style={{
            backgroundColor: isSelected || isHovered ? color : undefined,
            borderColor: isSelected || isHovered ? '#ffffff' : undefined,
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-ping inline-block"
            style={{ backgroundColor: isSelected || isHovered ? '#ffffff' : color }}
          />
          <span className="font-bold tracking-wider uppercase text-[11px]">{title}</span>
          {subtitle && (
            <span className="hidden md:inline text-[10px] opacity-80 font-normal">
              • {subtitle}
            </span>
          )}
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 opacity-80" />
        </button>
      </Html>
    </group>
  );
};
