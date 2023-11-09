const { resolve } = require('path')

require('dotenv').config({ path: resolve(__dirname, '../.env') })

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


const development = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

module.exports = { development }
