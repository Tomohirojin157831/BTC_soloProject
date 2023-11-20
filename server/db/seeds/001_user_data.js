"use strict";

exports.seed = function (knex, Promise) {
  const users = [
    {
      id: 1,
      first_name: "Tomohiro",
      last_name: "Jin",
      age: "72",
      country: "Japan",
      favorite_car: "Toyota",
    },
    {
      id: 2,
      first_name: "Hui",
      last_name: "Wang",
      age: "18",
      country: "China",
      favorite_car: "BMW",
    },
    {
      id: 3,
      first_name: "Arnold",
      last_name: "Schwarzenegger",
      age: "76",
      country: "USA",
      favorite_car: "HUMMER",
    },
  ];
  return knex("game")
    .del()
    .then(() => {
      return knex("game").insert(users);
    });
};
