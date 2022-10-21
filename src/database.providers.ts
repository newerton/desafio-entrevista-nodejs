import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import databaseConfig from '@common/config/database';

const logger = new Logger('TypeORM DataSource');

export const dataSource = new DataSource(databaseConfig);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource
        .initialize()
        .then((response) => {
          logger.log('TypeORM DataSource initialized');
          return response;
        })
        .catch((error) => console.log(error));
    },
  },
];
