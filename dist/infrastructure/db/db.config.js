"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
;
const knexConfig = {
    development: {
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING,
        searchPath: ['knex', 'public'],
    }
};
const dbConnection = (0, knex_1.default)(knexConfig[process.env.NODE_ENV || "development"]);
exports.default = dbConnection;
