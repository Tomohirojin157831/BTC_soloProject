import React from "react";
import { useState, useEffect } from "react";

export default function Start(props) {
    const data = props;
    console.log("子供",data)
    return (
      <div className="start">
        テスト
        <li>{data.users}</li>
      </div>
    );
  }
  