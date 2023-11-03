import { Module } from '@nestjs/common';
import { BancoService } from './banco.service';
import { BancoController } from './banco.controller';
import { BancoRepository } from './banco.repository';

@Module({
  controllers: [BancoController],
  providers: [BancoService, BancoRepository]
})
export class BancoModule {}
