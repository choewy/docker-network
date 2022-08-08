import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation';

export const validationPipe = () => {
  return new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    validateCustomDecorators: true,
    dismissDefaultMessages: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    validationError: {
      target: true,
      value: false,
    },
    exceptionFactory: (errors: ValidationError[]) => {
      return new ValidationException(errors);
    },
  });
};
