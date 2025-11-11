import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, Sky } from '@react-three/drei';
import * as THREE from 'three';
import './Game.css';

function Player({ position, onMove }) {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const moveState = useRef({ forward: false, backward: false, left: false, right: false });

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = true;
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = false;
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    const speed = 10;
    
    direction.current.set(0, 0, 0);

    if (moveState.current.forward) direction.current.z -= 1;
    if (moveState.current.backward) direction.current.z += 1;
    if (moveState.current.left) direction.current.x -= 1;
    if (moveState.current.right) direction.current.x += 1;

    direction.current.normalize();
    direction.current.applyQuaternion(camera.quaternion);
    direction.current.y = 0;

    velocity.current.x = direction.current.x * speed * delta;
    velocity.current.z = direction.current.z * speed * delta;

    camera.position.x += velocity.current.x;
    camera.position.z += velocity.current.z;

    // Keep camera at rat eye level
    camera.position.y = 0.5;

    // Boundaries
    camera.position.x = Math.max(-20, Math.min(20, camera.position.x));
    camera.position.z = Math.max(-20, Math.min(20, camera.position.z));

    onMove(camera.position);
  });

  return null;
}

function Cheese({ position, onCollect }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.5} />
    </mesh>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#8B7355" />
    </mesh>
  );
}

function Walls() {
  const wallHeight = 3;
  const wallThickness = 0.5;
  const arenaSize = 40;

  return (
    <group>
      {/* North wall */}
      <mesh position={[0, wallHeight / 2, -arenaSize / 2]}>
        <boxGeometry args={[arenaSize, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {/* South wall */}
      <mesh position={[0, wallHeight / 2, arenaSize / 2]}>
        <boxGeometry args={[arenaSize, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {/* East wall */}
      <mesh position={[arenaSize / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, arenaSize]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {/* West wall */}
      <mesh position={[-arenaSize / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, arenaSize]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  );
}

function Game({ playerName, onGameOver }) {
  const [score, setScore] = useState(0);
  const [cheeses, setCheeses] = useState([]);
  const [playerPos, setPlayerPos] = useState(new THREE.Vector3(0, 0.5, 0));
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Generate initial cheeses
    const initialCheeses = [];
    for (let i = 0; i < 10; i++) {
      initialCheeses.push({
        id: i,
        position: [
          Math.random() * 30 - 15,
          0.5,
          Math.random() * 30 - 15
        ]
      });
    }
    setCheeses(initialCheeses);
  }, []);

  useEffect(() => {
    if (!isLocked) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onGameOver(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked, score, onGameOver]);

  const handlePlayerMove = (position) => {
    setPlayerPos(position);

    // Check collision with cheeses
    cheeses.forEach((cheese) => {
      const distance = Math.sqrt(
        Math.pow(position.x - cheese.position[0], 2) +
        Math.pow(position.z - cheese.position[2], 2)
      );

      if (distance < 1) {
        setScore((prev) => prev + 10);
        setCheeses((prev) => prev.filter((c) => c.id !== cheese.id));

        // Add new cheese
        const newCheese = {
          id: Date.now(),
          position: [
            Math.random() * 30 - 15,
            0.5,
            Math.random() * 30 - 15
          ]
        };
        setCheeses((prev) => [...prev, newCheese]);
      }
    });
  };

  return (
    <div className="game-container">
      <div className="hud">
        <div className="hud-item">
          <span className="hud-label">Player:</span>
          <span className="hud-value">{playerName}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">Score:</span>
          <span className="hud-value">{score}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">Time:</span>
          <span className="hud-value">{timeLeft}s</span>
        </div>
      </div>

      {!isLocked && (
        <div className="click-to-start">
          <p>Click to start playing!</p>
          <p className="controls-hint">Use WASD or Arrow Keys to move</p>
        </div>
      )}

      <Canvas shadows camera={{ fov: 75, position: [0, 0.5, 0] }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <Ground />
        <Walls />
        
        {cheeses.map((cheese) => (
          <Cheese
            key={cheese.id}
            position={cheese.position}
            onCollect={() => {}}
          />
        ))}

        <Player position={[0, 0.5, 0]} onMove={handlePlayerMove} />
        
        <PointerLockControls
          onLock={() => setIsLocked(true)}
          onUnlock={() => setIsLocked(false)}
        />
      </Canvas>
    </div>
  );
}

export default Game;
