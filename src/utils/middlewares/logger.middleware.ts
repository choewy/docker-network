import { Logger } from '@nestjs/common';
import { RequestHandler } from '@nestjs/common/interfaces';

export const loggerMiddleware = (logger: Logger): RequestHandler => {
  return (req, res, next) => {
    logger.log('LoggerMiddleware');
    next();
  };
};
