import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { DISTRICTS } from '../../data/districts';
import { DistrictId } from '../../types';

interface CameraControllerProps {
  selectedDistrict: DistrictId;
  onReset: () => void;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  selectedDistrict,
  onReset,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Transition state
  const isTransitioning = useRef(true);
  const targetCamPos = useRef(new THREE.Vector3(...DISTRICTS.home.cameraPosition));
  const targetLookAt = useRef(new THREE.Vector3(...DISTRICTS.home.targetPosition));

  // Update target and initiate smooth transition when selectedDistrict changes
  useEffect(() => {
    const district = DISTRICTS[selectedDistrict] || DISTRICTS.home;
    targetCamPos.current.set(...district.cameraPosition);
    targetLookAt.current.set(...district.targetPosition);
    isTransitioning.current = true;
  }, [selectedDistrict]);

  // OrbitControls interaction listener: cancel any programmatic animation if the user manually navigates
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleControlStart = () => {
      // User started orbiting or zooming manually: stop programmatic animation immediately
      isTransitioning.current = false;
    };

    controls.addEventListener('start', handleControlStart);
    return () => {
      controls.removeEventListener('start', handleControlStart);
    };
  }, []);

  // Keyboard shortcuts (Escape, R to reset overview; WASD to pan in aerial mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape' || e.key === 'r' || e.key === 'R') {
        onReset();
        return;
      }

      // Pan with WASD in Orbit mode
      const panStep = 1.2;
      const controls = controlsRef.current;
      if (!controls) return;

      let panX = 0;
      let panZ = 0;

      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') panZ -= panStep;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') panZ += panStep;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') panX -= panStep;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') panX += panStep;

      if (panX !== 0 || panZ !== 0) {
        isTransitioning.current = false;
        camera.position.x += panX;
        camera.position.z += panZ;
        controls.target.x += panX;
        controls.target.z += panZ;
        controls.update();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [camera, onReset]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (isTransitioning.current) {
      // Smooth lerp towards programmatic destination
      const factor = Math.min(delta * 4.5, 1);
      camera.position.lerp(targetCamPos.current, factor);
      controls.target.lerp(targetLookAt.current, factor);
      controls.update();

      const distCam = camera.position.distanceTo(targetCamPos.current);
      const distTarget = controls.target.distanceTo(targetLookAt.current);

      // Once arrived within small threshold, end transition so user has 100% free orbit & zoom!
      if (distCam < 0.05 && distTarget < 0.05) {
        camera.position.copy(targetCamPos.current);
        controls.target.copy(targetLookAt.current);
        controls.update();
        isTransitioning.current = false;
      }
    } else {
      // Normal continuous orbit controls dampening
      controls.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      enableZoom
      zoomSpeed={1.2}
      minDistance={1.2} // Unrestricted close-up zoom
      maxDistance={90} // Unrestricted wide zoom out
      maxPolarAngle={Math.PI / 2.05} // Down to street horizon
      minPolarAngle={Math.PI / 16} // High aerial bird's eye
    />
  );
};
