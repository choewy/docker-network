import { ApiResponseProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignedTokens {
  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiResponseProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
