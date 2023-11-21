import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";

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
    <mesh geometry={geometry}>
      {/* <primitive object={geometry} attach={"geometry"} /> */}
      <meshBasicMaterial toneMapped={false} map={colorMap} />
    </mesh>
  );
}
