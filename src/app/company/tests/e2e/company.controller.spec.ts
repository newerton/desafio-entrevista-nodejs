import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { hash } from 'bcrypt';
import dayjs from 'dayjs';
import request from 'supertest';
import { DataSource } from 'typeorm';

import { AuthService } from '@app/auth/auth.service';
import { CompanyRepository } from '@app/company/company.repository';
import { Company } from '@app/company/entities/company.entity';
import {
  clearRepositories,
  createNestApplication,
} from '@common/helpers/test-helpers';
import { validateUUIDV4 } from '@common/utils/validate-uuid-v4';

import { CompanyFakerBuilder } from '../faker-builder/company-faker-builder';
import { CompanyAddressFakerBuilder } from '../faker-builder/company_address-faker-builder';

describe('Company - /companies (e2e)', () => {
  let app: INestApplication;
  let dbConnection: DataSource;
  let repository: CompanyRepository;
  let authService: AuthService;
  let accessToken: string;

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        dbConnection = moduleRef.get(DataSource);
        repository = moduleRef.get(CompanyRepository);
        authService = moduleRef.get(AuthService);
      },
    });
  });

  beforeEach(async () => {
    await clearRepositories(dbConnection);
    const password = await hash('123456', 8);
    const companyPayload = CompanyFakerBuilder.aCompany()
      .withEmail('auth@auth.com')
      .withPassword(password)
      .build();
    await repository.save(companyPayload);

    const login = await authService.login({
      email: 'auth@auth.com',
      password: '123456',
    });
    accessToken = login.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET companies (without Bearer)`, async () => {
    const response = await request(app.getHttpServer())
      .get('/companies')
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body).toEqual({
      message: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  });

  it(`/GET companies`, async () => {
    const payload = CompanyFakerBuilder.aCompany().build();
    await repository.save(payload);

    const response = await request(app.getHttpServer())
      .get('/companies')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    const lastCompanyPayload = payload;
    const firstCompanyResponse = response.body[0];

    expect(validateUUIDV4(firstCompanyResponse.id)).toBeTruthy();

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
    const payload = CompanyFakerBuilder.aCompany()
      .withEmail('company@company.com')
      .build();

    const response = await request(app.getHttpServer())
      .post('/companies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({});
  });

  it(`/POST companies (with address)`, async () => {
    const address = CompanyAddressFakerBuilder.aAddress().build();

    const company = CompanyFakerBuilder.aCompany()
      .withEmail('company@company.com')
      .withAddress(address)
      .build();

    await request(app.getHttpServer())
      .post('/companies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(company)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .get('/companies')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(validateUUIDV4(response.body[0].id)).toBeTruthy();
    expect(response.body[0].social_name).toBeNull();
    expect(response.body[0].fantasy_name).toEqual(company.fantasy_name);
    expect(response.body[0].email).toEqual('company@company.com');
    expect(response.body[0].document).toEqual(company.document);
    expect(response.body[0].phone).toEqual(company.phone);
    expect(response.body[0].is_active).toEqual(company.is_active);
    expect(dayjs(response.body[0].created_at).isValid()).toBeTruthy();
    expect(dayjs(response.body[0].updated_at).isValid()).toBeTruthy();

    // Address
    const companyAddress = response.body[0].address;
    expect(companyAddress.zipcode).toEqual(address.zipcode);
  });

  it(`/POST companies (UnprocessableEntityException: Company already registered)`, async () => {
    const payload = CompanyFakerBuilder.aCompany()
      .withEmail('company@company.com')
      .build();

    await request(app.getHttpServer())
      .post('/companies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .post('/companies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Company already registered',
      error: 'Unprocessable Entity',
    });
  });

  it(`/PATCH companies`, async () => {
    const payload = CompanyFakerBuilder.aCompany()
      .withEmail('company@company.com')
      .build();

    await request(app.getHttpServer())
      .post('/companies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    const createdCompany = await request(app.getHttpServer())
      .get('/companies')
      .set('Authorization', `Bearer ${accessToken}`)
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
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ social_name: `${payload.social_name} UPDATED` })
      .expect(HttpStatus.NO_CONTENT);

    const updatedCompany = await request(app.getHttpServer())
      .get(`/companies/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
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
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ social_name: `${faker.company.name()} UPDATED` })
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Company not found',
      error: 'Not Found',
    });
  });

  it(`/DELETE companies`, async () => {
    const payload = CompanyFakerBuilder.aCompany()
      .withEmail('company@company.com')
      .build();

    await request(app.getHttpServer())
      .post('/companies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .get('/companies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.OK);

    const { id } = response.body[0];

    const deletedCompany = await request(app.getHttpServer())
      .delete(`/companies/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NO_CONTENT);

    expect(deletedCompany.body).toEqual({});
  });

  it(`/DELETE companies (NotFoundException: Company not found)`, async () => {
    const response = await request(app.getHttpServer())
      .delete(`/companies/${faker.datatype.uuid()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Company not found',
      error: 'Not Found',
    });
  });
});
