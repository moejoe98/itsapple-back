import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsService } from './Services/admins.service';
import Admins from './Models/admins.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Admins])],
  providers: [AdminsService],
  exports: [AdminsService],
  controllers: [],
})
export class AdminsModule {}
