import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DISTRICTS } from '../../data/districts';
import { DistrictId } from '../../types';
import { soundManager } from '../../utils/sound';

interface WalkControllerProps {
  onNearbyDistrictChange: (districtId: DistrictId | null) => void;
  onInteractDistrict: (districtId: DistrictId) => void;
}

export const WalkController: React.FC<WalkControllerProps> = ({
  onNearbyDistrictChange,
  onInteractDistrict,
}) => {
  const { camera, gl } = useThree();

  // Player position & physics
  const playerPos = useRef(new THREE.Vector3(0, 1.6, 6));
  const velocityY = useRef(0);
  const isGrounded = useRef(true);

  // Vision angles (Yaw and Pitch)
  const yaw = useRef(0); // Horizontal rotation in radians
  const pitch = useRef(0); // Vertical rotation in radians

  // Active inputs
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    jump: false,
  });

  const isMouseDown = useRef(false);
  const isPointerLocked = useRef(false);
  const nearbyRef = useRef<DistrictId | null>(null);

  // Setup initial camera rotation and position
  useEffect(() => {
    camera.position.copy(playerPos.current);
    yaw.current = 0;
    pitch.current = 0;
  }, [camera]);

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture inputs if typing in an input field
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.sprint = true;
          break;
        case 'Space':
          if (isGrounded.current) {
            velocityY.current = 6.5; // Jump velocity
            isGrounded.current = false;
            soundManager.playHover();
          }
          break;
        case 'KeyE':
          if (nearbyRef.current) {
            soundManager.playSelect();
            onInteractDistrict(nearbyRef.current);
          }
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.sprint = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onInteractDistrict]);

  // Mouse / Pointer Lock vision control
  useEffect(() => {
    const domElement = gl.domElement;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isMouseDown.current = true;
        // Request pointer lock for true immersive FPS game controls
        if (domElement.requestPointerLock && document.pointerLockElement !== domElement) {
          domElement.requestPointerLock();
        }
      }
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const isLocked = document.pointerLockElement === domElement;
      // Allow mouse look if pointer locked OR if dragging with mouse
      if (isLocked || isMouseDown.current) {
        const sensitivity = 0.0024;
        yaw.current -= e.movementX * sensitivity;
        pitch.current -= e.movementY * sensitivity;

        // Clamp vertical look between -85 deg and +85 deg
        const maxPitch = (85 * Math.PI) / 180;
        pitch.current = Math.max(-maxPitch, Math.min(maxPitch, pitch.current));
      }
    };

    const handlePointerLockChange = () => {
      isPointerLocked.current = document.pointerLockElement === domElement;
    };

    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      if (document.pointerLockElement === domElement) {
        document.exitPointerLock();
      }
    };
  }, [gl]);

  // Frame-by-frame physics, walking movement and proximity check
  useFrame((state, delta) => {
    // Limit delta to prevent jumping through objects on tab switch
    const dt = Math.min(delta, 0.05);

    // Calculate forward and right vectors based on yaw (ignoring pitch for ground walking)
    const forward = new THREE.Vector3(-Math.sin(yaw.current), 0, -Math.cos(yaw.current));
    const right = new THREE.Vector3(Math.cos(yaw.current), 0, -Math.sin(yaw.current));

    const moveDirection = new THREE.Vector3(0, 0, 0);

    if (keys.current.forward) moveDirection.add(forward);
    if (keys.current.backward) moveDirection.sub(forward);
    if (keys.current.left) moveDirection.sub(right);
    if (keys.current.right) moveDirection.add(right);

    const isMoving = moveDirection.lengthSq() > 0;
    if (isMoving) {
      moveDirection.normalize();
      const speed = keys.current.sprint ? 11.5 : 6.0;
      playerPos.current.addScaledVector(moveDirection, speed * dt);
    }

    // Gravity & Jump Physics
    const gravity = -18;
    const groundLevel = 1.6;

    if (!isGrounded.current) {
      velocityY.current += gravity * dt;
      playerPos.current.y += velocityY.current * dt;

      if (playerPos.current.y <= groundLevel) {
        playerPos.current.y = groundLevel;
        velocityY.current = 0;
        isGrounded.current = true;
      }
    } else {
      playerPos.current.y = groundLevel;
    }

    // Head bobbing when walking on the ground
    let headBob = 0;
    if (isMoving && isGrounded.current) {
      const bobFreq = keys.current.sprint ? 14 : 10;
      const bobAmp = keys.current.sprint ? 0.06 : 0.035;
      headBob = Math.sin(state.clock.elapsedTime * bobFreq) * bobAmp;
    }

    // Keep player within the boundaries of the low-poly miniature island
    playerPos.current.x = Math.max(-20, Math.min(20, playerPos.current.x));
    playerPos.current.z = Math.max(-18, Math.min(18, playerPos.current.z));

    // Update Camera Position
    camera.position.set(
      playerPos.current.x,
      playerPos.current.y + headBob,
      playerPos.current.z
    );

    // Apply Camera Rotation using Euler angles (pitch for X, yaw for Y, order YXZ)
    const euler = new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ');
    camera.quaternion.setFromEuler(euler);

    // Proximity Detection to Districts
    let closestDist = Infinity;
    let closestId: DistrictId | null = null;

    const districts = Object.values(DISTRICTS);
    for (const dist of districts) {
      const dx = playerPos.current.x - dist.position[0];
      const dz = playerPos.current.z - dist.position[2];
      const distance = Math.sqrt(dx * dx + dz * dz);
      if (distance < 5.2 && distance < closestDist) {
        closestDist = distance;
        closestId = dist.id;
      }
    }

    if (closestId !== nearbyRef.current) {
      nearbyRef.current = closestId;
      onNearbyDistrictChange(closestId);
    }
  });

  return null;
};
