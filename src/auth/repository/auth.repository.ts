import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { SignUpUserDTO } from '../dto/signup-user.dto';
import { AuthEntity } from '../entity/auth.entity';

@Injectable()
export class AuthRepository {
  private readonly usersRepository: Repository<UserEntity>;

  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly dataSource: DataSource,
  ) {
    this.usersRepository = dataSource.getRepository(UserEntity);
  }

  async getUserByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: { username },
    });
  }

  async getUserById(userId: string) {
    return await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.username', 'users.email', 'users.role'])
      .where('users.id = :userId', { userId })
      .getOne();
  }

  async createUser(body: SignUpUserDTO) {
    try {
      return await this.usersRepository.save(body);
    } catch (e) {
      switch (e.errno) {
        case 1062:
          throw new ConflictException();
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    return await this.authRepository.save({ userId, refreshToken });
  }

  async deleteRefreshToken(authId: string, userId: string) {
    return await this.authRepository.softDelete({ id: authId, userId });
  }

  async getAuthByRefreshToken(refreshToken: string) {
    return await this.authRepository.findOne({
      where: {
        refreshToken,
      },
    });
  }
}
