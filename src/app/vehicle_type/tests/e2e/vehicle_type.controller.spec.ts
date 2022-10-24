import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { hash } from 'bcrypt';
import dayjs from 'dayjs';
import request from 'supertest';
import { DataSource } from 'typeorm';

import { AuthService } from '@app/auth/auth.service';
import { Company } from '@app/company/entities/company.entity';
import { CompanyFakerBuilder } from '@app/company/tests/faker-builder/company-faker-builder';
import { VehicleTypeRepository } from '@app/vehicle_type/vehicle_type.repository';
import {
  clearRepositories,
  createNestApplication,
} from '@common/helpers/test-helpers';
import { validateUUIDV4 } from '@common/utils/validate-uuid-v4';

import { VehicleTypeFakerBuilder } from '../faker-builder/vehicle_type-faker-builder';

describe('Vehicle Type - /vehicle-types (e2e)', () => {
  let app: INestApplication;
  let dbConnection: DataSource;
  let repository: VehicleTypeRepository;
  let authService: AuthService;
  let accessToken: string;

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        dbConnection = moduleRef.get(DataSource);
        repository = moduleRef.get(VehicleTypeRepository);
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
    await dbConnection.manager.save(Company, companyPayload);

    const login = await authService.login({
      email: 'auth@auth.com',
      password: '123456',
    });
    accessToken = login.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET vehicle-types (without Bearer)`, async () => {
    const response = await request(app.getHttpServer())
      .get('/vehicle-types')
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body).toEqual({
      message: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  });

  it(`/GET vehicle-types`, async () => {
    const payload = VehicleTypeFakerBuilder.aVehicleType().build();
    await repository.save(payload);

    const response = await request(app.getHttpServer())
      .get('/vehicle-types')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(validateUUIDV4(response.body[0].id)).toBeTruthy();

    expect(response.body[0].name).toEqual(payload.name);
    expect(response.body[0].is_active).toEqual(payload.is_active);
    expect(response.body[0].created_at).toEqual(
      payload.created_at.toISOString(),
    );
    expect(response.body[0].updated_at).toEqual(
      payload.updated_at.toISOString(),
    );

    expect(response.body[0].deleted_at).toBe(undefined);
  });

  it(`/POST vehicle-types`, async () => {
    const payload = VehicleTypeFakerBuilder.aVehicleType()
      .withName('Bicycle')
      .build();

    const response = await request(app.getHttpServer())
      .post('/vehicle-types')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({});
  });

  it(`/POST vehicle-types (UnprocessableEntityException: Vehicle Type already registered)`, async () => {
    const payload = VehicleTypeFakerBuilder.aVehicleType()
      .withName('Bicycle')
      .build();

    await request(app.getHttpServer())
      .post('/vehicle-types')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .post('/vehicle-types')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Vehicle Type already registered',
      error: 'Unprocessable Entity',
    });
  });

  it(`/PATCH vehicle-types`, async () => {
    const payload = VehicleTypeFakerBuilder.aVehicleType()
      .withName('Bicycle')
      .build();

    await request(app.getHttpServer())
      .post('/vehicle-types')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    const createdVehicleType = await request(app.getHttpServer())
      .get('/vehicle-types')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(validateUUIDV4(createdVehicleType.body[0].id)).toBeTruthy();
    expect(createdVehicleType.body[0].name).toEqual(payload.name);
    expect(createdVehicleType.body[0].is_active).toEqual(payload.is_active);
    expect(dayjs(createdVehicleType.body[0].created_at).isValid()).toBeTruthy();
    expect(dayjs(createdVehicleType.body[0].updated_at).isValid()).toBeTruthy();

    const { id } = createdVehicleType.body[0];
    await request(app.getHttpServer())
      .patch(`/vehicle-types/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: `${payload.name} UPDATED` })
      .expect(HttpStatus.NO_CONTENT);

    const updatedVehicleType = await request(app.getHttpServer())
      .get(`/vehicle-types/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(updatedVehicleType.body.name).toEqual(`${payload.name} UPDATED`);
    expect(dayjs(updatedVehicleType.body.updated_at).isValid()).toBeTruthy();

    expect(createdVehicleType.body[0].id).toEqual(updatedVehicleType.body.id);
    expect(createdVehicleType.body[0].is_active).toEqual(
      updatedVehicleType.body.is_active,
    );
    expect(createdVehicleType.body[0].created_at).toEqual(
      updatedVehicleType.body.created_at,
    );
  });

  it(`/PATCH vehicle-types (NotFoundException: Vehicle Type not found)`, async () => {
    const response = await request(app.getHttpServer())
      .patch(`/vehicle-types/${faker.datatype.uuid()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: `Bicycle UPDATED` })
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Vehicle Type not found',
      error: 'Not Found',
    });
  });

  it(`/DELETE vehicle-types`, async () => {
    const payload = VehicleTypeFakerBuilder.aVehicleType()
      .withName('Bicycle')
      .build();

    await request(app.getHttpServer())
      .post('/vehicle-types')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .get('/vehicle-types')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(HttpStatus.OK);

    const { id } = response.body[0];

    const deletedVehicleType = await request(app.getHttpServer())
      .delete(`/vehicle-types/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NO_CONTENT);

    expect(deletedVehicleType.body).toEqual({});
  });

  it(`/DELETE vehicle-types (NotFoundException: VehicleType not found)`, async () => {
    const response = await request(app.getHttpServer())
      .delete(`/vehicle-types/${faker.datatype.uuid()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Vehicle Type not found',
      error: 'Not Found',
    });
  });
});
