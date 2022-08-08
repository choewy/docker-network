import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { registerAs } from '@nestjs/config';

export interface ServerConfig {
  port: number;
  host: string;
  limit: string;
  cors: CorsOptions;
}

export default registerAs(
  'server',
  (): ServerConfig => ({
    port: Number(process.env.SERVER_PORT),
    host: String(process.env.SERVER_HOST),
    limit: String(process.env.SERVER_LIMIT),
    cors: {
      origin: JSON.parse(process.env.CORS_ORIGINS),
      credentials: Boolean(process.env.CORS_CREDENTIALS),
    },
  }),
);
