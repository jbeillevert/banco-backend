import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { BancoService } from './banco.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { DepositAmountDto, WithdrawAmountDto } from './dto/process-account.dto';

@Controller('api/banco')
@UseGuards(AuthGuard('jwt'))
export class BancoController {
    constructor(private readonly bancoservice: BancoService) {}

    @Get('/')
    getAllAcounts(@Req() req) {
        const userId = req.user.uuid


        return this.bancoservice.showAllAccounts(userId)
    }

    @Get('/:id')
    getOneAccount(@Param('id') id: number, @Req() req) {
        const userId = req.user.uuid

        return this.bancoservice.showOneAccount(id, userId)
    }

    @Delete('/:id')
    deleteOneAccount(@Param('id') id: number, @Req() req) {
        const userId = req.user.uuid

        return this.bancoservice.deleteOneAccount(id, userId)
    }

    @Post('/')
    createAnAccount(@Body() createAccountDto: CreateAccountDto, @Req() req) {
        const userId = req.user.uuid
        
        const { accountNumber, amount } = createAccountDto
        return this.bancoservice.createAnAccount(accountNumber, amount, userId)
    }

    @Put('deposit/:id')
    depositAmount(@Param('id') id: number, @Body() depositAmountDto: DepositAmountDto, @Req() req) {
        const userId = req.user.uuid
        const { depositAmount } = depositAmountDto

        return this.bancoservice.depositAmount(id, depositAmount, userId)
    }

    @Put('withdraw/:id')
    withdrawAmount(@Param('id') id: number, @Body() withdrawAmountDto: WithdrawAmountDto, @Req() req) {
        const userId = req.user.uuid
        const { withdrawAmount } = withdrawAmountDto

        return this.bancoservice.withdrawAmount(id, withdrawAmount, userId)
    }

}
