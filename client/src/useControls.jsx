import React, { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi) => {
  const [controls, setControls] = useState({
    //設定するキーと、値の型d
    // 'arrowup': boolean,
    // 'arrowleft': boolean,
    // 'arrowdown': boolean,
    // 'arrowright': boolean,
  });

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

  useEffect(() => {
    //第二引数はタイヤの連番（０、１、２、３）
    //2,3は後輪
    if (controls.arrowup) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls.arrowdown) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
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
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};
