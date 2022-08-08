import helmet from 'helmet';
import * as express from 'express';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './utils/modules/winston';
import { loggerMiddleware } from './utils/middlewares/logger';
import { ConfigService } from '@nestjs/config';
import { swaggerModule } from './utils/modules/swagger';
import { ServerConfig } from './configs/server.config';
import { validationPipe } from './utils/modules/validation-pipe';

const bootstrap = async () => {
  const logger = winstonLogger();
  const app = await NestFactory.create(AppModule, { logger });
  const config = app.get(ConfigService).get<ServerConfig>('server');

  app.use(helmet());
  app.use(express.json({ limit: config.limit }));
  app.use(
    express.urlencoded({
      limit: config.limit,
      extended: true,
    }),
  );

  app.enableCors(config.cors);
  app.use(loggerMiddleware(new Logger()));
  app.useGlobalGuards();
  app.useGlobalPipes(validationPipe());

  swaggerModule(app);

  await app.listen(config.port, config.host);
};

bootstrap();
