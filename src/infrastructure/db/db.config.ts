import Knex from "knex";
import {knexConfig} from "./knexfile";
const knexStringCase =  require("knex-stringcase")

const options = knexStringCase(knexConfig[process.env.NODE_ENV || "development" ])

console.log(process.env.DB_HOST)


const database = Knex(options)

export default database;
