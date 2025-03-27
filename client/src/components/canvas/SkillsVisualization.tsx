import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Sample skills data
const skills = [
  { name: 'React', value: 90, color: '#00D8FF' },
  { name: 'JavaScript', value: 85, color: '#F7DF1E' },
  { name: 'Three.js', value: 80, color: '#FF0080' },
  { name: 'HTML/CSS', value: 95, color: '#7928CA' },
  { name: 'Node.js', value: 75, color: '#539E43' },
  { name: 'WebGL', value: 70, color: '#990000' },
  { name: 'TypeScript', value: 80, color: '#3178C6' },
  { name: 'Vue.js', value: 70, color: '#4FC08D' },
];

const SkillsVisualization = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  
  // Calculate positions for each skill node
  const skillNodes = useMemo(() => {
    return skills.map((skill, index) => {
      const theta = (index / skills.length) * Math.PI * 2;
      const radius = 3;
      
      const x = Math.sin(theta) * radius;
      const y = (Math.random() - 0.5) * 2;
      const z = Math.cos(theta) * radius;
      
      return {
        ...skill,
        position: [x, y, z] as [number, number, number],
        scale: skill.value / 100 + 0.5, // Scale based on skill level
      };
    });
  }, []);
  
  // Animation
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    const time = clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.1;
  });
  
  return (
    <group ref={groupRef}>
      {skillNodes.map((skill, index) => (
        <SkillNode 
          key={index}
          index={index}
          position={skill.position}
          name={skill.name}
          color={skill.color}
          scale={skill.scale}
          isHovered={hovered === index}
          onHover={() => setHovered(index)}
          onUnhover={() => setHovered(null)}
        />
      ))}
      
      {/* Connections between nodes */}
      {skillNodes.map((skill, index) => {
        const nextIndex = (index + 1) % skillNodes.length;
        return (
          <Connection
            key={`connection-${index}`}
            start={skill.position}
            end={skillNodes[nextIndex].position}
            color={skill.color}
          />
        );
      })}
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
    </group>
  );
};

// Skill node component
interface SkillNodeProps {
  position: [number, number, number];
  name: string;
  color: string;
  scale: number;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
}

const SkillNode = ({ position, name, color, scale, index, isHovered, onHover, onUnhover }: SkillNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime();
    meshRef.current.position.y += Math.sin(time * 0.5 + index) * 0.002;
    
    if (isHovered) {
      meshRef.current.scale.set(scale * 1.2, scale * 1.2, scale * 1.2);
    } else {
      meshRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={onHover}
        onPointerOut={onUnhover}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
          roughness={0.1}
          metalness={0.8} 
        />
      </mesh>
      
      {isHovered && (
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      )}
    </group>
  );
};

// Connection component
interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

const Connection = ({ start, end, color }: ConnectionProps) => {
  const points = [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ];
  
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  
  return (
    <primitive object={new THREE.Line(
      lineGeometry,
      new THREE.LineBasicMaterial({ color, opacity: 0.2, transparent: true })
    )} />
  );
};

export default SkillsVisualization;
