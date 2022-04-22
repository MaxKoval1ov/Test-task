import { NOTES_REPOSITORY } from '../database/constants';

import { Note } from '../database/models/notes.model';

export const notesProviders = [
  {
    provide: NOTES_REPOSITORY,
    useValue: Note,
  },
];
