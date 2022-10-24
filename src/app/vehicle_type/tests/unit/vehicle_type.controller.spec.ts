import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleType } from '@app/vehicle_type/entities/vehicle_type.entity';
import { VehicleTypeController } from '@app/vehicle_type/vehicle_type.controller';
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

describe('VehicleTypeController', () => {
  let controller: VehicleTypeController;
  let service: VehicleTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfig, synchronize: false }),
        VehicleTypeModule,
      ],
    }).compile();

    controller = module.get<VehicleTypeController>(VehicleTypeController);
    service = module.get<VehicleTypeService>(VehicleTypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vehicle types', async () => {
      const result: VehicleType[] =
        VehicleTypeFakerBuilder.theVehicleTypes(2).build();
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });

    it('should return an empty array', async () => {
      const result: VehicleType[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a object of vehicle type', async () => {
      const result: VehicleType =
        VehicleTypeFakerBuilder.aVehicleType().build();
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne('valid_uuid')).toBe(result);
    });

    it('should throw NotFoundException if vehicle type not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vehicle Type not found'),
        );

      try {
        await controller.findOne('valid_uuid');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vehicle Type not found');
      }
    });
  });

  describe('create', () => {
    it('should return an empty response', async () => {
      const request = VehicleTypeFakerBuilder.aVehicleType().build();
      const result = undefined;
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(request)).toBe(result);
    });

    it('should throw UnprocessableEntityException if vehicle type already registered', async () => {
      const request = VehicleTypeFakerBuilder.aVehicleType().build();
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() =>
          throwUnprocessableEntityException('Vehicle Type already registered'),
        );

      try {
        await controller.create(request);
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect(e.message).toBe('Vehicle Type already registered');
      }
    });
  });

  describe('update', () => {
    it('should return an empty response', async () => {
      const request = VehicleTypeFakerBuilder.aVehicleType().build();
      const result = undefined;
      jest.spyOn(service, 'update').mockImplementation(async () => result);

      expect(await controller.update('valid_uuid', request)).toBe(result);
    });

    it('should throw NotFoundException if vehicle type not found', async () => {
      const request = VehicleTypeFakerBuilder.aVehicleType().build();
      jest
        .spyOn(service, 'update')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vehicle Type not found'),
        );

      try {
        await controller.update('valid_uuid', request);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vehicle Type not found');
      }
    });
  });

  describe('remove', () => {
    it('should return an empty response', async () => {
      const result = undefined;
      jest.spyOn(service, 'remove').mockImplementation(async () => result);

      expect(await controller.remove('valid_uuid')).toBe(result);
    });

    it('should throw NotFoundException if vehicle type not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vehicle Type not found'),
        );

      try {
        await controller.remove('valid_uuid');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vehicle Type not found');
      }
    });
  });
});
