import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthEntity } from './entity/auth.entity';
import { AuthRepository } from './repository/auth.repository';

const TypeOrm = TypeOrmModule.forFeature([AuthEntity]);

@Module({
  imports: [TypeOrm],
  providers: [AuthRepository, AuthService],
  controllers: [AuthController],
  exports: [TypeOrm, AuthRepository, AuthService],
})
export class AuthModule {}
