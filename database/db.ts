const Knex = require('knex')
const path = require('path')


require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


const knexConfig = {
    client: 'pg', // ici probleme avec variable environnement
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: 'root', // ici probleme avec variable environnement
        password: 'root', // ici probleme avec variable environnement
        database: 'postgres', // ici probleme avec variable environnement
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