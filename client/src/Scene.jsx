import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei"; //three/fiberのヘルパー関数を集めたライブラリ
import { Suspense, useState } from "react";
import { Track } from "./Track";
import { Ground } from "./Ground";
import { Car } from "./Car";

export function Scene(props) {
  const [thirdPerson, setThirdPerson] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([-1, 3.9, 6.21]);
  const [car3, setCar3] = useState("");

  return (
    <Suspense>
      <Environment
        files={"/textures/envmap.hdr"} //hdr:High Dynamic Range
        background={"both"}
      ></Environment>
      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {/* 主観に切り替える↓ */}
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}

      <Track></Track>
      <Ground></Ground>
      <Car thirdPerson={thirdPerson} car3={props.car2} />
    </Suspense>
  );
}
