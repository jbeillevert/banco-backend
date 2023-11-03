import { IsInt, Min, IsNotEmpty } from 'class-validator'


export class CreateAccountDto {
    @IsInt()
    @Min(1000)
    @IsNotEmpty()
    accountNumber: number

    @IsInt()
    @IsNotEmpty()
    amount: number
}