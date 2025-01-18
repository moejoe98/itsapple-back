import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Admins from '../Models/admins.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admins) private usersRepository: Repository<Admins>,
  ) {}

  public async findOne(username: string): Promise<Admins> {
    try {
      return await this.usersRepository.findOne({
        where: { username },
      });
    } catch (e) {
      return null;
    }
  }
}
