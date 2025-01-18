import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WithdrawService } from '../services/withdraw.service';
import { AdminRole } from 'src/@types/Settings';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Roles } from 'src/modules/auth/Constants/roles.decorator';
import { CreateWithdrawDto } from '../Dto/createWithdraw.dto';

// @UseInterceptors(ResponseInterceptor)
@Controller('dashboard')
export class WithdrawController {
  constructor(private withdrawService: WithdrawService) {}

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
