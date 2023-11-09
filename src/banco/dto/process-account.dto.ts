import { IsInt, Min } from 'class-validator'


export class DepositAmountDto {
    @IsInt()
    @Min(10)
    depositAmount: number

}

export class WithdrawAmountDto {
    @IsInt()
    withdrawAmount: number
}