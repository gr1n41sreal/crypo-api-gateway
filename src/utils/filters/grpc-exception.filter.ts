import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ErrorStatusMapper } from '../error-status-mapper.util';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    let status: number | string;
    let message: string;
    let error: number | string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseData = exception.getResponse();

      if (
        typeof responseData === 'object' &&
        (Object.prototype.hasOwnProperty.call(responseData, 'message') ||
          Object.prototype.hasOwnProperty.call(responseData, 'error'))
      ) {
        response.status(status).send(responseData);
        return;
      }
    }

    if (
      !Object.prototype.hasOwnProperty.call(exception, 'code') &&
      !Object.prototype.hasOwnProperty.call(exception, 'details')
    ) {
      status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'An unexpected error occurred.';
      error = HttpStatus[status] || 'Unknown Error';

      response.status(+status).send({
        statusCode: status,
        message,
        error,
      });
    }

    const mapper = new ErrorStatusMapper();
    status = mapper.grpcToHttpMapper(exception.code);
    error = HttpStatus[status] || 'Unknown Error';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      message = 'An error occurred while processing a gRPC error.';
    } else {
      try {
        const parsedDetails = JSON.parse(exception.details);
        // check if message string is array
        message = /\[|]/.test(parsedDetails?.message)
          ? JSON.parse(parsedDetails.message)
          : parsedDetails.message ?? parsedDetails;
      } catch {
        message =
          exception.details ||
          JSON.parse(exception.message.split(':').slice(1).join(':')).message;
      }
    }

    response.status(status).send({
      statusCode: status,
      message,
      error,
    });
  }
}
