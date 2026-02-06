import { AppLoggerService } from '@app/shared';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new AppLoggerService();

  const app = await NestFactory.create(AppModule, { logger });

  app.useLogger(logger);

  app.setGlobalPrefix('/api/v1');
  app.enableCors();
  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle('Crypto Balance System')
    .setDescription(
      'The system will allow users to manage their crypto holdings and view current valuations.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (errors) => {
        logger.error(`Validation failed: ${errors}`);
        return new BadRequestException(errors);
      },
    }),
  );

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  await app.listen(PORT, () => {
    logger.log(`Listening on port ${PORT}`);
  });
}
bootstrap();
