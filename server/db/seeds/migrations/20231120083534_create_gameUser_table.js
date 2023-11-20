/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
"use strict";

exports.up = function (knex) {
  return knex.schema.createTable("gameUser", function (table) {
    table.increments("id").primary(); // Set this column as the primary key
    table.string("first_name", 32).notNullable();
    table.string("last_name", 32).notNullable();
    table.string("age", 32).notNullable();
    table.string("country", 32).notNullable();
    table.string("favorite_car", 32).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("gameUser");
};
