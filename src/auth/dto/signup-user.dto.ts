import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidationException } from 'src/utils/exceptions/validation';

export class SignUpUserDTO {
  @ApiProperty()
  @Transform((params) => params.value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @ApiProperty()
  @Transform((params) => params.value.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(60)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  @Transform((params) => {
    const obj: SignUpUserDTO = params.obj;
    if (obj.password !== obj.confirmPassword) {
      throw new ValidationException([
        {
          property: 'confirmPassword',
          constraints: { differentPassword: '' },
        },
      ]);
    }
    return obj.confirmPassword;
  })
  confirmPassword: string;
}
