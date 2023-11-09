import { UUID } from "crypto";
import knex from "../../../db";




export const getAllUsersQuery = async () => {
    return knex.select('*').from('users')
}

export const createAUserQuery = async (email: string, hashedPassword: string) => {
    return knex.insert({email: email, hashed_password: hashedPassword}).into('users')
}

export const isUserExistInDBQuery = async (emailTested: string) => {
    const result = await knex.select('*').from('users').where('email', '=', emailTested)
    return result.length > 0
}

export const findUserByEmailQuery = async (email: string) => {
    const result = await knex.select('*').from('users').where('email', '=', email)
    return result[0]
}

export const findUserByIdQuery = async (userId: UUID) => {
    const result = await knex.select('*').from('users').where('uuid', '=', userId)
    return result[0]
}





