import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { typeOrmModule } from './utils/tools/typeorm';

@Module({
  imports: [typeOrmModule(), UsersModule],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule {}
