import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { hash } from 'bcrypt';
import dayjs from 'dayjs';
import request from 'supertest';
import { DataSource } from 'typeorm';

import { AuthService } from '@app/auth/auth.service';
import { Company } from '@app/company/entities/company.entity';
import { CompanyFakerBuilder } from '@app/company/tests/faker-builder/company-faker-builder';
import { CompanyVacancyRepository } from '@app/company_vacancy/company_vacancy.repository';
import { VehicleType } from '@app/vehicle_type/entities/vehicle_type.entity';
import { VehicleTypeFakerBuilder } from '@app/vehicle_type/tests/faker-builder/vehicle_type-faker-builder';
import {
  clearRepositories,
  createNestApplication,
} from '@common/helpers/test-helpers';
import { validateUUIDV4 } from '@common/utils/validate-uuid-v4';

import { CompanyVacancyFakerBuilder } from '../faker-builder/company_vacancy-faker-builder';

describe('Company Vacancy - /company-vacancies (e2e)', () => {
  let app: INestApplication;
  let dbConnection: DataSource;
  let repository: CompanyVacancyRepository;
  let company: Company;
  let vehicleType: VehicleType;
  let authService: AuthService;
  let accessToken: string;

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        dbConnection = moduleRef.get(DataSource);
        repository = moduleRef.get(CompanyVacancyRepository);
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
    company = await dbConnection.manager.save(Company, companyPayload);

    const vehicleTypePayload = VehicleTypeFakerBuilder.aVehicleType()
      .withName('Car')
      .build();
    vehicleType = await dbConnection.manager.save(
      VehicleType,
      vehicleTypePayload,
    );
    const login = await authService.login({
      email: 'auth@auth.com',
      password: '123456',
    });
    accessToken = login.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET company-vacancies (without Bearer)`, async () => {
    const response = await request(app.getHttpServer())
      .get('/company-vacancies')
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body).toEqual({
      message: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  });

  it(`/GET company-vacancies`, async () => {
    const payload = CompanyVacancyFakerBuilder.aCompanyVacancy()
      .withCompanyId(company.id)
      .withVehicleTypeId(vehicleType.id)
      .withQuantity(20)
      .build();
    await repository.save(payload);

    const { body } = await request(app.getHttpServer())
      .get('/company-vacancies')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(validateUUIDV4(body[0].id)).toBeTruthy();
    expect(company.id).toEqual(body[0].company.id);
    expect(company.social_name).toEqual(body[0].company.social_name);
    expect(company.fantasy_name).toEqual(body[0].company.fantasy_name);
    expect(company.email).toEqual(body[0].company.email);

    expect(vehicleType.id).toEqual(body[0].vehicleType.id);
    expect(vehicleType.name).toEqual(body[0].vehicleType.name);

    expect(body[0].quantity).toEqual(payload.quantity);
    expect(body[0].is_active).toEqual(payload.is_active);
    expect(body[0].created_at).toEqual(payload.created_at.toISOString());
    expect(body[0].updated_at).toEqual(payload.updated_at.toISOString());
  });

  it(`/POST company-vacancies (empty response)`, async () => {
    const payload = CompanyVacancyFakerBuilder.aCompanyVacancy()
      .withCompanyId(company.id)
      .withVehicleTypeId(vehicleType.id)
      .withQuantity(30)
      .build();

    const response = await request(app.getHttpServer())
      .post('/company-vacancies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({});
  });

  it(`/POST company-vacancies (UnprocessableEntityException: Vacancy already registered)`, async () => {
    const payload = CompanyVacancyFakerBuilder.aCompanyVacancy()
      .withCompanyId(company.id)
      .withVehicleTypeId(vehicleType.id)
      .withQuantity(20)
      .build();

    await request(app.getHttpServer())
      .post('/company-vacancies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .post('/company-vacancies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Vacancy already registered',
      error: 'Unprocessable Entity',
    });
  });

  it(`/PATCH company-vacancies`, async () => {
    const payload = CompanyVacancyFakerBuilder.aCompanyVacancy()
      .withCompanyId(company.id)
      .withVehicleTypeId(vehicleType.id)
      .withQuantity(20)
      .build();

    await request(app.getHttpServer())
      .post('/company-vacancies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    const created = await request(app.getHttpServer())
      .get('/company-vacancies')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(validateUUIDV4(created.body[0].id)).toBeTruthy();
    expect(created.body[0].quantity).toEqual(expect.any(Number));
    expect(created.body[0].quantity).toEqual(20);
    expect(created.body[0].is_active).toEqual(payload.is_active);
    expect(dayjs(created.body[0].created_at).isValid()).toBeTruthy();
    expect(dayjs(created.body[0].updated_at).isValid()).toBeTruthy();

    const { id } = created.body[0];
    await request(app.getHttpServer())
      .patch(`/company-vacancies/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ quantity: 30 })
      .expect(HttpStatus.NO_CONTENT);

    const updatedCompany = await request(app.getHttpServer())
      .get(`/company-vacancies/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(updatedCompany.body.quantity).toEqual(30);
    expect(dayjs(updatedCompany.body.updated_at).isValid()).toBeTruthy();

    expect(created.body[0].id).toEqual(updatedCompany.body.id);
    expect(created.body[0].is_active).toEqual(updatedCompany.body.is_active);
    expect(created.body[0].created_at).toEqual(updatedCompany.body.created_at);
  });

  it(`/PATCH company-vacancies (NotFoundException: Vacancy not found)`, async () => {
    const response = await request(app.getHttpServer())
      .patch(`/company-vacancies/${faker.datatype.uuid()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ quantity: 10 })
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Vacancy not found',
      error: 'Not Found',
    });
  });

  it(`/DELETE company-vacancies`, async () => {
    const payload = CompanyVacancyFakerBuilder.aCompanyVacancy()
      .withCompanyId(company.id)
      .withVehicleTypeId(vehicleType.id)
      .withQuantity(20)
      .build();

    await request(app.getHttpServer())
      .post('/company-vacancies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .get('/company-vacancies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.OK);

    const { id } = response.body[0];

    const deletedCompany = await request(app.getHttpServer())
      .delete(`/company-vacancies/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NO_CONTENT);

    expect(deletedCompany.body).toEqual({});
  });

  it(`/DELETE company-vacancies (NotFoundException: Vacancy not found)`, async () => {
    const response = await request(app.getHttpServer())
      .delete(`/company-vacancies/${faker.datatype.uuid()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Vacancy not found',
      error: 'Not Found',
    });
  });
});
