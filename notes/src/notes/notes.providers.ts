import { NOTES_REPOSITORY } from 'database/constants';

import { Note } from './notes.model';

export const notesProviders = [
  {
    provide: NOTES_REPOSITORY,
    useValue: Note,
  },
];
