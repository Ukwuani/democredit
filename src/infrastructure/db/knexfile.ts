import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config()

interface IKnexConfig {
  [key: string]: object;
};

// Update with your config settings.

// dotenv.config({path: "../../../.env"});
console.log(process.env.NODE_ENV)
console.log(process.env.DB_HOST)
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

export const knexConfig: IKnexConfig = {
  development: {
    client: "mysql2",
    connection: {
      host,
      port,
      user,
      password,
      database
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"

    }
  },
};

// module.exports = knexConfig