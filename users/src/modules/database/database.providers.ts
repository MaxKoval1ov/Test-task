import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Note } from '../notes/notes.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRESS_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRESS_PASSWORD,
        database: process.env.POSTGRES_DB,
      });
      sequelize.addModels([User, Note]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
