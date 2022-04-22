import { NOTES_REPOSITORY } from 'modules/database/constants';

import { Note } from './notes.model';

export const notesProviders = [
  {
    provide: NOTES_REPOSITORY,
    useValue: Note,
  },
];
