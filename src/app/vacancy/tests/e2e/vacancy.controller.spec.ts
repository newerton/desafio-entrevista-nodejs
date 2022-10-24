import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import dayjs from 'dayjs';
import request from 'supertest';
import { DataSource } from 'typeorm';

import { Company } from '@app/company/entities/company.entity';
import { CompanyFakerBuilder } from '@app/company/tests/faker-builder/company-faker-builder';
import { VacancyRepository } from '@app/vacancy/vacancy.repository';
import { Vehicle } from '@app/vehicle/entities/vehicle.entity';
import { VehicleFakerBuilder } from '@app/vehicle/tests/faker-builder/vehicle-faker-builder';
import {
  clearRepositories,
  createNestApplication,
} from '@common/helpers/test-helpers';
import { validateUUIDV4 } from '@common/utils/validate-uuid-v4';

import { VacancyFakerBuilder } from '../faker-builder/vacancy-faker-builder';

describe('Vacancy - /vacancies (e2e)', () => {
  let app: INestApplication;
  let dbConnection: DataSource;
  let repository: VacancyRepository;
  let company: Company;
  let vehicle: Vehicle;

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        dbConnection = moduleRef.get(DataSource);
        repository = moduleRef.get(VacancyRepository);
      },
    });
  });

  beforeEach(async () => {
    await clearRepositories(dbConnection);
    const companyPayload = CompanyFakerBuilder.aCompany().build();
    company = await dbConnection.manager.save(Company, companyPayload);

    const vehiclePayload = VehicleFakerBuilder.aVehicle()
      .withLicensePlate('ABC1234')
      .build();
    vehicle = await dbConnection.manager.save(Vehicle, vehiclePayload);
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET vacancies (empty result)`, async () => {
    const response = await request(app.getHttpServer())
      .get('/vacancies')
      .send()
      .expect(HttpStatus.OK);

    expect(response.body).toEqual([]);
  });

  it(`/GET vacancies`, async () => {
    const payload = VacancyFakerBuilder.aVacancy()
      .withCompanyId(company.id)
      .withVehicleId(vehicle.id)
      .build();
    await repository.save(payload);

    const response = await request(app.getHttpServer())
      .get('/vacancies')
      .expect(HttpStatus.OK);

    expect(validateUUIDV4(response.body[0].id)).toBeTruthy();

    expect(response.body[0].company_id).toEqual(payload.company_id);
    expect(response.body[0].vehicle_id).toEqual(payload.vehicle_id);
    expect(response.body[0].created_at).toEqual(
      payload.created_at.toISOString(),
    );
    expect(response.body[0].updated_at).toEqual(
      payload.updated_at.toISOString(),
    );

    expect(response.body[0].deleted_at).toBe(undefined);
  });

  it(`/POST vacancies`, async () => {
    const payload = VacancyFakerBuilder.aVacancy()
      .withCompanyId(company.id)
      .withVehicleId(vehicle.id)
      .build();

    const response = await request(app.getHttpServer())
      .post('/vacancies')
      .send(payload)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({});
  });

  it(`/POST vacancies (UnprocessableEntityException: Vacancy already registered)`, async () => {
    const payload = VacancyFakerBuilder.aVacancy()
      .withCompanyId(company.id)
      .withVehicleId(vehicle.id)
      .withDateIn('2022-10-22 10:00:00')
      .build();

    await request(app.getHttpServer())
      .post('/vacancies')
      .send(payload)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .post('/vacancies')
      .send(payload)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Vacancy already registered',
      error: 'Unprocessable Entity',
    });
  });

  it(`/PATCH vacancies`, async () => {
    const payload = VacancyFakerBuilder.aVacancy()
      .withCompanyId(company.id)
      .withVehicleId(vehicle.id)
      .build();

    await request(app.getHttpServer())
      .post('/vacancies')
      .send(payload)
      .expect(HttpStatus.CREATED);

    const createdVacancy = await request(app.getHttpServer())
      .get('/vacancies')
      .expect(HttpStatus.OK);

    expect(validateUUIDV4(createdVacancy.body[0].id)).toBeTruthy();
    expect(createdVacancy.body[0].company_id).toEqual(payload.company_id);
    expect(createdVacancy.body[0].vehicle_id).toEqual(payload.vehicle_id);
    expect(
      dayjs(createdVacancy.body[0].date_in).format('YYYY-MM-DD HH:mm'),
    ).toEqual(dayjs(payload.date_in).format('YYYY-MM-DD HH:mm'));
    expect(
      dayjs(createdVacancy.body[0].date_out).format('YYYY-MM-DD HH:mm'),
    ).toEqual(dayjs(payload.date_out).format('YYYY-MM-DD HH:mm'));
    expect(dayjs(createdVacancy.body[0].created_at).isValid()).toBeTruthy();
    expect(dayjs(createdVacancy.body[0].updated_at).isValid()).toBeTruthy();

    const { id } = createdVacancy.body[0];
    const dateUpdated = dayjs();
    await request(app.getHttpServer())
      .patch(`/vacancies/${id}`)
      .send({ date_in: dateUpdated })
      .expect(HttpStatus.NO_CONTENT);

    const updatedVacancy = await request(app.getHttpServer())
      .get(`/vacancies/${id}`)
      .expect(HttpStatus.OK);

    expect(dayjs(updatedVacancy.body.updated_at).isValid()).toBeTruthy();

    expect(
      dayjs(updatedVacancy.body.date_in).format('YYYY-MM-DD HH:mm'),
    ).toEqual(dayjs(dateUpdated).format('YYYY-MM-DD HH:mm'));

    expect(createdVacancy.body[0].id).toEqual(updatedVacancy.body.id);
    expect(createdVacancy.body[0].is_active).toEqual(
      updatedVacancy.body.is_active,
    );
    expect(createdVacancy.body[0].created_at).toEqual(
      updatedVacancy.body.created_at,
    );
  });

  it(`/PATCH vacancies (NotFoundException: Vacancy not found)`, async () => {
    const response = await request(app.getHttpServer())
      .patch(`/vacancies/${faker.datatype.uuid()}`)
      .send({ name: `Bicycle UPDATED` })
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Vacancy not found',
      error: 'Not Found',
    });
  });

  it(`/DELETE vacancies`, async () => {
    const payload = VacancyFakerBuilder.aVacancy()
      .withCompanyId(company.id)
      .withVehicleId(vehicle.id)
      .build();

    await request(app.getHttpServer())
      .post('/vacancies')
      .send(payload)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .get('/vacancies')
      .send(payload)
      .expect(HttpStatus.OK);

    const { id } = response.body[0];

    const deletedVacancy = await request(app.getHttpServer())
      .delete(`/vacancies/${id}`)
      .expect(HttpStatus.NO_CONTENT);

    expect(deletedVacancy.body).toEqual({});
  });

  it(`/DELETE vacancies (NotFoundException: Vacancy not found)`, async () => {
    const response = await request(app.getHttpServer())
      .delete(`/vacancies/${faker.datatype.uuid()}`)
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Vacancy not found',
      error: 'Not Found',
    });
  });
});
