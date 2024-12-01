import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from '@fastify/helmet';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import fmp = require('@fastify/multipart');
import compression from '@fastify/compress';
import { useContainer } from 'class-validator';
import { camelCase, startCase } from 'lodash';
import { AppModule } from './app.module';
import { CORS_OPTIONS } from './utils/common';
import { Environment } from './utils/validators/env.validation';

async function bootstrap() {
  const adapter = new FastifyAdapter();
  adapter.enableCors(CORS_OPTIONS);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    {
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(Logger));

  await app.register(compression);
  await app.register(helmet);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.register(fmp, {
    limits: {
      fileSize: 100 * 1024 * 1024, // 100mb
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Crypo API Gateway')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const configService = app.get(ConfigService);

  const environment = configService.get('app.nodeEnv');
  if (environment !== Environment.Production) {
    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) => {
        return `${controllerKey
          .toLowerCase()
          .replace('controller', '')}${startCase(camelCase(methodKey)).replace(
          / /g,
          '',
        )}`;
      },
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        displayOperationId: true,
        docExpansion: 'none',
      },
    });
  }

  const port = configService.get('APP_PORT');
  const host = configService.get('APP_IP');

  await app.listen(3000, host);

  console.log(
    `[Api Gateway] Listening on port ${port} on ${await app.getUrl()}`,
  );
}

bootstrap();
