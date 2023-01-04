import Knex from 'knex';

interface IKnexConfig {
    [key: string]: object;
};

const knexConfig: IKnexConfig = {
    development: {
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING,
        searchPath: ['knex', 'public'],
    }
}

const dbConnection = Knex(knexConfig[process.env.NODE_ENV || "development" ])

export default dbConnection;
