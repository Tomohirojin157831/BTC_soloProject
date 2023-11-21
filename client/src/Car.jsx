import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";
import { useControls } from "./useControls";

export function Car() {
  const car = "/car/car.glb";
  // const car = "./bmw/scene.gltf";
  let mesh = useLoader(GLTFLoader, car).scene;

  const position = [-1.5, 0.5, 3]; //箱のポジション
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

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
  //raycastvehicle:物理エンジンだけでは表現しきれない複雑な車両の挙動をシミュレートし、リアルな車両操作や挙動を再現することが可能になる
  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null)
  );

  useControls(vehicleApi, chassisApi);

  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    // mesh.scale.set(0.2, 0.2, 0.2); //bmwは0.2
    mesh.children[0].position.set(-365, -18, -67);
    // mesh.children[0].position.set(5, 0, -6);//bmw設定
  }, [mesh]);

  return (
    <group ref={vehicle} name="vehicle">
      <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh>
      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
}
