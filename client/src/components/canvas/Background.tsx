import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/hooks/useTheme';

const particleCount = 1000;

const Background = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const { size, mouse } = useThree();
  
  // Generate particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);
  
  // Generate colors
  const colors = useMemo(() => {
    const purpleColor = new THREE.Color('#7928CA');
    const pinkColor = new THREE.Color('#FF0080');
    const blueColor = new THREE.Color('#00D8FF');
    
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const colorChoice = Math.random();
      let color;
      
      if (colorChoice < 0.33) {
        color = purpleColor;
      } else if (colorChoice < 0.66) {
        color = pinkColor;
      } else {
        color = blueColor;
      }
      
      temp.push(color.r, color.g, color.b);
    }
    return new Float32Array(temp);
  }, []);

  // Animation
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    pointsRef.current.rotation.x = Math.sin(time / 10) * 0.1;
    pointsRef.current.rotation.y = Math.sin(time / 10) * 0.1;
    
    // Mouse interaction
    const x = (mouse.x * size.width) / 2;
    const y = (mouse.y * size.height) / 2;
    pointsRef.current.rotation.x += (y * 0.0001 - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (x * 0.0001 - pointsRef.current.rotation.y) * 0.05;
  });

  return (
    <>
      <color attach="background" args={[theme === 'dark' ? '#121212' : '#F8F9FA']} />
      
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
    </>
  );
};

export default Background;
