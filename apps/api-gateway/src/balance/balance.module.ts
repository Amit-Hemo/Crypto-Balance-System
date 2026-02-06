import { Services } from '@app/shared/general/services.contants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BalanceController } from './balance.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: Services.BALANCE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>(
              'BALANCE_SERVICE_HOST',
              'localhost',
            ),
            port: configService.get<number>('BALANCE_SERVICE_PORT', 3001),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [BalanceController],
})
export class BalanceModule {}
