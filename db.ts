const dotenv = require('dotenv')
const Knex = require('knex')
const path = require('path')

require('dotenv').config()

const user = process.env.DB_USER
console.log('ici userr: ', user);


const knexConfig = {
    client: process.env.DB_CLIENT, // ici probleme avec variable environnement
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER, // ici probleme avec variable environnement
        password: process.env.DB_PASSWORD, // ici probleme avec variable environnement
        database: process.env.DB_NAME, // ici probleme avec variable environnement
    }  
}

console.log('ici je log dans mon db ts');

console.log({
    DB_CLIENT: process.env.DB_CLIENT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
  });

const knex = Knex(knexConfig)

export default knex