import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Start from "./Start";


function App() {
  const [users, setUsers] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:4242/users")
      .then((users) => {
        console.log("⭐️",users)
        setUsers(users.data)});
    }, []);
    
  return (
    <>
      <Start users={users}>
      </Start>
    </>
  );
}

export default App;
