import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDTO } from './dto/signin-user.dto';
import { SignUpUserDTO } from './dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() body: SignInUserDTO) {
    return await this.authService.signin(body);
  }

  @Post('signup')
  async signup(@Body() body: SignUpUserDTO) {
    return await this.authService.signup(body);
  }
}
