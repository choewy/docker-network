import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/entity/user.entity';
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
    return await this.authRepository.createUser(body);
  }

  async signin(body: SignInUserDTO) {
    const { username, password } = body;
    const user = await this.authRepository.getUserByUsername(username);

    // 비밀번호 유효성 검사

    const payload = { id: user.id };
    return jwt.sign(payload, jwtSecret, {
      expiresIn: '1d',
      audience: 'localhost:3001',
      issuer: 'localhost:3001',
    });
  }

  async verifyToken(bearerToken: string) {
    try {
      const payload = jwt.verify(bearerToken, jwtSecret) as Payload;
      return await this.authRepository.getUserById(payload.id);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
