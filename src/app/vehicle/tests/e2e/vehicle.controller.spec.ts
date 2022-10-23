import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import dayjs from 'dayjs';
import request from 'supertest';
import { DataSource } from 'typeorm';

import { VehicleRepository } from '@app/vehicle/vehicle.repository';
import {
  clearRepositories,
  createNestApplication,
} from '@common/helpers/test-helpers';
import { validateUUIDV4 } from '@common/utils/validate-uuid-v4';

import { VehicleFakerBuilder } from '../faker-builder/vehicle-faker-builder';

describe('Vehicle - /vehicles (e2e)', () => {
  let app: INestApplication;
  let dbConnection: DataSource;
  let repository: VehicleRepository;

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        dbConnection = moduleRef.get(DataSource);
        repository = moduleRef.get(VehicleRepository);
      },
    });
  });

  beforeEach(async () => {
    await clearRepositories(dbConnection);
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET vehicles (empty result)`, async () => {
    const response = await request(app.getHttpServer())
      .get('/vehicles')
      .send()
      .expect(HttpStatus.OK);

    expect(response.body).toEqual([]);
  });

  it(`/GET vehicles`, async () => {
    const payload = VehicleFakerBuilder.aVehicle().build();
    await repository.save(payload);

    const response = await request(app.getHttpServer())
      .get('/vehicles')
      .expect(HttpStatus.OK);

    const lastVehiclePayload = payload;
    const firstVehicleResponse = response.body[0];

    expect(validateUUIDV4(firstVehicleResponse.id)).toBeTruthy();

    expect(firstVehicleResponse.type).toEqual(lastVehiclePayload.type);
    expect(firstVehicleResponse.brand).toEqual(lastVehiclePayload.brand);
    expect(firstVehicleResponse.model).toEqual(lastVehiclePayload.model);
    expect(firstVehicleResponse.color).toEqual(lastVehiclePayload.color);
    expect(firstVehicleResponse.license_plate).toEqual(
      lastVehiclePayload.license_plate,
    );
    expect(firstVehicleResponse.passenger_capacity).toEqual(
      lastVehiclePayload.passenger_capacity,
    );
    expect(firstVehicleResponse.is_active).toEqual(
      lastVehiclePayload.is_active,
    );
    expect(firstVehicleResponse.created_at).toEqual(
      lastVehiclePayload.created_at.toISOString(),
    );
    expect(firstVehicleResponse.updated_at).toEqual(
      lastVehiclePayload.updated_at.toISOString(),
    );

    expect(firstVehicleResponse.deleted_at).toBe(undefined);
  });

  it(`/POST vehicles`, async () => {
    const payload = VehicleFakerBuilder.aVehicle()
      .withLicensePlate('ABC1234')
      .build();

    const response = await request(app.getHttpServer())
      .post('/vehicles')
      .send(payload)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({});
  });

  it(`/POST vehicles (UnprocessableEntityException: Vehicle already registered)`, async () => {
    const payload = VehicleFakerBuilder.aVehicle()
      .withLicensePlate('ABC123')
      .build();

    await request(app.getHttpServer())
      .post('/vehicles')
      .send(payload)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .post('/vehicles')
      .send(payload)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Vehicle already registered',
      error: 'Unprocessable Entity',
    });
  });

  it(`/PATCH vehicles`, async () => {
    const payload = VehicleFakerBuilder.aVehicle()
      .withLicensePlate('ABC123')
      .build();

    await request(app.getHttpServer())
      .post('/vehicles')
      .send(payload)
      .expect(HttpStatus.CREATED);

    const createdVehicle = await request(app.getHttpServer())
      .get('/vehicles')
      .expect(HttpStatus.OK);

    expect(validateUUIDV4(createdVehicle.body[0].id)).toBeTruthy();
    expect(createdVehicle.body[0].type).toEqual(payload.type);
    expect(createdVehicle.body[0].brand).toEqual(payload.brand);
    expect(createdVehicle.body[0].model).toEqual(payload.model);
    expect(createdVehicle.body[0].color).toEqual(payload.color);
    expect(createdVehicle.body[0].license_plate).toEqual(payload.license_plate);
    expect(createdVehicle.body[0].passenger_capacity).toEqual(
      payload.passenger_capacity,
    );
    expect(createdVehicle.body[0].is_active).toEqual(payload.is_active);
    expect(dayjs(createdVehicle.body[0].created_at).isValid()).toBeTruthy();
    expect(dayjs(createdVehicle.body[0].updated_at).isValid()).toBeTruthy();

    const { id } = createdVehicle.body[0];
    await request(app.getHttpServer())
      .patch(`/vehicles/${id}`)
      .send({ type: `${payload.type} UPDATED` })
      .expect(HttpStatus.NO_CONTENT);

    const updatedVehicle = await request(app.getHttpServer())
      .get(`/vehicles/${id}`)
      .expect(HttpStatus.OK);

    expect(updatedVehicle.body.type).toEqual(`${payload.type} UPDATED`);
    expect(dayjs(updatedVehicle.body.updated_at).isValid()).toBeTruthy();

    expect(createdVehicle.body[0].id).toEqual(updatedVehicle.body.id);
    expect(createdVehicle.body[0].brand).toEqual(updatedVehicle.body.brand);
    expect(createdVehicle.body[0].model).toEqual(updatedVehicle.body.model);
    expect(createdVehicle.body[0].color).toEqual(updatedVehicle.body.color);
    expect(createdVehicle.body[0].license_plate).toEqual(
      updatedVehicle.body.license_plate,
    );
    expect(createdVehicle.body[0].passenger_capacity).toEqual(
      updatedVehicle.body.passenger_capacity,
    );
    expect(createdVehicle.body[0].is_active).toEqual(
      updatedVehicle.body.is_active,
    );
    expect(createdVehicle.body[0].created_at).toEqual(
      updatedVehicle.body.created_at,
    );
  });

  it(`/PATCH vehicles (NotFoundException: Vehicle not found)`, async () => {
    const response = await request(app.getHttpServer())
      .patch(`/vehicles/${faker.datatype.uuid()}`)
      .send({ type: `${faker.vehicle.type()} UPDATED` })
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Vehicle not found',
      error: 'Not Found',
    });
  });

  it(`/DELETE vehicles`, async () => {
    const payload = VehicleFakerBuilder.aVehicle()
      .withLicensePlate('ABC123')
      .build();

    await request(app.getHttpServer())
      .post('/vehicles')
      .send(payload)
      .expect(HttpStatus.CREATED);

    const response = await request(app.getHttpServer())
      .get('/vehicles')
      .send(payload)
      .expect(HttpStatus.OK);

    const { id } = response.body[0];

    const deletedVehicle = await request(app.getHttpServer())
      .delete(`/vehicles/${id}`)
      .expect(HttpStatus.NO_CONTENT);

    expect(deletedVehicle.body).toEqual({});
  });

  it(`/DELETE vehicles (NotFoundException: Vehicle not found)`, async () => {
    const response = await request(app.getHttpServer())
      .delete(`/vehicles/${faker.datatype.uuid()}`)
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toStrictEqual({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Vehicle not found',
      error: 'Not Found',
    });
  });
});
