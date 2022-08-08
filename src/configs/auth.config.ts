import { registerAs } from '@nestjs/config';

export interface TokenOptions {
  expiresIn: string;
  audience: string;
  subject: string;
  issuer: string;
}

export interface AuthConfig {
  jwt: {
    secret: string;
    accessTokenOptions: TokenOptions;
    refreshTokenOptions: TokenOptions;
  };
  bcrypt: {
    salt: number;
  };
}

export default registerAs(
  'auth',
  (): AuthConfig => ({
    jwt: {
      secret: String(process.env.JWT_SECRET),
      accessTokenOptions: {
        expiresIn: String(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
        audience: String(process.env.JWT_AUDIENCE),
        subject: String(process.env.JWT_SUBJECT),
        issuer: String(process.env.JWT_ISSUER),
      },
      refreshTokenOptions: {
        expiresIn: String(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
        audience: String(process.env.JWT_AUDIENCE),
        subject: String(process.env.JWT_SUBJECT),
        issuer: String(process.env.JWT_ISSUER),
      },
    },
    bcrypt: {
      salt: Number(process.env.BCRYPT_SALT),
    },
  }),
);
