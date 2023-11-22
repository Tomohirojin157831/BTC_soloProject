import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber"; //Three.jsに近いもの
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon"; //2D/3D物理エンジンの一つ
import "./App.css";

export default function Start(props) {
  const [car2, setCar2] = useState("");
  function gameBack() {
    console.log("クリックした！");
    props.setStatus("choosing");
  }

  return (
    <>
      <div className="game">
        selected car:{props.car}
        <button
          id="backButton"
          onClick={() => {
            gameBack();
          }}
        >
          車選択に戻る
        </button>
        <canvas id="recog_canvas" width="240" height="120"></canvas>
        <video id="recog_video" width="240" height="120"></video>
        <img src="./textures/manual.png" width="240" height="120" />
        <Canvas style={{ height: "500px" }}>
          <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
            <Scene car2={props.car} setCar2={setCar2}></Scene>
          </Physics>
        </Canvas>
      </div>
    </>
  );
}
//broadphase:衝突判定の効率化のために使用される手法
//SAP (Sweep and Prune): 軸に沿った境界ボックス（AABB：Axis-Aligned Bounding Box）を用いてオブジェクトをソートし、交差する可能性があるオブジェクト同士だけを検出する手法です。この方法は効率的な衝突検出を行うことができます。
