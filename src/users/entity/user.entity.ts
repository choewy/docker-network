import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type Roles = 'super' | 'admin' | 'manager';

export interface User {
  readonly id: string;
  username: string;
  email: string;
  password: string;
  role: Roles;
}

@Entity('user')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 30, unique: true })
  username: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: 'manager' })
  role: Roles;
}
