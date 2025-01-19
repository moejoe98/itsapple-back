import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Withdraw from './model/withdraw.entity';
import { WithdrawService } from './services/withdraw.service';
import { WithdrawController } from './Controllers/withdraw.controller';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [TypeOrmModule.forFeature([Withdraw]), OtpModule],
  providers: [WithdrawService],
  exports: [WithdrawService],
  controllers: [WithdrawController],
})
export class WithdrawModule {}
