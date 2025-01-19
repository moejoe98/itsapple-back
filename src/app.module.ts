import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WithdrawModule } from './modules/withdraw/withdraw.module';
import { AdminsModule } from './modules/admins/admins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './config/orm.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { OtpModule } from './modules/otp/otp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    WithdrawModule,
    AdminsModule,
    AuthModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
