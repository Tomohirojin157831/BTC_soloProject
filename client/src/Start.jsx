import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as THREE from "three";
import { ConvexObjectBreaker, GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "./orbitControl.js";
import "./index.css";

// import { useState, useEffect } from "react";

export default function Start(props) {
  // const data = props;
  // const setStatus = props;
  let chosenCar;
  console.log("子供Start-props", props);
  let usersArray = [];
  let characterLists = [];
  if (props.users) {
    // console.log("usersArrayデータあり");
    usersArray = props.users;
    usersArray.map((user) => {
      let selectData = {};
      selectData.value = user.first_name;
      selectData.label = user.first_name;
      selectData.car = user.favorite_car;
      characterLists.push(selectData);
    });
    // console.log("🚀🚀🚀🚀", characterLists);
  }

  //キャラの名前を選択した際の画像を表示する設定
  const handleChange = (e) => {
    let car = "./" + e.car + "/scene.gltf";
    chosenCar = e.car; //ゲームに向けて車を渡す
    //3Dモデル設定開始↓
    let canvas;
    let model;

    canvas = document.getElementById("canvas");

    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };
    //シーン
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    //カメラ
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(0, 1, 4);

    //renderer
    const renderer = new THREE.WebGL1Renderer({
      canvas: canvas, //描画先を指定
      antialias: true, //ギザギザをなめらかに
      alpha: true, //透明度をtrueにすることで背景色が見えるようになる。
    });
    renderer.setSize(sizes.width, sizes.height); //綺麗に描画するためのお決まりの文言
    renderer.setPixelRatio(window.devicePixelRatio); //綺麗に描画するためのお決まりの文言

    //マウスコントロール
    const controls = new OrbitControls(camera, canvas);
    //動きを滑らかに
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    //3Dモデルのインポート
    // let mixer; //動きがあれば、設定するための変数

    const gltfLoader = new GLTFLoader();

    //
    gltfLoader.load(car, (gltf) => {
      model = gltf.scene;
      model.scale.set(1.2, 1.2, 1.2);
      model.rotation.y = -Math.PI / 1.2; //tomohiro:4,arnold/hui:1.2向いている方向を決めれる
      scene.add(model);

      // mixer = new THREE.AnimationMixer(model);
      // const clips = gltf.animations;
      // //foreachで１つずつのアニメーションを取り出し、再生する。
      // clips.forEach(function (clip) {
      //   const action = mixer.clipAction(clip);
      //   action.play();
      // });
    });

    //ライト
    const ambientLight = new THREE.AmbientLight(0x404040, 100); //アンビエントライト
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xc4c4c4, 10);
    pointLight.position.set(0, 300, 500);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0xc4c4c4, 10);
    pointLight2.position.set(500, 100, 0);
    scene.add(pointLight2);
    const pointLight3 = new THREE.PointLight(0xc4c4c4, 10);
    pointLight3.position.set(0, 100, -500);
    scene.add(pointLight3);
    const pointLight4 = new THREE.PointLight(0xc4c4c4, 10);
    pointLight4.position.set(-500, 300, 0);
    scene.add(pointLight4);

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);

    //アニメーション設定
    const tick = () => {
      //動きがあれば設定する
      // if (mixer) {
      //   mixer.update(0.01);
      // }
      //カメラコントールを更新（マウスによる操作を滑らかに）
      controls.update();
      //レンダリング
      renderer.render(scene, camera);
      //tickという関数を何度も呼ぶ
      requestAnimationFrame(tick);
    };
    tick();
  };

  function gameStart() {
    console.log("クリックした！");
    props.setStatus("gameStart");
    props.setCar(chosenCar);
  }
  //
  return (
    <>
      <div className="start">
        <h1>Car race game</h1>
        <Select
          className="select"
          options={characterLists}
          onChange={handleChange}
        />
        <button
          id="startButton"
          onClick={() => {
            gameStart();
          }}
        >
          ゲームスタート
        </button>
        <canvas id="canvas"></canvas>
      </div>
    </>
  );
}
