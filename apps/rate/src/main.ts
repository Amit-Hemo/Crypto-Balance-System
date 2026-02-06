import { AppLoggerService } from '@app/shared';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { RateModule } from './rate.module';

async function bootstrap() {
  const logger = new AppLoggerService();

  const app = await NestFactory.createApplicationContext(RateModule, {
    logger: false,
  });
  const configService = app.get(ConfigService);

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(RateModule, {
      transport: Transport.TCP,
      options: {
        host: configService.get<string>('HOST', 'localhost'),
        port: configService.get<number>('PORT', 3002),
      },
      logger,
    });

  await app.close();

  microservice.useLogger(logger);

  microservice.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (errors) => {
        logger.error(`Validation failed: ${errors}`);
        return new RpcException(new BadRequestException(errors));
      },
    }),
  );

  await microservice.listen();
  logger.log('Rate service is listening for requests.');
}
bootstrap();
