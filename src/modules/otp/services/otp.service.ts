import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import crypto from 'crypto';
import Otp from '../model/otp.entity';

@Injectable()
export class OtpService {
  public constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
  ) {}

  public async createOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return this.otpRepository.save({
      otp,
    });
  }

  public async verifyOtp(otp: string): Promise<boolean> {
    const latestOtp = await this.otpRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 1,
    });

    if (!latestOtp.length) {
      return false;
    }

    if (latestOtp[0].otp === otp) {
      return true;
    }

    return false;
  }
}
