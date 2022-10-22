import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { IbgeConnectorModule } from '@common/libs/ibge/src';

import { IbgeStateFixture } from '../../fixtures';
import { IbgeStateModule } from '../../ibge-state.module';

describe('IbgeState (e2e)', () => {
  let app: INestApplication;
  const service = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [IbgeConnectorModule, IbgeStateModule],
    })
      .overrideProvider(service)
      .useValue(service)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`/GET ibge/states`, () => {
    it('should show an array of states', async () => {
      const keys = IbgeStateFixture.keys();
      return request(app.getHttpServer())
        .get('/ibge/states')
        .expect(200)
        .then((data) => {
          const firstResult = data.body[0];
          expect(Object.keys(firstResult)).toStrictEqual(keys);
          expect(firstResult.id).toEqual(expect.any(Number));
          expect(firstResult.nome).toEqual(expect.any(String));
        });
    });
  });

  describe(`/GET ibge/states/:id`, () => {
    it('should show a object of states', async () => {
      const keys = IbgeStateFixture.keys();
      return request(app.getHttpServer())
        .get('/ibge/states/11')
        .expect(200)
        .then((data) => {
          expect(Object.keys(data.body)).toStrictEqual(keys);
          expect(data.body.id).toEqual(expect.any(Number));
          expect(data.body.nome).toEqual(expect.any(String));
        });
    });

    it('should show a empty object if param id is invalid number', async () => {
      return request(app.getHttpServer())
        .get('/ibge/states/99999')
        .expect(200)
        .expect([]);
    });

    it('should return a bad request if the id is string', async () => {
      const response = await request(app.getHttpServer()).get(
        '/ibge/states/aaa',
      );

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toEqual(
        'Validation failed (numeric string is expected)',
      );
      expect(response.body.error).toEqual('Bad Request');
    });
  });
});
