import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// @ts-ignore
import * as morgan from 'morgan';
import { urlencoded, json } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UnauthorizedExceptionFilter } from 'auth/exceptions/unauthorized.expection.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Purple Parrot')
    .setDescription('API of Purple Parrot')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_, methodKey) => methodKey,
  });
  SwaggerModule.setup('api', app, document);

  app.use(morgan('combined'));
  await app.listen(3001);
}
bootstrap();
