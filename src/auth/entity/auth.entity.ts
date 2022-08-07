import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  userId: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;
}
