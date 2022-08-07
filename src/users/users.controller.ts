import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { AuthGuard } from 'src/utils/guard/auth.guard';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers(@CurrentUser() user: User) {
    return user;
  }
}
