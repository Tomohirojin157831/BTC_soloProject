import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferAttribute } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export function Ground() {
  const grid = "/textures/grid.png";
  const groundao = "/textures/ground-ao.png";
  const alphamap = "/textures/alpha-map.png";

  const gridMap = useLoader(TextureLoader, grid);
  const aoMap = useLoader(TextureLoader, groundao);
  const alphaMap = useLoader(TextureLoader, alphamap);

  useEffect(() => {
    gridMap.anisotropy = 16; //異方性（3Dモデルに材質を設定するための要素の１つ）
  }, [gridMap]);

  const meshRef = useRef(null);
  const meshRef2 = useRef(null);

  //以下のuseEffectは「setAttribute」がundefinedをReadしているエラーになるので、一旦コメントアウト
  //   useEffect(() => {
  //     let uvs = meshRef.current.geometry.attributes.uv.array;
  //     let uvs2 = meshRef2.current.geometry.attributes.uv.array;
  //     console.log("🚀 ~ file: Ground.jsx:24 ~ useEffect ~ meshRef:", meshRef);
  //     console.log("🚀 ~ file: Ground.jsx:24 ~ useEffect ~ uvs:", uvs);

  //     //uv:3DCGモデルにテクスチャをマッピングするとき、
  //     //貼り付ける位置や方向、大きさなどを指定するために使う座標系のこと。
  //     //2次元の直交座標系で、横方向の軸がU、縦方向の軸がVとなる。

  //     meshRef.current.geometory.setAttribute("uv2", new BufferAttribute(uvs, 2));
  //     meshRef2.current.geometory.setAttribute(
  //       "uv2",
  //       new BufferAttribute(uvs2, 2)
  //     );
  //     //     //BufferAttriute:頂点座標情報を保持しています。
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [meshRef.current]);

  return (
    <>
      <mesh
        ref={meshRef2}
        position={[-2.285, -0.001, -1.325]}
        rotation-x={-Math.PI * 0.5}
      />
      <planeGeometry args={[12, 12]} />
      <meshBasicMaterial
        opacity={0.325} //透明度
        alphaMap={gridMap} //透明度をテクスチャ自体の情報に基づいて制御することが可能
        transparent={true} //そのマテリアルが透明かどうか
        color={"white"} //マテリアルの色
      />

      <mesh
        ref={meshRef}
        position={[-2.285, -0.015, -1.325]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={-0.079}
      >
        <circleGeometry args={[6.12, 50]}></circleGeometry>
        <MeshReflectorMaterial
          aoMap={aoMap}
          alphaMap={alphaMap}
          transparent={true}
          color={[0.5, 0.5, 0.5]}
          envMapIntensity={0.35}
          metalness={0.05}
          roughness={0.4}
          dithering={true}
          blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={3} // How much blur mixes with surface roughness (default = 1)
          mixStrength={30} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [bl
          debug={0}
          reflectorOffset={0.02} // Offsets the virtual camera that projects the reflection. Useful when the reflective
        />
      </mesh>
    </>
  );
}
