import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    console.log(dto.password);
    return this.authService.login(dto);
  }

  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
