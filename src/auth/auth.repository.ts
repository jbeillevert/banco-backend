import { createAUserQuery, isUserExistInDBQuery, getAllUsersQuery, findUserByEmailQuery, findUserByIdQuery } from './db/userQueries'


export class AuthRepository {
    async getAllUsersRepository() {
        return await getAllUsersQuery()
    }

    async createAUserRepository(email: string, hashedPassword: string) {
        return await createAUserQuery(email, hashedPassword)
    }

    async isUserExistInDBRepository(emailTested: string): Promise<boolean> {
        return await isUserExistInDBQuery(emailTested)
    }

    async findUserByEmailRepository(email: string) {
        return await findUserByEmailQuery(email)
    }

    async findUserByIdRepository(userId) {
        return await findUserByIdQuery(userId)
    }
}