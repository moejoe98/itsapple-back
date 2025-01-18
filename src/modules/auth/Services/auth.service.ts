import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/modules/admins/Services/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ user: {}; access_token: string }> {
    const admin = await this.adminsService.findOne(username);
    if (!admin || admin.password !== pass) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const { password, ...adminWithoutPassword } = admin;

    const payload = {
      sub: admin.id,
      username: admin.username,
      role: admin.role,
    };
    return {
      user: adminWithoutPassword,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
