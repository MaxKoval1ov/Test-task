import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModule } from './config.root';
import { DatabaseModule } from './database/database.module';
import { MainGateway } from './main.gateway';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, NotesModule, configModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, MainGateway],
})
export class AppModule {}
