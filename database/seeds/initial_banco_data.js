/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('accounts').del()
  await knex('users').del()

  const hashedPasswords = await Promise.all([
    bcrypt.hash('password123', 10),
    bcrypt.hash('password456', 10),
    bcrypt.hash('password789', 10),
    bcrypt.hash('donut', 10) 
  ]);
  

  const userInsertions = await knex('users').insert([
    {email: 'alice@example.com', hashed_password: hashedPasswords[0]},
    {email: 'bob@example.com', hashed_password: hashedPasswords[1]},
    {email: 'charlie@example.com', hashed_password: hashedPasswords[2]},
    {email: 'homerSimpson@gmail.com', hashed_password: hashedPasswords[3], role: 'admin'},
  ]).returning('uuid')


  const insertedUserUuids = userInsertions.map(u => u.uuid);

  await knex('accounts').insert([
    {user_id: insertedUserUuids[1], account_number: 1326, amount: 2500},
    {user_id: insertedUserUuids[1], account_number: 7248, amount: 5040},
    {user_id: insertedUserUuids[2], account_number: 4268, amount: 9330},
    {user_id: insertedUserUuids[2], account_number: 2654, amount: 4070},
    {user_id: insertedUserUuids[3], account_number: 2689, amount: 1560},
  ]);
};
