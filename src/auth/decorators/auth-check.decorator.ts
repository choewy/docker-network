import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpErrorData } from 'src/utils/exceptions/interface';
import { AuthGuard } from 'src/utils/guards/auth.guard';
import { UserData } from '../dto/user-data';

export const AuthCheckDecorator = () => {
  return applyDecorators(
    Get(),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: '인가 확인 API' }),
    ApiOkResponse({ type: UserData, description: '승인 완료' }),
    ApiUnauthorizedResponse({ type: HttpErrorData, description: '인가 실패' }),
    ApiForbiddenResponse({ type: HttpErrorData, description: '토큰 만료' }),
  );
};
