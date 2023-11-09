import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository'
import { user } from './user.model'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwt: JwtService
    ) {}
    

    private errorUserEmailAlreadyExist(email: string) {
        throw new ConflictException(`Erreur : Création de compte impossible, un compte est déjà lié à l'email ${email}.`)
    }

    
    private errorUserDontExist() {
        throw new UnauthorizedException(`Erreur : Connexion impossible, identifiants incorrects.`)
    }

    private errorWrongPassword() {
        throw new UnauthorizedException(`Erreur : Connexion impossible, identifiants incorrects.`)
    }
    


    async createAUser(email: string, password: string) {
        const emailExist = await this.authRepository.isUserExistInDBRepository(email)
        
        if (emailExist) {
            return this.errorUserEmailAlreadyExist(email)
        } else {
            const hashedPassword = await bcrypt.hash(password, 15)
            await this.authRepository.createAUserRepository(email, hashedPassword)
            return `L'utilisateur ${email} à bien été inscrit.`
        }
    }

    async logAUser(email: string, password: string) {
        console.log(`Attempting to log in user with email: ${email}`); // Vérifie que la méthode est appelée

        const emailExist = await this.authRepository.isUserExistInDBRepository(email)

        if (emailExist) {
            const userConnection = await this.authRepository.findUserByEmailRepository(email)
            console.log(`User found in DB: ${userConnection.email}`); // Vérifie que l'utilisateur est trouvé            
            const passwordMatch = await bcrypt.compare(password, userConnection.hashed_password)
            
            if (passwordMatch) {
                const payload = { userId: userConnection.uuid, email: userConnection.email, role: userConnection.role }
                const token = this.jwt.sign(payload)
                console.log(`JWT created for user: ${token}`); // Vérifie que le JWT est créé
                return { message: `Vous êtes maintenant connecté avec ${email}`, token: token }
            } else {
                console.log(`Password mismatch for user: ${email}`); // Vérifie que le mot de passe ne correspond pas
                return this.errorWrongPassword()   
            }
        } else {
            console.log(`No user found with email: ${email}`); // Vérifie qu'aucun utilisateur n'est trouvé
            return this.errorUserDontExist()
        }
    }


    async showAllUsers(): Promise<AuthRepository[]> {
        return await this.authRepository.getAllUsersRepository()

    }

    async validateUserById(userId: number): Promise<user> {
        return this.authRepository.findUserByIdRepository(userId);
      }
      


}
