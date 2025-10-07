import {
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly jwtService: JwtService;

  async signin({ email, password }: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    if (!user) throw new UnauthorizedException('User not found');
    if (!user.active) throw new UnauthorizedException('User inactive');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid password');

    const payload = { sub: user.id, role: user.role.roleName };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.roleName,
        active: user.active,
      },
    };
  }
}