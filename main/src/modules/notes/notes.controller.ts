import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesActions } from './notes.actions';

@Controller('notes')
export class NotesController {
  constructor(@Inject('NOTE_SERVICE') private readonly client: ClientProxy) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.client.emit(NotesActions.GET_NOTE, id);
  }

  @Get()
  getAllNotes() {
    return this.client.emit(NotesActions.GET_ALL_NOTES, 'All notes');
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createNote: CreateNoteDto) {
    return this.client.emit(NotesActions.CREATE_NOTE, createNote);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.client.emit(NotesActions.DELETE_NOTE, id);
  }

  @Delete('user/:id')
  deleteAllUsersNodes(@Param('id') id: number) {
    return this.client.emit(NotesActions.DELETE_NOTES_BY_USERID, id);
  }

  @Put()
  update(@Body() updatedNote: CreateNoteDto) {
    return this.client.emit(NotesActions.UPDATE_NOTE, updatedNote);
  }
}
