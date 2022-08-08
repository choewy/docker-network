import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { configModule } from './utils/modules/config';
import { typeOrmModule } from './utils/modules/typeorm';

@Module({
  imports: [configModule(), typeOrmModule(), UsersModule],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule {}
