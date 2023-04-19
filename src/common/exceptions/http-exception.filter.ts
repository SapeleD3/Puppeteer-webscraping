import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    Logger.error({
      request: {
        path: request.path,
        method: request.method,
      },
      code: status,
      error: exception,
      message: exception.message,
    });

    response.status(status).json({
      status,
      message: exception.message,
      data: null,
    });
  }
}
