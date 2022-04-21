import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';

import { AuthModule } from './auth/auth.module';
import { configModule } from './config.root';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';

// import { MainGateway } from './main.gateway';
@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, NotesModule, configModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
