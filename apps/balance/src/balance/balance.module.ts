import { AppLoggerModule } from '@app/shared';
import { Services } from '@app/shared/general/services.contants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetModule } from '../asset/asset.module';
import { Asset } from '../entities/Asset';
import { Balance } from '../entities/Balance';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: Services.RATE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'rate-service',
            port: configService.get<number>('RATE_SERVICE_PORT', 3002),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    AppLoggerModule,
    TypeOrmModule.forFeature([Balance, Asset]),
    AssetModule,
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}
