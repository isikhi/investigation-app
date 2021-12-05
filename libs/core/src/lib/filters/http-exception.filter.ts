import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { ValidationErrorResponse } from '../dtos';


@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let errorResponse = {};
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'Oops! An unexpected situation happened. We have informed about the situation, please try again later.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorResponse = exception.getResponse() || {};
    }
    if(status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(exception, exception.stack)
    }
    const validationErrorPayload = plainToInstance(ValidationErrorResponse, errorResponse);
    const errorMetaData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url
    };
    response.status(status).json({
      message,
      ...validationErrorPayload,
      ...errorMetaData
    });
  }
}
