import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger';
import { InvestigationSearchRequestDto, InvestigationSearchResponseDto, ValidationErrorResponse } from '@server/core';

export function PostInvestigationUpload() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiOperation({
      summary: 'Upload investigation csv file'
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          files: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            }
          }
        }
      }
    }),
    ApiBadRequestResponse({ type: ValidationErrorResponse }),
    ApiCreatedResponse({
      schema: {
        allOf: [
          {
            properties: {
              data: {
                type: 'string'
              }
            }
          }
        ]
      }
    })
  );
}

export function GetInvestigations() {
  return applyDecorators(
    ApiOperation({ description: 'Search in investigation' }),
    ApiBody({
      type: InvestigationSearchRequestDto,
      required: true
    }),
    ApiBadRequestResponse({ type: ValidationErrorResponse }),
    ApiOkResponse({ type: InvestigationSearchResponseDto })
  );
}
