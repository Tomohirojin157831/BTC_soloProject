import React from "react";
import Select from "react-select";

import { useState, useEffect } from "react";

export default function Start(props) {
  const data = props;
  // console.log("子供Start", data.users);

  let usersArray = [];
  let characterLists = [
    // { value: "pikachu", label: "ピカチュウ" },
    // { value: "bulbasaur", label: "フシギダネ" },
    // { value: "charmander", label: "ヒトカゲ" },
    // { value: "squirtle", label: "ゼニガメ" },
  ];
  if (data.users) {
    // console.log("usersArrayデータあり");
    usersArray = data.users;
    usersArray.map((user) => {
      let selectData = {};
      selectData.value = user.first_name;
      selectData.label = user.first_name;
      characterLists.push(selectData);
    });
    // console.log("🚀🚀🚀🚀", characterLists);
  }

  return (
    <div className="start">
      <h1>Car race game</h1>
      <Select options={characterLists} />
    </div>
  );
}
