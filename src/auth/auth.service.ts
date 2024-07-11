import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException("Email doesn't exist");
    }

    const { password, ...userWithoutPassword } = user;

    const pwMatches = await argon.verify(password, dto.password);

    const accessToken = this.jwtService.sign(userWithoutPassword, {
      secret: process.env.SECRET_KEY,
    });

    if (!pwMatches) {
      throw new ForbiddenException('Incorrect email or password');
    }

    return { ...userWithoutPassword, accessToken };
  }

  async register(dto: RegisterDto) {
    const hashedPassword = await argon.hash(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: hashedPassword,
      },
      select: {
        email: true,
        username: true,
        id: true,
      },
    });

    const accessToken = this.jwtService.sign(user, {
      secret: process.env.SECRET_KEY,
    });

    return { ...user, accessToken };
  }
}
