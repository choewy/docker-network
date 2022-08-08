import { registerAs } from '@nestjs/config';

export interface TokenConfig {
  secret: string;
  expiresIn: string;
  audience: string;
  subject: string;
  issuer: string;
}

export interface JwtTokenConfig {
  accessToken: TokenConfig;
  refreshToken: TokenConfig;
}

export default registerAs(
  'jwt',
  (): JwtTokenConfig => ({
    accessToken: {
      secret: String(process.env.JWT_SECRET),
      expiresIn: String(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
      audience: String(process.env.JWT_AUDIENCE),
      subject: String(process.env.JWT_SUBJECT),
      issuer: String(process.env.JWT_ISSUER),
    },
    refreshToken: {
      secret: String(process.env.JWT_SECRET),
      expiresIn: String(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
      audience: String(process.env.JWT_AUDIENCE),
      subject: String(process.env.JWT_SUBJECT),
      issuer: String(process.env.JWT_ISSUER),
    },
  }),
);
