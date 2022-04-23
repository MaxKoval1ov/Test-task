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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesActions } from './notes.actions';

@ApiTags('Заметки')
@Controller('notes')
export class NotesController {
  constructor(@Inject('NOTES_SERVICE') private readonly client: ClientProxy) {}

  @ApiOperation({ summary: 'Получить заметку по её id' })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.client.emit(NotesActions.GET_NOTE, id);
  }

  @ApiOperation({ summary: 'Получить все заметки' })
  @Get()
  getAllNotes() {
    return lastValueFrom(
      this.client.send(NotesActions.GET_ALL_NOTES, 'All notes'),
    );
  }

  @ApiOperation({ summary: 'Добавить заметку' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createNote: CreateNoteDto) {
    return this.client.send(NotesActions.CREATE_NOTE, createNote).toPromise();
  }

  @ApiOperation({ summary: 'Удалить заметку' })
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

  @ApiOperation({ summary: 'Получить все заметки выбранного пользователя' })
  @Get('users/:id')
  getNodesByUserId(@Param('id') id: number) {
    return this.client.send(NotesActions.GET_NOTES_BY_USERID, id).toPromise();
  }

  @ApiOperation({ summary: 'Обновить заметку' })
  @Put()
  update(@Body() updatedNote: CreateNoteDto) {
    return this.client.send(NotesActions.UPDATE_NOTE, updatedNote).toPromise();
  }
}
