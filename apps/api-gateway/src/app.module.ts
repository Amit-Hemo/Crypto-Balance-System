import { AppLoggerModule } from '@app/shared';
import { TTlTimes } from '@app/shared/cache/ttl-times';
import { AllExceptionsFilter } from '@app/shared/error-handling/http-exception/http-exception.filter';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import * as joi from 'joi';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { BalanceModule } from './balance/balance.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join('apps', 'api-gateway', '.env'),
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().port().default(3000),
        BALANCE_SERVICE_HOST: joi.string().trim().min(1).default('localhost'),
        USER_SERVICE_HOST: joi.string().trim().min(1).default('localhost'),
        BALANCE_SERVICE_PORT: joi.number().port().default(3001),
        USER_SERVICE_PORT: joi.number().port().default(3003),
        JWT_SECRET: joi.string().trim().base64(),
      }),
    }),
    AppLoggerModule,
    BalanceModule,
    UserModule,
    AuthModule,
    CacheModule.register({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: TTlTimes.MINUTE * 15,
        limit: 100,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
