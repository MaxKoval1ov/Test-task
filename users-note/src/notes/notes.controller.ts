import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './notes.model';
import { NotesService } from './notes.service';

@ApiTags('Заметки')
@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get(':id')
  getById(@Param('id') id: string): Promise<Note> {
    return this.noteService.getById(id);
  }

  @Get()
  getAllNotes(): Promise<Note[]> {
    return this.noteService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createNote: CreateNoteDto): Promise<Note> {
    return this.noteService.create(createNote);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<number> {
    return this.noteService.deleteById(id);
  }

  @Delete('user/:id')
  deleteAllUsersNodes(@Param('id') id: number): Promise<number> {
    return this.noteService.deleteByUserId(id);
  }

  @Put()
  update(@Body() updatedNote: Note) {
    return this.noteService.update(updatedNote);
  }
}
