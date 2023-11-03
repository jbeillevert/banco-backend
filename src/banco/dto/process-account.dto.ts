import { IsInt } from 'class-validator'


export class DepositAmountDto {
    @IsInt()
    depositAmount: number
}

export class WithdrawAmountDto {
    @IsInt()
    withdrawAmount: number
}