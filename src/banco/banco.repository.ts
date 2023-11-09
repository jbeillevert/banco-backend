import {
    getAllAccountsQuery, 
    getOneAccountQuery, 
    getOneAccountWithUserIDQuery,
    createAnAccountQuery, 
    depositAmountQuery, 
    withdrawAmountQuery,
    deleteOneAccountQuery, 
} from './db/accountQueries'

export class BancoRepository {
    async getAllAccountsRepository(userId: number) {
        return await getAllAccountsQuery(userId)
    }

    async getOneAccountRepository(accountNumber: number) {
        return await getOneAccountQuery(accountNumber)
    }

    async getOneAccountWithUserIDRepository(accountNumber: number, userId: number) {
        return await getOneAccountWithUserIDQuery(accountNumber, userId)
    }

    async deleteOneAccountRepository(accountNumber: number, userId: number) {
        return await deleteOneAccountQuery(accountNumber, userId)
    }

    async createAnAccountRepository(accountNumber: number, amount: number, userId: number) {
        return await createAnAccountQuery(accountNumber, amount, userId)
    }

    async depositAmountRepository(accountNumber: number, newAmount: number) {
        return await depositAmountQuery(accountNumber, newAmount)
    }

    async withdrawAmountRepository(accountNumber: number, newAmount: number) {
        return await withdrawAmountQuery(accountNumber, newAmount)
    }
}
