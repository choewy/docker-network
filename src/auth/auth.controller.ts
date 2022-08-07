import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/entity/user.entity';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { AuthGuard } from 'src/utils/guard/auth.guard';
import { AuthService } from './auth.service';
import { ReissueTokenDTO } from './dto/reissue-token.dto';
import { SignInUserDTO } from './dto/signin-user.dto';
import { SignUpUserDTO } from './dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard)
  async check(@CurrentUser() user: User) {
    return user;
  }

  @Post('signin')
  async signin(@Body() body: SignInUserDTO) {
    return await this.authService.signin(body);
  }

  @Post('signup')
  async signup(@Body() body: SignUpUserDTO) {
    return await this.authService.signup(body);
  }

  @Post('reissue')
  async refresh(@Req() req: Request, @Body() body: ReissueTokenDTO) {
    const bearerToken = (req.headers.authorization || 'Bearer ').split(
      'Bearer ',
    )[1];
    return body;
  }
}
