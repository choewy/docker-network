import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './utils/tools/winston';
import { loggerMiddleware } from './utils/middlewares/logger.middleware';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger(),
  });

  app.use(loggerMiddleware(new Logger()));

  /* 
    (global)UserGuard
    => AuthGuard 
    => RolesGuard 
  */
  app.useGlobalGuards();

  await app.listen(3001, '0.0.0.0');
};

bootstrap();
