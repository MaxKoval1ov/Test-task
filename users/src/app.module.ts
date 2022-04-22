import { Module } from '@nestjs/common';
import { DatabaseModule } from 'modules/database/database.module';

import { AuthModule } from './modules/auth/auth.module';
import { configModule } from './config.root';
import { NotesModule } from './modules/notes/notes.module';
import { UsersModule } from './modules/users/users.module';

// import { MainGateway } from './main.gateway';
@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, NotesModule, configModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
