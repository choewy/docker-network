import { Body, Controller, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/users/entity/user.entity';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { AuthCheckDecorator } from './decorators/auth-check.decorator';
import { ReissueTokenDecorator } from './decorators/reissue-token';
import { SignInDecorator } from './decorators/signin.decorator';
import { SignUpDecorator } from './decorators/signup.decorator';
import { ReissueTokenDTO } from './dto/reissue-token.dto';
import { SignInUserDTO } from './dto/signin-user.dto';
import { SignUpUserDTO } from './dto/signup-user.dto';

@ApiTags('사용자 인증 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthCheckDecorator()
  async check(@CurrentUser() user: User) {
    return user;
  }

  @SignInDecorator()
  async signin(@Body() body: SignInUserDTO) {
    return await this.authService.signin(body);
  }

  @SignUpDecorator()
  async signup(@Body() body: SignUpUserDTO) {
    return await this.authService.signup(body);
  }

  @ReissueTokenDecorator()
  async refresh(@Req() req: Request, @Body() body: ReissueTokenDTO) {
    const { authorization } = req.headers;
    const bearerToken = (authorization || 'Bearer ').split('Bearer ')[1];
    return await this.authService.reissueAccessToken(bearerToken, body);
  }
}
