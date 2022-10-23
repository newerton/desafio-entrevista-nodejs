import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import dayjs from 'dayjs';
import request from 'supertest';
import { DataSource } from 'typeorm';

import { CompanyRepository } from '@app/company/company.repository';
import {
  clearRepositories,
  createNestApplication,
} from '@common/helpers/test-helpers';
import { validateUUIDV4 } from '@common/utils/validate-uuid-v4';

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

  it(`/PATCH companies (UnprocessableEntityException: Company already registered)`, async () => {
    const payload = CompanyFakeBuilder.aCompany()
      .withEmail('company@company.com')
      .build();

    await request(app.getHttpServer())
      .post('/companies')
      .send(payload)
      .expect(HttpStatus.CREATED);

    const createdCompany = await request(app.getHttpServer())
      .get('/companies')
      .expect(HttpStatus.OK);

    expect(validateUUIDV4(createdCompany.body[0].id)).toBeTruthy();
    expect(createdCompany.body[0].social_name).toBeNull();
    expect(createdCompany.body[0].fantasy_name).toEqual(payload.fantasy_name);
    expect(createdCompany.body[0].email).toEqual('company@company.com');
    expect(createdCompany.body[0].document).toEqual(payload.document);
    expect(createdCompany.body[0].phone).toEqual(payload.phone);
    expect(createdCompany.body[0].is_active).toEqual(payload.is_active);
    expect(dayjs(createdCompany.body[0].created_at).isValid()).toBeTruthy();
    expect(dayjs(createdCompany.body[0].updated_at).isValid()).toBeTruthy();

    const { id } = createdCompany.body[0];
    await request(app.getHttpServer())
      .patch(`/companies/${id}`)
      .send({ social_name: `${payload.social_name} UPDATED` })
      .expect(HttpStatus.NO_CONTENT);

    const updatedCompany = await request(app.getHttpServer())
      .get(`/companies/${id}`)
      .expect(HttpStatus.OK);

    expect(updatedCompany.body.social_name).toEqual(
      `${payload.social_name} UPDATED`,
    );
    expect(dayjs(updatedCompany.body.updated_at).isValid()).toBeTruthy();

    expect(createdCompany.body[0].id).toEqual(updatedCompany.body.id);
    expect(createdCompany.body[0].fantasy_name).toEqual(
      updatedCompany.body.fantasy_name,
    );
    expect(createdCompany.body[0].email).toEqual('company@company.com');
    expect(createdCompany.body[0].document).toEqual(
      updatedCompany.body.document,
    );
    expect(createdCompany.body[0].phone).toEqual(updatedCompany.body.phone);
    expect(createdCompany.body[0].is_active).toEqual(
      updatedCompany.body.is_active,
    );
    expect(createdCompany.body[0].created_at).toEqual(
      updatedCompany.body.created_at,
    );
  });

  it(`/PATCH companies (NotFoundException: Company not found)`, async () => {
    const response = await request(app.getHttpServer())
      .patch(`/companies/${faker.datatype.uuid()}`)
      .send({ social_name: `${faker.company.name()} UPDATED` })
      .expect(HttpStatus.NOT_FOUND);

    await expect(response.body).toStrictEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Company not found',
      error: 'Not Found',
    });
  });
});
