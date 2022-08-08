import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation';

export const validationPipe = () => {
  return new ValidationPipe({
    transform: true,
    validateCustomDecorators: true,
    dismissDefaultMessages: true,
    whitelist: true,
    validationError: {
      target: true,
      value: false,
    },
    exceptionFactory: (errors: ValidationError[]) => {
      return new ValidationException(errors);
    },
  });
};
