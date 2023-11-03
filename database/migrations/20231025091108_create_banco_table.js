/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .then(function() {
            return knex.schema.createTable('users', function(table) {
                    table.uuid('uuid').primary().defaultTo(knex.raw('uuid_generate_v4()'))
                    table.string('email').unique().notNullable()
                    table.string('hashed_password').notNullable()
                    table.string('role').defaultTo('user').notNullable()
                    table.timestamps(true, true)
                })
        })
        .then(function(){
            return knex.schema.createTable('accounts', function(table) {
                table.integer('account_number').unique().primary().notNullable()
                table.integer('amount').notNullable()
                table.timestamps(true, true)
                table.uuid('user_id').unsigned().references('uuid').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
            })
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('accounts')
        .dropTable('users')
};
