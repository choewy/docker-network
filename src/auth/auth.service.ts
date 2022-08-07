import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/entity/user.entity';
import { ReissueTokenDTO } from './dto/reissue-token.dto';
import { SignInUserDTO } from './dto/signin-user.dto';
import { SignUpUserDTO } from './dto/signup-user.dto';
import { AuthRepository } from './repository/auth.repository';

type Payload = (jwt.JwtPayload | string) & User;

const jwtSecret = 'secret';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signup(body: SignUpUserDTO) {
    // PIPE에서 비밀번호 동일 여부 확인 및 암호화 진행
    const user = await this.authRepository.createUser(body);

    const accessToken = await this.issueAccessToken(user.id);
    const refreshToken = await this.issueRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signin(body: SignInUserDTO) {
    const { username, password } = body;
    const user = await this.authRepository.getUserByUsername(username);

    // 비밀번호 유효성 검사

    // 토큰 생성 및 리프레시 토큰 DB 저장
    const accessToken = await this.issueAccessToken(user.id);
    const refreshToken = await this.issueRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(bearerToken: string) {
    try {
      const payload = jwt.verify(bearerToken, jwtSecret) as Payload;
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

  private async decodeToken(token: string) {
    try {
      return jwt.verify(token, jwtSecret, {
        ignoreExpiration: true,
      }) as Payload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async issueAccessToken(userId: string) {
    return jwt.sign({ id: userId }, jwtSecret, {
      expiresIn: '1d',
      audience: 'localhost:3001',
      issuer: 'localhost:3001',
    });
  }

  private async issueRefreshToken(userId: string) {
    // DB에 저장
    const refreshToken = jwt.sign({ id: userId }, jwtSecret, {
      expiresIn: '14d',
      audience: 'localhost:3001',
      issuer: 'localhost:3001',
    });

    return refreshToken;
  }

  private async reissueAccessToken(bearerToken: string, body: ReissueTokenDTO) {
    if (!bearerToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.decodeToken(bearerToken);

    const auth = await this.authRepository.getAuthByRefreshToken(
      body.refreshToken,
    );

    if (!auth) {
      throw new UnauthorizedException();
    }

    if (payload.id !== auth.userId) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.issueAccessToken(auth.userId);

    // 리프레시 토큰 만료 기간 확인 후 리프레시 토큰도 재발행
    let isRefresh = false;

    const refreshToken = isRefresh
      ? await this.reissueRefreshToken()
      : body.refreshToken;

    return {
      accessToken,
      refreshToken,
    };
  }

  private async reissueRefreshToken() {}
}
