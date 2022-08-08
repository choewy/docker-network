import { applyDecorators, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpErrorData } from 'src/utils/exceptions/interface';
import { ReissueTokenDTO } from '../dto/reissue-token.dto';
import { SignedTokens } from '../dto/signed-tokens';

export const ReissueTokenDecorator = () => {
  return applyDecorators(
    Put('reissue'),
    ApiBearerAuth(),
    ApiOperation({ summary: '토큰 갱신 API' }),
    ApiBody({ type: ReissueTokenDTO }),
    ApiConsumes('application/x-www-form-urlencoded', 'application/json'),
    ApiOkResponse({ type: SignedTokens, description: '갱신 완료' }),
    ApiUnauthorizedResponse({ type: HttpErrorData, description: '인가 실패' }),
  );
};
