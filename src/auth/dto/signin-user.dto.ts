import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInUserDTO {
  @ApiProperty()
  @MaxLength(30)
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  @Transform((params) => params.value.trim())
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  password: string;
}
