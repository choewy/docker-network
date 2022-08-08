import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  userId: string;

  @Column('text')
  refreshToken: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
