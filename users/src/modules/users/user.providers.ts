import { USERS_REPOSITORY } from 'modules/database/constants';
import { User } from 'modules/database/models/users.model';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
