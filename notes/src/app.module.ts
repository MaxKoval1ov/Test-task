import { Module } from '@nestjs/common';

import { configModule } from './config.root';
import { DatabaseModule } from './database/database.module';
import { MainGateway } from './main.gateway';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, NotesModule, configModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [MainGateway],
})
export class AppModule {}
