import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { Note } from '../database/models/notes.model';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesActions } from './notes.actions';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @EventPattern(NotesActions.GET_NOTE)
  async getById(@Payload() id: number): Promise<Note> {
    return await this.noteService.getById(id);
  }

  @EventPattern(NotesActions.GET_ALL_NOTES)
  async getAllNotes(): Promise<Note[]> {
    const all = await this.noteService.getAll();
    console.log(all);
    return all;
  }

  @EventPattern(NotesActions.CREATE_NOTE)
  async create(@Payload() createNote: CreateNoteDto): Promise<Note> {
    return await this.noteService.create(createNote);
  }

  @EventPattern(NotesActions.DELETE_NOTE)
  delete(@Payload() id: number): Promise<number> {
    return this.noteService.deleteById(id);
  }

  @EventPattern(NotesActions.DELETE_NOTES_BY_USERID)
  async deleteAllUsersNodes(@Payload('id') id: number): Promise<number> {
    return await this.noteService.deleteByUserId(id);
  }

  @EventPattern(NotesActions.UPDATE_NOTE)
  async update(@Payload() updatedNote: Note) {
    console.log('first');
    return await this.noteService.update(updatedNote);
  }
}
