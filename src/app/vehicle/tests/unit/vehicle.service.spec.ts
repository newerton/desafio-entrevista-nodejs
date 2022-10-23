import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vehicle } from '@app/vehicle/entities/vehicle.entity';
import { VehicleModule } from '@app/vehicle/vehicle.module';
import { VehicleService } from '@app/vehicle/vehicle.service';
import { databaseConfig } from '@common/config/database';

import { VehicleFakerBuilder } from '../faker-builder/vehicle-faker-builder';

export const throwNotFoundException = (message?: string): never => {
  throw new NotFoundException(message);
};

export const throwUnprocessableEntityException = (message?: string): never => {
  throw new UnprocessableEntityException(message);
};

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfig, synchronize: false }),
        VehicleModule,
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should show an array of vehicles', async () => {
      const result: Vehicle[] = VehicleFakerBuilder.theVehicles(2).build();
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });

    it('should show an empty array of vehicles', async () => {
      const result: Vehicle[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should show a object of vehicle', async () => {
      const result: Vehicle = VehicleFakerBuilder.aVehicle().build();
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await service.findOne('1')).toBe(result);
    });

    it('should throw NotFoundException if vehicle not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vehicle not found'),
        );

      try {
        await service.findOne('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vehicle not found');
      }
    });
  });

  describe('create', () => {
    it('should return an empty response', async () => {
      const request = VehicleFakerBuilder.aVehicle().build();
      jest.spyOn(service, 'create').mockImplementation(async () => undefined);
      expect(await service.create(request)).toBe(undefined);
    });

    it('should throw UnprocessableEntityException if vehicle already registered', async () => {
      const request = VehicleFakerBuilder.aVehicle().build();
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() =>
          throwUnprocessableEntityException('Vehicle already registered'),
        );

      try {
        await service.create(request);
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect(e.message).toBe('Vehicle already registered');
      }
    });
  });

  describe('update', () => {
    it('should return an empty response', async () => {
      const request = VehicleFakerBuilder.aVehicle().build();
      jest.spyOn(service, 'update').mockImplementation(async () => undefined);
      expect(await service.update('1', request)).toBe(undefined);
    });

    it('should throw NotFoundException if vehicle not found', async () => {
      const request = VehicleFakerBuilder.aVehicle().build();
      jest
        .spyOn(service, 'update')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vehicle not found'),
        );

      try {
        await service.update('1', request);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vehicle not found');
      }
    });
  });

  describe('remove', () => {
    it('should return an empty response', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => undefined);
      expect(await service.remove('1')).toBe(undefined);
    });

    it('should throw NotFoundException if vehicle not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vehicle not found'),
        );

      try {
        await service.remove('1');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vehicle not found');
      }
    });
  });
});
