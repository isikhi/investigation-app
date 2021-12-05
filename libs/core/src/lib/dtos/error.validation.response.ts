import { ValidationError } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponse implements ValidationError {
  @ApiProperty()
  readonly target;

  @ApiProperty()
  readonly children: ValidationError[];

  @ApiProperty()
  constraints: { [p: string]: string };

  @ApiProperty()
  property: string;

  @ApiProperty()
  value: any;
}
