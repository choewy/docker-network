import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UserData } from 'src/users/dto/user-data';
import { ReissueTokenDTO } from './dto/reissue-token.dto';
import { SignedTokens } from './dto/signed-tokens';
import { SignInUserDTO } from './dto/signin-user.dto';
import { SignUpUserDTO } from './dto/signup-user.dto';
import { AuthEntity } from './entity/auth.entity';
import { AuthRepository } from './repository/auth.repository';
import authConfig from 'src/configs/auth.config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

type Payload = (jwt.JwtPayload | string) & UserData;

@Injectable()
export class AuthService {
  private readonly salt: number;
  private readonly secret: string;
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private readonly authRepository: AuthRepository,
  ) {
    this.salt = this.config.bcrypt.salt;
    this.secret = this.config.jwt.secret;
  }

  async signup(body: SignUpUserDTO) {
    body.password = await this.hashPassword(body.password);
    const user = await this.authRepository.createUser(body);
    const accessToken = await this.issueAccessToken(user.id);
    const refreshToken = await this.issueRefreshToken(user.id);
    return new SignedTokens(accessToken, refreshToken);
  }

  async signin(body: SignInUserDTO) {
    const { username, password } = body;
    const user = await this.authRepository.getUserByUsername(username);
    const verified = await this.comparePassword(password, user.password);

    if (!verified) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.issueAccessToken(user.id);
    const refreshToken = await this.issueRefreshToken(user.id);
    return new SignedTokens(accessToken, refreshToken);
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, this.salt);
  }

  async comparePassword(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword);
  }

  async verifyAccessToken(bearerToken: string) {
    try {
      const payload = jwt.verify(bearerToken, this.secret) as Payload;
      return await this.authRepository.getUserById(payload.id);
    } catch (e) {
      switch (e.message) {
        case 'jwt expired':
          throw new ForbiddenException();
        default:
          throw new UnauthorizedException();
      }
    }
  }

  async verifyRefreshToken(refreshToken: string) {
    let needReissue = false;
    try {
      jwt.verify(refreshToken, this.secret);
    } catch (e) {
      switch (e.message) {
        case 'jwt expired':
          needReissue = true;
          break;
        default:
          throw new UnauthorizedException();
      }
    }
    return needReissue;
  }

  private async decodeToken(token: string) {
    try {
      return jwt.verify(token, this.secret, {
        ignoreExpiration: true,
      }) as Payload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async issueAccessToken(userId: string) {
    const { accessTokenOptions } = this.config.jwt;
    const payload = { id: userId };
    return jwt.sign(payload, this.secret, accessTokenOptions);
  }

  private async issueRefreshToken(userId: string) {
    const { refreshTokenOptions } = this.config.jwt;
    const payload = { id: userId };
    const refreshToken = jwt.sign(payload, this.secret, refreshTokenOptions);
    await this.authRepository.saveRefreshToken(userId, refreshToken);
    return refreshToken;
  }

  async reissueAccessToken(bearerToken: string, body: ReissueTokenDTO) {
    if (!bearerToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.decodeToken(bearerToken);
    const auth = await this.authRepository.getAuthByRefreshToken(
      body.refreshToken,
    );

    if (!auth || payload.id !== auth.userId) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.issueAccessToken(auth.userId);
    const needReissue = await this.verifyRefreshToken(body.refreshToken);

    const refreshToken = needReissue
      ? await this.reissueRefreshToken(auth)
      : body.refreshToken;

    return new SignedTokens(accessToken, refreshToken);
  }

  private async reissueRefreshToken(auth: AuthEntity) {
    await this.authRepository.deleteRefreshToken(auth.id, auth.userId);
    return await this.issueRefreshToken(auth.userId);
  }
}
