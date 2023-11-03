import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { BancoRepository } from './banco.repository';
import { bankAccount } from './bankAccount.model';

@Injectable()
export class BancoService {
    constructor(private readonly bancoRepository: BancoRepository) {}

    public accountsList: bankAccount[] = [] 

    private async findAnAccount(accountNumber: number, userId: number): Promise<bankAccount | undefined>  {
        const account = await this.bancoRepository.getOneAccountRepository(accountNumber, userId)
        return account.length > 0 ? account[0] : undefined
    }

    private errorAccountDontExist(accountNumber: number): void {
        throw new NotFoundException(`Erreur : Le compte n°${accountNumber} n'existe pas.`)
    }

    private errorMissingInfo(): void {
        throw new BadRequestException(`Erreur : Une ou plusieurs informations sont manquantes.`) 
    }

    private errorLackAmount(): void {
        throw new ForbiddenException(`Erreur : Retrait impossible, votre solde est insuffisant.`) 
    }


    async createAnAccount(accountNumber: number, amount: number, userId: number): Promise<string | Error> {
        if (accountNumber && amount) {
            await this.bancoRepository.createAnAccountRepository(accountNumber, amount, userId)
            return `Le compte n°${accountNumber} à bien été ajouté à l'utilisateur n°${userId}`
        } else {
            this.errorMissingInfo()
        }
    }

    async depositAmount(accountNumber: number, depositAmount: number, userId: number): Promise<string | Error> {
        const accountExist = await this.findAnAccount(accountNumber, userId)
        const accountOwner = accountExist.user_id
        const userIsAccountOwner = accountOwner === userId

        if (accountExist && userIsAccountOwner) {
            const newAmount = accountExist.amount += depositAmount
            await this.bancoRepository.depositAmountRepository(accountNumber, newAmount)
            return `La somme de ${depositAmount}€ a été déposée sur le compte n°${accountNumber}`
        } else {
            this.errorAccountDontExist(accountNumber)
        }
    }

    async withdrawAmount(accountNumber: number, withdrawAmount: number, userId: number): Promise<string | Error> {
        const accountExist = await this.findAnAccount(accountNumber, userId)
        const accountOwner = accountExist.user_id
        const userIsAccountOwner = accountOwner === userId

        if (accountExist && userIsAccountOwner) {
            if (accountExist.amount >= withdrawAmount) {
                const newAmount = accountExist.amount -= withdrawAmount
                await this.bancoRepository.withdrawAmountRepository(accountNumber, newAmount)
                return `La somme de ${withdrawAmount}€ a été retirée du compte n°${accountNumber}`
            } else {
                this.errorLackAmount()
            }
        } else {
            this.errorAccountDontExist(accountNumber)
        }
    }

    async showAllAccounts(userId: number): Promise<bankAccount[]> {
        return await this.bancoRepository.getAllAccountsRepository(userId)
    }

    async showOneAccount(accountNumber: number, userId: number): Promise<bankAccount> {
        const accountExist = await this.findAnAccount(accountNumber, userId)
        const accountOwner = accountExist.user_id
        const userIsAccountOwner = accountOwner === userId
        
    
        if (accountExist && userIsAccountOwner) {
            return accountExist
        } else {
            this.errorAccountDontExist(accountNumber)
        }
    }

    async deleteOneAccount(accountNumber: number, userId: number): Promise<String> {
        const accountExist = await this.findAnAccount(accountNumber, userId)
        const accountOwner = accountExist.user_id
        const userIsAccountOwner = accountOwner === userId


        if (accountExist && userIsAccountOwner) {
            await this.bancoRepository.deleteOneAccountRepository(accountNumber, userId)

            return `Le compte n°${accountNumber} a bien été supprimé.`
        } else {
            this.errorAccountDontExist(accountNumber)
        }

        
    }


}
