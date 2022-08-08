import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { HttpErrorData } from 'src/utils/exceptions/interface';
import { SignedTokens } from '../dto/signed-tokens';
import { SignUpUserDTO } from '../dto/signup-user.dto';

export const SignUpDecorator = () => {
  return applyDecorators(
    Post('signup'),
    ApiOperation({ summary: '회원가입 API' }),
    ApiBody({ type: SignUpUserDTO }),
    ApiConsumes('application/x-www-form-urlencoded', 'application/json'),
    ApiOkResponse({ type: SignedTokens, description: '가입 및 인증 완료' }),
    ApiBadRequestResponse({
      type: HttpErrorData,
      description: '유효성 검사 실패',
    }),
    ApiConflictResponse({ type: HttpErrorData, description: '계정 중복' }),
  );
};
