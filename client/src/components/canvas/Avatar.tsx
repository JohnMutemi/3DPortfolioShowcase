import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarProps {
  position?: [number, number, number];
}

// In a real implementation, this would load an actual 3D avatar model
// For now, we'll create a simple 3D placeholder
const Avatar = ({ position = [0, 0, 0] }: AvatarProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.1;
    meshRef.current.rotation.y = t * 0.2;
  });
  
  return (
    <group position={position}>
      {/* Avatar sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#7928CA" roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Orbital elements */}
      <OrbitalElement position={[0, 0, 0]} color="#7928CA" size={0.2} delay={0} />
      <OrbitalElement position={[0, 0, 0]} color="#FF0080" size={0.15} delay={0.5} />
      <OrbitalElement position={[0, 0, 0]} color="#00D8FF" size={0.12} delay={1} />
      
      {/* Ambient light */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
    </group>
  );
};

// Orbital element component
interface OrbitalElementProps {
  position: [number, number, number];
  color: string;
  size: number;
  delay: number;
}

const OrbitalElement = ({ position, color, size, delay }: OrbitalElementProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const t = clock.getElapsedTime() + delay;
    meshRef.current.position.x = Math.sin(t) * 1.5;
    meshRef.current.position.z = Math.cos(t) * 1.5;
    meshRef.current.position.y = Math.sin(t * 2) * 0.5;
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.5} 
        roughness={0.1}
        metalness={0.8} 
      />
    </mesh>
  );
};

export default Avatar;
