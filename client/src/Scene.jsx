import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei"; //three/fiberのヘルパー関数を集めたライブラリ
import { Suspense } from "react";
import { Track } from "./Track";
import { Ground } from "./Ground";
import { Car } from "./Car";

export function Scene() {
  return (
    <Suspense>
      <Environment
        files={"/textures/envmap.hdr"} //hdr:High Dynamic Range
        background={"both"}
      ></Environment>
      <PerspectiveCamera
        makeDefault
        position={[-6, 3.9, 6.21]}
        fov={40}
      ></PerspectiveCamera>
      <OrbitControls target={[-2.64, -0.71, 0.03]}></OrbitControls>
      <Track></Track>
      <Ground></Ground>
      <Car></Car>
    </Suspense>
  );
}
