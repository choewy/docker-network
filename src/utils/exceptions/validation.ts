import { BadRequestException, ValidationError } from '@nestjs/common';

export interface ValidationErrors {
  [key: string]: string[];
}

export class ValidationException extends BadRequestException {
  private readonly __errors: ValidationErrors;

  constructor(errors: ValidationError[]) {
    super();
    errors.forEach((error) => {
      this.__errors[error.property] = Object.keys(error.constraints);
    });
  }

  get errors() {
    return this.__errors;
  }
}
