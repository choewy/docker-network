import { ApiResponseProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserData {
  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
}
