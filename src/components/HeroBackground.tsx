import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.04;
      ref.current.rotation.x += dt * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c8a951" size={0.035} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });
  const items = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    pos: [
      Math.cos((i / 6) * Math.PI * 2) * 4,
      Math.sin((i / 6) * Math.PI * 2) * 2,
      -2 - i * 0.5,
    ] as [number, number, number],
    scale: 0.4 + Math.random() * 0.4,
  })), []);

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} scale={it.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#c8a951" wireframe metalness={0.7} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#c8a951" />
      <Particles />
      <FloatingShapes />
    </Canvas>
  );
}
