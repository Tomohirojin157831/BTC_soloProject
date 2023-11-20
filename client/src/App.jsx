import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Start from "./Start";


function App() {
  const [users, setUsers] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:4242/users")
      // .then((response) => response.json())
      .then((users) => setUsers(users.data));
    }, []);
    
    console.log("⭐️",users.data)
  return (
    <>
      <Start users={users}>
      <div>{users}</div>
      </Start>
    </>
  );
}

export default App;
