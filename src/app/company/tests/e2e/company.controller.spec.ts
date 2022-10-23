import {
  HttpStatus,
  INestApplication,
  UnprocessableEntityException,
} from '@nestjs/common';
import request from 'supertest';
import { DataSource } from 'typeorm';

import { CompanyRepository } from '@app/company/company.repository';
import {
  clearRepositories,
  createNestApplication,
} from '@common/helpers/test-helpers';
import { uuidValidateV4 } from '@common/utils/validate-uuid-v4';

import { CompanyFakeBuilder } from '../company-fake-builder';

describe('Company - /companies (e2e)', () => {
  let app: INestApplication;
  let dbConnection: DataSource;
  let repository: CompanyRepository;

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        dbConnection = moduleRef.get(DataSource);
        repository = moduleRef.get(CompanyRepository);
      },
    });
  });

  beforeEach(async () => {
    await clearRepositories(dbConnection);
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET companies`, async () => {
    const response = await request(app.getHttpServer())
      .get('/companies')
      .send()
      .expect(HttpStatus.OK);

    expect(response.body).toEqual([]);
  });

  it(`/GET 4 companies`, async () => {
    const payload = CompanyFakeBuilder.theCompanies(4).build();
    await repository.save(payload);

    const response = await request(app.getHttpServer())
      .get('/companies')
      .expect(HttpStatus.OK);

    const lastCompanyPayload = payload[3];
    const firstCompanyResponse = response.body[0];

    expect(firstCompanyResponse.id).toEqual(lastCompanyPayload.id);

    expect(firstCompanyResponse.social_name).toEqual(
      lastCompanyPayload.social_name,
    );
    expect(firstCompanyResponse.fantasy_name).toEqual(
      lastCompanyPayload.fantasy_name,
    );
    expect(firstCompanyResponse.email).toEqual(lastCompanyPayload.email);
    expect(firstCompanyResponse.email_verified).toEqual(
      lastCompanyPayload.email_verified,
    );
    expect(firstCompanyResponse.document).toEqual(lastCompanyPayload.document);
    expect(firstCompanyResponse.phone).toEqual(lastCompanyPayload.phone);
    expect(firstCompanyResponse.is_active).toEqual(
      lastCompanyPayload.is_active,
    );
    expect(firstCompanyResponse.created_at).toEqual(
      lastCompanyPayload.created_at.toISOString(),
    );
    expect(firstCompanyResponse.updated_at).toEqual(
      lastCompanyPayload.updated_at.toISOString(),
    );

    expect(firstCompanyResponse.password).toBe(undefined);
    expect(firstCompanyResponse.deleted_at).toBe(undefined);
  });

  it(`/POST companies`, async () => {
    const payload = CompanyFakeBuilder.aCompany()
      .withEmail('company@company.com')
      .build();

    const response = await request(app.getHttpServer())
      .post('/companies')
      .send(payload)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({});
  });

  it(`/POST companies (UnprocessableEntityException: Company already registered)`, async () => {
    const payload = CompanyFakeBuilder.aCompany()
      .withEmail('company@company.com')
      .build();

    await request(app.getHttpServer())
      .post('/companies')
      .send(payload)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .post('/companies')
      .send(payload)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    await expect(response.body).toStrictEqual({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Company already registered',
      error: 'Unprocessable Entity',
    });
  });
});
