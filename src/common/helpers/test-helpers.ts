import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, DeleteResult } from 'typeorm';

import { AppModule } from './../../app.module';

export async function createNestApplication({
  onBeforeInit,
}: {
  onBeforeInit: (moduleRef: TestingModule) => void;
}) {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  app.useGlobalPipes(new ValidationPipe());

  onBeforeInit(moduleRef);

  await app.init();

  return app;
}

export async function clearRepositories(dataSource: DataSource) {
  // console.log({ dataSource });
  const entities = dataSource.entityMetadatas;
  const promises: Array<Promise<DeleteResult>> = [];

  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    promises.push(repository.delete({}));
  }

  await Promise.all(promises);
}

// const entities = dataSource.entityMetadatas;
//   for (const entity of entities) {
//     const queryRunner = dataSource.createQueryRunner();
//     await queryRunner.manager.query(`SET FOREIGN_KEY_CHECKS = 0`);
//     // await queryRunner.manager.query(`TRUNCATE \`${entity.tableName}\``);
//     await queryRunner.manager.query(`SET FOREIGN_KEY_CHECKS = 1`);
//   }
