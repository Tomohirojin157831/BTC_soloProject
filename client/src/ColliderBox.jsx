//usebox:3D空間内にボックス（直方体）の物理的な振る舞いを作成するために使用
import { useBox } from "@react-three/cannon";
// import { BoxGeometry, MeshBasicMaterial } from "three";

const debug = false; //作成時はtrueにしておくと、衝突boxが設定しやすい。

export function ColliderBox({ position, scale }) {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  return (
    debug && (
      <mesh position={position}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    )
  );
}
