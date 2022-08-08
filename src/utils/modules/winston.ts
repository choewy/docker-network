import { WinstonModule, utilities as nestWinstonUtilities } from 'nest-winston';
import * as winston from 'winston';

export const winstonLogger = () => {
  return WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonUtilities.format.nestLike('ADMIN', {
            prettyPrint: true,
            colors: true,
          }),
        ),
      }),
    ],
  });
};
