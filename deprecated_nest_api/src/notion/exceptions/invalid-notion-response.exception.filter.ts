import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { InvalidNotionResponseException } from './invalid-notion-response.exception';

@Catch(InvalidNotionResponseException)
export class InvalidNotionResponseExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidNotionResponseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const logger = new Logger();

    logger.error(exception.zodError);

    // Space for Logging
    response.json({
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Invalid Notion response',
    });
  }
}
