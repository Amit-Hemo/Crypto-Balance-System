import { AppLoggerService } from '@app/shared';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const logger = new AppLoggerService();

  const app = await NestFactory.createApplicationContext(UserModule, {
    logger: false,
  });
  const configService = app.get(ConfigService);

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
      transport: Transport.TCP,
      options: {
        host: configService.get<string>('HOST', 'localhost'),
        port: configService.get<number>('PORT', 3003),
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
  logger.log('User service is listening for requests.');
}
bootstrap();
