import { Inject, Injectable } from '@nestjs/common';
import { NOTES_REPOSITORY } from 'modules/database/constants';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './notes.model';

@Injectable()
export class NotesService {
  constructor(@Inject(NOTES_REPOSITORY) private noteRepository: typeof Note) {}

  async getAll(): Promise<Note[]> {
    return await this.noteRepository.findAll();
  }

  async getByUserId(userId: string): Promise<Note[]> {
    return await this.noteRepository.findAll({ where: { userId } });
  }

  async getById(id: string): Promise<Note> {
    return await this.noteRepository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<number> {
    return await this.noteRepository.destroy({ where: { id } });
  }

  async deleteByUserId(userId: number): Promise<number> {
    return await this.noteRepository.destroy({ where: { userId } });
  }

  async update(
    newNote: Note,
  ) /* : Promise<{ note: Note; created: boolean }> */ {
    const foundNote = await this.noteRepository.findOne({
      where: { id: newNote.id },
    });
    if (!foundNote) {
      const note = await this.noteRepository.create(newNote);
      return { note, created: true };
    }
    const note = await this.noteRepository.update(newNote, {
      where: { id: newNote.id },
    });
    return { note, created: false };
  }

  async create(dto: CreateNoteDto) {
    return await this.noteRepository.create(dto);
  }
}
