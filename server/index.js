const express = require("express");
const cors = require("cors"); //CORS対策
const app = express();
// const knex = require("knex");
const knex = require("./knex");

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  const user = await knex
    .select()
    .from("game")
    .then((data) => {
      return data;
    })
    .then((data) => {
      res.send(data); //dataは配列
    });
});

app.listen(4242, () => {
  console.log("server on PORT4242");
});
