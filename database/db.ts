import Knex from "knex";

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


const knexConfig = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
}

const knex = Knex(knexConfig)

export default knex