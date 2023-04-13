import { Sequelize } from 'sequelize-typescript';
import { User } from 'apps/auth/src/users/users.model';
import { Profile } from 'apps/profile/src/profile.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'homework4',
      });
      sequelize.addModels([User, Profile]);
      await sequelize.sync();
      return sequelize;
    },
  },
];