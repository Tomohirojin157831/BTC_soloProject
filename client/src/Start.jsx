import React from "react";
import { useState, useEffect } from "react";

export default function Start(props) {
  const data = props;
  console.log("子供Start", data.users);

  let usersArray = [];
  let usersLists;
  if (!data.users) {
    usersArray = [];
    console.log("usersArray空");
    usersLists = "空データ";
  } else {
    console.log("usersArrayデータあり");
    usersArray = data.users;
    // usersLists = usersArray[0].id;fdfa
    usersLists = usersArray.map((user, i) => {
      return (
        <div className="start" key={i}>
          <li>test</li>
        </div>
      );
    });
  }

  return <div>{usersLists}</div>;
}
