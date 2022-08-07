import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmModule = () => {
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 5001,
    username: 'root',
    password: 'password',
    database: 'service',
    entities: [process.cwd() + '/dist/**/*.entity.{ts,js}'],
    migrations: [process.cwd() + '/dist/**/migrations/*.js'],
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: true,
  });
};
