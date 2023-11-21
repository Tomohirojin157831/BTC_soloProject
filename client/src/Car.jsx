import { useBox } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export function Car() {
  //   const car = "/car/car.glb";
  const car = "./bmw/scene.gltf";
  let mesh = useLoader(GLTFLoader, car).scene;

  const position = [-1.5, 0.5, 3];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null)
  );

  useEffect(() => {
    mesh.scale.set(0.2, 0.2, 0.2); //bmwは0.2
    mesh.children[0].position.set(5, 0, -6);
  }, [mesh]);
  return (
    <mesh ref={chassisBody}>
      <meshBasicMaterial transparent={true} opacity={0.3} />
      <boxGeometry args={chassisBodyArgs} />
    </mesh>
  );
}
