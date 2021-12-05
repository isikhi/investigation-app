import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationErrorResponse } from '@server/core';

export const AppControllerValidationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidUnknownValues: true,
  transformOptions: {
    enableImplicitConversion: true
  },
  exceptionFactory: (errors: ValidationErrorResponse[]) => new BadRequestException(errors)
});
