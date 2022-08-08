import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpErrorData } from 'src/utils/exceptions/interface';
import { SignedTokens } from '../dto/signed-tokens';
import { SignInUserDTO } from '../dto/signin-user.dto';

export const SignInDecorator = () => {
  return applyDecorators(
    Post('signin'),
    ApiOperation({ summary: '로그인 API' }),
    ApiBody({ type: SignInUserDTO }),
    ApiConsumes('application/x-www-form-urlencoded', 'application/json'),
    ApiOkResponse({ type: SignedTokens, description: '인증 완료' }),
    ApiBadRequestResponse({
      type: HttpErrorData,
      description: '유효성 검사 실패',
    }),
    ApiUnauthorizedResponse({ type: HttpErrorData, description: '인증 실패' }),
  );
};
