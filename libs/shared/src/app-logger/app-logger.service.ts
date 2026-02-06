import { Injectable, LoggerService, Scope } from '@nestjs/common';
import * as winston from 'winston';
import { LogMetadata } from './app-logger.interface';
import { logLevels } from './log-levels';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const isDev = process.env.NODE_ENV === 'development';

    this.logger = winston.createLogger({
      level: logLevels.INFO,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      defaultMeta: { service: 'App' },
      transports: [
        new winston.transports.Console({
          format: isDev
            ? winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(
                  ({ level, message, timestamp, service }: LogMetadata) =>
                    `${timestamp} ${level.toUpperCase()} [${service}] ${message}`,
                ),
                winston.format.colorize({ all: true }),
              )
            : undefined,
        }),
      ],
    });
  }

  setContext(context: string = 'App') {
    this.logger.defaultMeta = { service: context };
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string) {
    this.logger.error(message);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
}
