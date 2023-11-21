//物理シミュレーションにおけるオブジェクト（剛体）の反発特性や衝突の挙動を調整するための設定
import { useTrimesh } from "@react-three/cannon"; //複雑な形状や曲面を持つ物体に対して物理シミュレーションを行う
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons";

export function Ramp() {
  const result = useLoader(GLTFLoader, "/textures/ramp.glb");

  //glbファイルからgeometry（3Dモデルの形状や頂点、面、UVマッピングなどの幾何学的な情報）を取得
  const geometry = result.scene.children[0].geometry;

  //   実際の頂点座標データが格納された配列を取得
  const vertices = geometry.attributes.position.array;
  //   取得したジオメトリ（Geometry）から頂点のインデックス情報（indices）を取得.
  //   3Dモデルの表面を形成するための三角形を指定するための頂点の組み合わせが得られる
  const indices = geometry.index.array;

  const [ref] = useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 0,
      type: "Static",
    }),
    useRef(null)
  );
}
