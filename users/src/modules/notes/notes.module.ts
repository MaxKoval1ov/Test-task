import { Module } from '@nestjs/common';
import { DatabaseModule } from 'modules/database/database.module';

import { NotesController } from './notes.controller';
import { notesProviders } from './notes.providers';
import { NotesService } from './notes.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotesController],
  providers: [NotesService, ...notesProviders],
  exports: [NotesService],
})
export class NotesModule {}
