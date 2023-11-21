import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";
import { useControls } from "./useControls";
import { Quaternion, Vector3 } from "three";

export function Car({ thirdPerson, car3 }) {
  let car = "";
  let scale = 0;
  let x = 0;
  let y = 0;
  let z = 0;
  let direction = 0;
  if (car3) {
    car = "./" + car3 + "/scene.gltf";
    scale = 0.05;
    x = 5;
    y = 0;
    z = -6;
    //mclaren,
  } else {
    car = "/car/car.glb";
    scale = 0.0012;
    x = -365;
    y = -18;
    z = -67;
  }
  if (car3 === "mclaren" || !car3) {
    direction = Math.PI;
  } else {
    direction = Math.PI / 100;
  }

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

  useFrame((state) => {
    if (!thirdPerson) return;

    //座標位置を取得
    let position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);
    //回転状況を取得
    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);
    //例えばオブジェクトが特定の方向を向いているかどうかを確認したり、特定の方向に対して処理を行ったりする際に使用
    let wDir = new Vector3(0, 0, -1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();
    //カメラの新しい位置を決定
    let cameraPosition = position
      .clone()
      .add(wDir.clone().multiplyScalar(-1).add(new Vector3(0, 0.3, 0)));

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  useEffect(() => {
    mesh.scale.set(scale, scale, scale);
    // mesh.scale.set(0.0012, 0.0012, 0.0012);
    // mesh.scale.set(0.05, 0.05, 0.05); //bmwは0.05以下でないとうまく障害物にあたらない
    // mesh.children[0].position.set(-365, -18, -67);
    mesh.children[0].position.set(x, y, z);
    // mesh.children[0].position.set(5, 0, -6); //bmw設定
  }, [mesh]);

  return (
    <group ref={vehicle} name="vehicle">
      <group ref={chassisBody} name="chassisBody">
        <primitive
          object={mesh}
          // rotation-y={Math.PI}
          rotation-y={direction}
          position={[0.2, -0.09, 0]}
        />
      </group>

      {/* <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh> */}
      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
}
