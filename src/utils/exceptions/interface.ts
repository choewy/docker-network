import { ApiResponseProperty } from '@nestjs/swagger';

export class HttpErrorData {
  @ApiResponseProperty()
  statusCode: number;

  @ApiResponseProperty()
  message: string;
}
