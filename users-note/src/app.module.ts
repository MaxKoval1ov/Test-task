import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { configModule } from './config.root';

import { NotesModule } from './notes/notes.module';

@Module({
  imports: [DatabaseModule, NotesModule, configModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
