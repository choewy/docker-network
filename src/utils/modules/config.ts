import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/configs/auth.config';
import serverConfig from 'src/configs/server.config';

const environment = process.env.NODE_ENV;
const envDirPath = process.cwd() + '/dist/configs/env';
const common = `${envDirPath}/.common.env`;
const development = `${envDirPath}/.development.env`;
const production = `${envDirPath}/.production.env`;

export const isDeveloment = () => environment === 'development';
export const isProduction = () => environment === 'production';

const envFiles = () => {
  return isDeveloment() ? [common, development] : [common, production];
};

export const configModule = () => {
  return ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: envFiles(),
    load: [serverConfig, jwtConfig],
  });
};
