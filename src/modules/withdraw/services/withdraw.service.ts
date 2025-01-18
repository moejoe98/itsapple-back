import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Withdraw from '../model/withdraw.entity';

import * as API from 'kucoin-node-sdk';
import { Direction } from 'src/@types/Settings';

API.init(require('../../../config/kucoin.config'));

@Injectable()
export class WithdrawService {
  public constructor(
    @InjectRepository(Withdraw)
    private withdrawRepository: Repository<Withdraw>,
  ) {}

  public async summaryBalanceAndChains(currency = 'USDT') {
    const [balance, chains] = await Promise.all([
      this.getKucoinBalance(currency),
      this.getWithdrawQuotas(currency),
    ]);
    return { balance, chains };
  }

  public async getKucoinBalance(currency = 'USDT') {
    const getAccountsListResult = await API.rest.User.Account.getAccountsList({
      type: 'main',
      currency,
    });

    return parseFloat(getAccountsListResult.data[0].available);
  }

  public async getWithdrawQuotas(currency = 'USDT') {
    const response = await this.getCurrencyDetails(currency);

    return response.map((res) => ({
      chainName: res.chainName,
      chain: res.chain,
      withdrawalMinFee: parseFloat(res.withdrawalMinFee),
      enabled: res.isWithdrawEnabled,
    }));
  }

  public async withdrawToken(
    clientPhone: string,
    direction: Direction,
    amount: number,
    clientWallet: string,
    chain: string,
    receivedAmount: number,
    chainFee: number,
    currency = 'USDT',
  ) {
    try {
      const response = await API.rest.User.Withdrawals.applyWithdraw(
        currency,
        clientWallet,
        amount,
        { chain },
      );

      if (response?.data?.success || response.code == '200000') {
        await this.createWithdraw(
          clientPhone,
          direction,
          amount,
          clientWallet,
          chain,
          receivedAmount,
          chainFee,
        );

        return {
          success: true,
          message: 'Withdrawal successful',
          ...response.data,
        };
      } else {
        throw new Error(response?.msg);
      }
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Unknown error occurred.',
        },
        400,
      );
    }
  }

  public async createWithdraw(
    clientPhone: string,
    direction: Direction,
    amount: number,
    clientWallet: string,
    chain: string,
    receivedAmount: number,
    chainFee: number,
    currency = 'USDT',
  ) {
    let profit = amount * 0.03;

    return this.withdrawRepository.save({
      clientPhone,
      direction,
      usdtAmount: amount,
      clientWallet,
      chain,
      profit,
      ...(direction == Direction.BUY
        ? { receivedAmount }
        : { givenAmount: receivedAmount }),
      chainFee,
    });
  }

  public async getCurrencyDetails(currency) {
    const response = await API.rest.Market.Currencies.getCurrencyDetail({
      currency,
    });
    return response.data.chains;
  }

  public async getWithdraws() {
    return this.withdrawRepository.find();
  }
}
