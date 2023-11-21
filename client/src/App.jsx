import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Start from "./Start";
import Game from "./Game";

export default function App() {
  const [users, setUsers] = useState("");
  const [status, setStatus] = useState("choosing");
  const [car, setCar] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:4242/users").then((users) => {
      // console.log("⭐️",users)
      setUsers(users.data);
    });
  }, []);

  return (
    <>
      <div className="app">
        {status === "choosing" && (
          <Start
            users={users}
            setStatus={setStatus}
            status={status}
            car={car}
            setCar={setCar}
          ></Start>
        )}
        {status === "gameStart" && (
          <Game
            setStatus={setStatus}
            status={status}
            car={car}
            setCar={setCar}
            className="game"
          ></Game>
        )}
      </div>
    </>
  );
}

// export default App;
