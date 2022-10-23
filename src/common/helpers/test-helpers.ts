import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

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
  const entities = dataSource.entityMetadatas;

  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.delete({});
  }
}
