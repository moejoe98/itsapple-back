import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Withdraw from './model/withdraw.entity';
import { WithdrawService } from './services/withdraw.service';
import { WithdrawController } from './Controllers/withdraw.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Withdraw])],
  providers: [WithdrawService],
  exports: [WithdrawService],
  controllers: [WithdrawController],
})
export class WithdrawModule {}
