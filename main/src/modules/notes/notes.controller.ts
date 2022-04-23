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
import { lastValueFrom } from 'rxjs';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesActions } from './notes.actions';

@Controller('notes')
export class NotesController {
  constructor(@Inject('NOTES_SERVICE') private readonly client: ClientProxy) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.client.emit(NotesActions.GET_NOTE, id);
  }

  @Get()
  getAllNotes() {
    return lastValueFrom(
      this.client.send(NotesActions.GET_ALL_NOTES, 'All notes'),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createNote: CreateNoteDto) {
    return this.client.send(NotesActions.CREATE_NOTE, createNote).toPromise();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.client.send(NotesActions.DELETE_NOTE, id).toPromise();
  }

  @Delete('user/:id')
  deleteAllUsersNodes(@Param('id') id: number) {
    return this.client
      .send(NotesActions.DELETE_NOTES_BY_USERID, id)
      .toPromise(); //LastValueFrom
  }

  @Get('users/:id')
  getNodesByUserId(@Param('id') id: number) {
    return this.client.send(NotesActions.GET_NOTES_BY_USERID, id).toPromise();
  }

  @Put()
  update(@Body() updatedNote: CreateNoteDto) {
    return this.client.send(NotesActions.UPDATE_NOTE, updatedNote).toPromise();
  }
}
