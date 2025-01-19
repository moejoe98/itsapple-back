import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminRole } from 'src/@types/Settings';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Roles } from 'src/modules/auth/Constants/roles.decorator';
import { OtpService } from '../services/otp.service';

@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @UseGuards(AuthGuard)
  @Roles(AdminRole.ADMIN)
  @Get('/generate')
  async generateOtp() {
    try {
      await this.otpService.createOtp();
      return {
        statusCode: HttpStatus.CREATED,
        message: 'OTP generated successfully.',
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred while generating OTP.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
