import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Otp from './model/otp.entity';
import { OtpService } from './services/otp.service';
import { OtpController } from './Controllers/otp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  providers: [OtpService],
  exports: [OtpService],
  controllers: [OtpController],
})
export class OtpModule {}
