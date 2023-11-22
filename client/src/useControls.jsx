import React, { useEffect, useState } from "react";
import * as handTrack from "handtrackjs";

export const useControls = (vehicleApi, chassisApi) => {
  const [controls, setControls] = useState({
    //設定するキーと、値の型d
    // 'arrowup or open': boolean,
    // 'arrowleft' or point: boolean,
    // 'arrowdown or open*2: boolean,
    // 'arrowright or point*2': boolean,
  });

  //キーボード
  useEffect(() => {
    //キーが押された時のイベント
    const keyDownPressHandler = (e) => {
      setControls(
        (controls) => ({
          ...controls,
          [e.key.toLowerCase()]: true,
        })
        // console.log("押したキー！！！！！！！！", e)
      );
    };
    //キーが離された時のイベント
    const keyUpPressHandler = (e) => {
      setControls(
        (controls) => ({
          ...controls,
          [e.key.toLowerCase()]: false,
        })
        // console.log("離したキー！！！！！！！！", e)
      );
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);

    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  //画像認識
  useEffect(() => {
    const video = document.getElementById("recog_video");
    const canvas = document.getElementById("recog_canvas");

    let model;
    const options = {
      // flipHorizonal: false,
      maxNumBoxes: 3,
      scoreThreshold: 0.6,
    };

    let context = canvas.getContext("2d");
    function startDetection() {
      model.detect(video).then((predictions) => {
        model.renderPredictions(predictions, canvas, context, video);

        //1つ検出した場合
        if (predictions[0] && !predictions[1] && !predictions[2]) {
          let result1 = predictions[0].label;
          //faceだけの場合
          if (result1 === "face") {
            setControls((controls) => ({
              ...controls,
              ["arrowup"]: false,
              ["arrowdown"]: false,
              ["arrowleft"]: false,
              ["arrowright"]: false,
            }));
          }
        }

        //2つ検出した場合
        if (predictions[0] && predictions[1] && !predictions[2]) {
          let result1 = predictions[0].label;
          let result2 = predictions[1].label;

          //faceとpointの組み合わせなら前身
          if (result1 === "point" || result2 === "point") {
            setControls((controls) => ({
              ...controls,
              ["arrowup"]: true,
              ["arrowdown"]: false,
              ["arrowleft"]: false,
              ["arrowright"]: false,
            }));
          }

          //faceとopenの組み合わせなら後退
          if (result1 === "open" || result2 === "open") {
            setControls((controls) => ({
              ...controls,
              ["arrowup"]: false,
              ["arrowdown"]: true,
              ["arrowleft"]: false,
              ["arrowright"]: false,
            }));
          }
        }

        //3つ検出した場合
        if (predictions[0] && predictions[1] && predictions[2]) {
          let result1 = predictions[0].label;
          let result2 = predictions[1].label;
          let result3 = predictions[2].label;

          //faceとpointとpointの組み合わせなら左に曲がる
          if (
            (result1 === "point" && result2 === "point") ||
            (result1 === "point" && result3 === "point") ||
            (result2 === "point" && result3 === "point")
          ) {
            setControls((controls) => ({
              ...controls,
              ["arrowup"]: false,
              ["arrowdown"]: false,
              ["arrowleft"]: true,
              ["arrowright"]: false,
            }));
          }

          //faceとopenとopenの組み合わせなら右に曲がる
          if (
            (result1 === "open" && result2 === "open") ||
            (result1 === "open" && result3 === "open") ||
            (result2 === "open" && result3 === "open")
          ) {
            setControls((controls) => ({
              ...controls,
              ["arrowup"]: false,
              ["arrowdown"]: false,
              ["arrowleft"]: false,
              ["arrowright"]: true,
            }));
          }
        }

        requestAnimationFrame(startDetection);
      });
    }

    handTrack.load(options).then(function (modelData) {
      model = modelData;
      console.log("🚀 ~ file: Recognition.jsx:18 ~ .then ~ model:", model);

      //カメラを起動する
      handTrack.startVideo(video).then(function (status) {
        if (status) {
          console.log("カメラ起動成功", status);
          startDetection();
        } else {
          console.log("カメラ起動失敗");
        }
      });
    });
  }, []);

  //キーボード
  useEffect(() => {
    //第二引数はタイヤの連番（０、１、２、３）
    //2,3は後輪
    if (controls.arrowup) {
      vehicleApi.applyEngineForce(20, 2);
      vehicleApi.applyEngineForce(20, 3);
    } else if (controls.arrowdown) {
      vehicleApi.applyEngineForce(-20, 2);
      vehicleApi.applyEngineForce(-20, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    //ハンドルを左に切る、右に切る、真ん中に戻す
    if (controls.arrowleft) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.arrowright) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }
    // if (controls.s) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
    // if (controls.w) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    // if (controls.a) chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
    // if (controls.d) chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, +1]);

    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0); //速度リセット
      chassisApi.angularVelocity.set(0, 0, 0); //回転速度リセット
      chassisApi.rotation.set(0, 0, 0); //回転リセット
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};
