import knex from "../../../db";


export const getAllAccountsQuery = async (userId: number) => {
    return knex.select('*').from('accounts').where('user_id', '=', userId)
}

export const getOneAccountQuery = async (accountNumber: number) => {
    return knex.select('*').from('accounts').where('account_number', '=', accountNumber)
}

export const getOneAccountWithUserIDQuery = async (accountNumber: number, userId: number) => {
    return knex.select('*').from('accounts').where('account_number', '=', accountNumber).andWhere('user_id', '=', userId)
}

export const deleteOneAccountQuery = async (accountNumber: number, userId: number) => {
    return knex.delete('*').from('accounts').where('account_number', '=', accountNumber).andWhere('user_id', '=', userId)
}

export const createAnAccountQuery = async (accountNumber: number, amount: number, userId: number) => {
    return knex.insert({ account_number: accountNumber, amount: amount, user_id: userId }).into('accounts')
}

export const depositAmountQuery = async (accountNumber: number, newAmount: number) => {
    return knex('accounts').where('account_number', '=', accountNumber).update({ 'amount': newAmount })
}

export const withdrawAmountQuery = async (accountNumber: number, newAmount: number) => {
    return knex('accounts').where('account_number', '=', accountNumber).update({ 'amount': newAmount })
}
