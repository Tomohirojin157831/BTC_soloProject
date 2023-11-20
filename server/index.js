console.log("server PORT4242 OK!（らいん１）");
const express = require("express");
const cors = require("cors");//CORS対策
const app = express();

app.use(cors());

app.get("/users", (req, res) => {
  res.send("hello world");
  // res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.listen(4242, () => {
  console.log("server PORT4242  OK!（ライン２）");
});
