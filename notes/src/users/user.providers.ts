import { USERS_REPOSITORY } from 'database/constants';
import { User } from './users.model';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
