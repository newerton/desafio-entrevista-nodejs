import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleType } from '@app/vehicle_type/entities/vehicle_type.entity';
import { VehicleTypeModule } from '@app/vehicle_type/vehicle_type.module';
import { VehicleTypeService } from '@app/vehicle_type/vehicle_type.service';
import { databaseConfig } from '@common/config/database';

import { VehicleTypeFakerBuilder } from '../faker-builder/vehicle_type-faker-builder';

export const throwNotFoundException = (message?: string): never => {
  throw new NotFoundException(message);
};

export const throwUnprocessableEntityException = (message?: string): never => {
  throw new UnprocessableEntityException(message);
};

describe('VehicleTypeService', () => {
  let service: VehicleTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfig, synchronize: false }),
        VehicleTypeModule,
      ],
    }).compile();

    service = module.get<VehicleTypeService>(VehicleTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should show an array of vehicle types', async () => {
      const result: VehicleType[] =
        VehicleTypeFakerBuilder.theVehicleTypes(2).build();
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });

    it('should show an empty array of vehicle types', async () => {
      const result: VehicleType[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should show a object of vehicle type', async () => {
      const result: VehicleType =
        VehicleTypeFakerBuilder.aVehicleType().build();
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await service.findOne('1')).toBe(result);
    });

    it('should throw NotFoundException if vehicle type not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vehicle Type not found'),
        );

      try {
        await service.findOne('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vehicle Type not found');
      }
    });
  });

  describe('create', () => {
    it('should return an empty response', async () => {
      const request = VehicleTypeFakerBuilder.aVehicleType().build();
      jest.spyOn(service, 'create').mockImplementation(async () => undefined);
      expect(await service.create(request)).toBe(undefined);
    });

    it('should throw UnprocessableEntityException if vehicle type already registered', async () => {
      const request = VehicleTypeFakerBuilder.aVehicleType().build();
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() =>
          throwUnprocessableEntityException('Vehicle Type already registered'),
        );

      try {
        await service.create(request);
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect(e.message).toBe('Vehicle Type already registered');
      }
    });
  });

  describe('update', () => {
    it('should return an empty response', async () => {
      const request = VehicleTypeFakerBuilder.aVehicleType().build();
      jest.spyOn(service, 'update').mockImplementation(async () => undefined);
      expect(await service.update('1', request)).toBe(undefined);
    });

    it('should throw NotFoundException if vehicle type not found', async () => {
      const request = VehicleTypeFakerBuilder.aVehicleType().build();
      jest
        .spyOn(service, 'update')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vehicle Type not found'),
        );

      try {
        await service.update('1', request);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vehicle Type not found');
      }
    });
  });

  describe('remove', () => {
    it('should return an empty response', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => undefined);
      expect(await service.remove('1')).toBe(undefined);
    });

    it('should throw NotFoundException if vehicle type not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vehicle Type not found'),
        );

      try {
        await service.remove('1');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vehicle Type not found');
      }
    });
  });
});
