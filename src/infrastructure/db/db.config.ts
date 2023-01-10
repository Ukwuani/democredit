import Knex from "knex";
import {knexConfig} from "./knexfile";
const knexStringCase =  require("knex-stringcase")

const options = knexStringCase(knexConfig[process.env.NODE_ENV || "development" ])

console.log(process.env.DB_HOST)



const database = Knex(options)

database.migrate.list().then(res => console.log(res))

database.migrate.latest().then(([batchNo, log]) => {
    
    if (!log.length) {
        console.info('Database is already up to date');
    } else {
        console.info('Ran migrations: ' + log.join(', '));
    }

    // Important to destroy the database, otherwise Node script won't exit
    // because Knex keeps open handles.
})

export default database;
