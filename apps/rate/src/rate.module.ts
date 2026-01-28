import { AppLoggerModule } from '@app/shared';
import { GlobalRpcExceptionFilter } from '@app/shared/error-handling/rpc-exception/rpc-exception.filter';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import * as joi from 'joi';
import * as path from 'path';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { TTlTimes } from '@app/shared/cache/ttl-times';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join('apps', 'rate', '.env'),
      cache: true,
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().port().default(3002),
        COINGECKO_API_KEY: joi.string().min(20).required(),
        COINGECKO_API_BASE_URL: joi
          .string()
          .uri()
          .default('https://api.coingecko.com/api/v3'),
        CRON_ASSET_IDS: joi.string().min(2).required(),
        CRON_CURRENCIES: joi.string().min(2).required(),
      }),
    }),
    AppLoggerModule,
    HttpModule.register({
      timeout: TTlTimes.SECOND * 5,
      maxRedirects: 2,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [RateController],
  providers: [
    RateService,
    {
      provide: APP_FILTER,
      useClass: GlobalRpcExceptionFilter,
    },
  ],
})
export class RateModule {}
