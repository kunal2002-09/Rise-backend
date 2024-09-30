import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import {config} from '../config/config';
import ApiError from '../utils/ApiError';

// Error handler middleware
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
  let { statusCode, message } = err;

  // Default status code and message if not provided
  statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  message = message || 'Something went wrong';

  res.locals.errorMessage = err.message;

  // Response object
  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  // Log error in development mode
  if (config.env === 'development') {
    console.error(err);
  }

  // Send response
  res.status(statusCode).send(response);
};


