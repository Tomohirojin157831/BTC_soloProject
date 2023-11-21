import React, { useState, useEffect } from "react";

export default function Start(props) {
  function gameBack() {
    console.log("クリックした！");
    props.setStatus("choosing");
  }

  return (
    <>
      <div className="game">
        選択した車：{props.car}
        <button
          id="backButton"
          onClick={() => {
            gameBack();
          }}
        >
          車選択に戻る
        </button>
      </div>
    </>
  );
}
