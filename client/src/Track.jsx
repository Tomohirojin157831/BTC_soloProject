import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { ColliderBox } from "./ColliderBox";
import { Ramp } from "./Ramp";

export function Track() {
  // const car = "./" + "mclaren" + "/scene.gltf"
  const truck = "/track/track.glb";
  const truckPic = "/track/track.png";

  const result = useLoader(GLTFLoader, truck);

  const colorMap = useLoader(TextureLoader, truckPic);
  //   console.log("🚀 ~ file: Track.jsx:14 ~ Track ~ colorMap:", colorMap);

  useEffect(() => {
    colorMap.anisotropy = 16; //異方性（3Dモデルに材質を設定するための要素の１つ）
  }, [colorMap]);

  let geometry = result.scene.children[0].geometry;
  //   console.log("🚀 ~ file: Track.jsx:20 ~ Track ~ geometry:", geometry);

  return (
    <>
      <mesh geometry={geometry}>
        {/* <primitive object={geometry} attach={"geometry"} /> */}
        <meshBasicMaterial toneMapped={false} map={colorMap} />
      </mesh>
      {/* 以下の場所に物体が来たら衝突するようにbox設定 */}
      <ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[2.5, 0, -1.4]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[0.6, 0, -3.8]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-1.95, 0, -5.18]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-5.55, 0, -3.05]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-4.4, 0, -1.77]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-7.03, 0, -0.76]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-4.75, 0, 2.73]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-3.05, 0, 3.4]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-0.83, 0, 3.2]} scale={[0.3, 1, 0.3]} />

      <ColliderBox position={[-1.85, 0, 0.385]} scale={[0.05, 1, 0.13]} />
      <ColliderBox position={[-1.85, 0, -0.385]} scale={[0.05, 1, 0.13]} />
      <ColliderBox position={[-2.28, 0, 0.385]} scale={[0.05, 1, 0.13]} />
      <ColliderBox position={[-2.28, 0, -0.385]} scale={[0.05, 1, 0.13]} />
      <ColliderBox position={[-4.39, 0, 1.125]} scale={[0.13, 1, 0.13]} />
      <ColliderBox position={[-4.39, 0, 1.9]} scale={[0.13, 1, 0.13]} />

      <ColliderBox position={[-2.86, 0, -0.9]} scale={[0.35, 1, 0.35]} />
      <ColliderBox position={[-3.33, 0, -0.9]} scale={[0.35, 1, 0.35]} />
      <ColliderBox position={[0.41, 0, 2]} scale={[0.35, 1, 0.35]} />

      <ColliderBox position={[-2.3, 0, -2.76]} scale={[1.37, 1, 1.09]} />

      <ColliderBox position={[-3.08, 0, 0.89]} scale={[0.36, 1, 0.03]} />
      <ColliderBox position={[-2.53, 0, 0.89]} scale={[0.36, 1, 0.03]} />

      <ColliderBox position={[-4.53, 0, -0.65]} scale={[0.1, 0.5, 0.1]} />
      <ColliderBox position={[-4.15, 0, -0.67]} scale={[0.1, 0.5, 0.1]} />
      <ColliderBox position={[-4.9, 0, -0.58]} scale={[0.1, 0.5, 0.1]} />
      <ColliderBox position={[-0.3, 0, 1]} scale={[0.1, 0.5, 0.1]} />

      <Ramp />
    </>
  );
}
