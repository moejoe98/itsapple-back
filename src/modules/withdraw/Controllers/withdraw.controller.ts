import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WithdrawService } from '../services/withdraw.service';
import { AdminRole } from 'src/@types/Settings';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Roles } from 'src/modules/auth/Constants/roles.decorator';
import { CreateWithdrawDto } from '../Dto/createWithdraw.dto';
import { OtpService } from 'src/modules/otp/services/otp.service';

// @UseInterceptors(ResponseInterceptor)
@Controller('dashboard')
export class WithdrawController {
  constructor(
    private withdrawService: WithdrawService,
    private otpService: OtpService,
  ) {}

  @UseGuards(AuthGuard)
  @Roles(AdminRole.ADMIN)
  @Get('/usdt-balance-chains')
  async getLimitOrders() {
    return await this.withdrawService.summaryBalanceAndChains();
  }

  @UseGuards(AuthGuard)
  @Roles(AdminRole.ADMIN)
  @Get('/quote')
  async getQuote() {
    return await this.withdrawService.getWithdrawQuotas();
  }

  @UseGuards(AuthGuard)
  @Roles(AdminRole.ADMIN)
  @Post('/withdraw')
  async withdrawToken(@Body() createWithdrawDto: CreateWithdrawDto) {
    const isOtpValid = await this.otpService.verifyOtp(createWithdrawDto.otp);
    if (!isOtpValid) {
      throw new HttpException(
        { message: 'Invalid or expired OTP' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.withdrawService.withdrawToken(
      createWithdrawDto.clientPhone,
      createWithdrawDto.direction,
      createWithdrawDto.usdtAmount,
      createWithdrawDto.clientWallet,
      createWithdrawDto.chain,
      createWithdrawDto.receivedAmount,
      createWithdrawDto.chainFee,
    );
  }

  @UseGuards(AuthGuard)
  @Roles(AdminRole.ADMIN)
  @Get('/withdraw-list')
  async getWithdrawList() {
    return await this.withdrawService.getWithdraws();
  }
}
