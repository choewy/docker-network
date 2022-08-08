import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const name = 'choewy';
const github = 'https://github.com/choewy';
const email = 'choewy32@gmail.com';

export const swaggerModule = (app: INestApplication) => {
  const builder = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('관리자 사이트 API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .setContact(name, github, email)
    .build();

  const swagger = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('docs', app, swagger);
};
