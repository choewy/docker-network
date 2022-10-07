import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

const PORT = 3001;
const HOST = '::';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.use(
    json({
      limit: '2GB',
    }),
  );

  app.use(
    urlencoded({
      limit: '2GB',
      extended: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(PORT, HOST);
};

bootstrap();
