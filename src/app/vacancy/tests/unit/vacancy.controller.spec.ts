import { faker } from '@faker-js/faker';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vacancy } from '@app/vacancy/entities/vacancy.entity';
import { VacancyController } from '@app/vacancy/vacancy.controller';
import { VacancyModule } from '@app/vacancy/vacancy.module';
import { VacancyService } from '@app/vacancy/vacancy.service';
import { JwtData } from '@common/auth/jwt/jwt.strategy';
import { databaseConfig } from '@common/config/database';

import { VacancyFakerBuilder } from '../faker-builder/vacancy-faker-builder';

export const throwNotFoundException = (message?: string): never => {
  throw new NotFoundException(message);
};

export const throwUnprocessableEntityException = (message?: string): never => {
  throw new UnprocessableEntityException(message);
};

const mockUserRequest = (): any => {
  const user: JwtData = {
    id: faker.datatype.uuid(),
    user_agent: 'Mozilla',
    ip: '127.0.0.1',
  };

  return { user };
};
describe('VacancyController', () => {
  let controller: VacancyController;
  let service: VacancyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfig, synchronize: false }),
        VacancyModule,
      ],
    }).compile();

    controller = module.get<VacancyController>(VacancyController);
    service = module.get<VacancyService>(VacancyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vacancy', async () => {
      const result: Vacancy[] = VacancyFakerBuilder.theVacancies(2).build();
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });

    it('should return an empty array', async () => {
      const result: Vacancy[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a object of vacancy', async () => {
      const result: Vacancy = VacancyFakerBuilder.aVacancy().build();
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne('valid_uuid')).toBe(result);
    });

    it('should throw NotFoundException if vacancy not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vacancy not found'),
        );

      try {
        await controller.findOne('valid_uuid');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vacancy not found');
      }
    });
  });

  describe('create', () => {
    it('should return an empty response', async () => {
      const request = VacancyFakerBuilder.aVacancy().build();
      const userRequest = mockUserRequest();
      const result = undefined;
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(request, userRequest)).toBe(result);
    });

    it('should throw UnprocessableEntityException if vacancy already registered', async () => {
      const request = VacancyFakerBuilder.aVacancy().build();
      const userRequest = mockUserRequest();
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() =>
          throwUnprocessableEntityException('Vacancy already registered'),
        );

      try {
        await controller.create(request, userRequest);
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect(e.message).toBe('Vacancy already registered');
      }
    });
  });

  describe('update', () => {
    it('should return an empty response', async () => {
      const request = VacancyFakerBuilder.aVacancy().build();
      const result = undefined;
      jest.spyOn(service, 'update').mockImplementation(async () => result);

      expect(await controller.update('valid_uuid', request)).toBe(result);
    });

    it('should throw NotFoundException if vacancy not found', async () => {
      const request = VacancyFakerBuilder.aVacancy().build();
      jest
        .spyOn(service, 'update')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vacancy not found'),
        );

      try {
        await controller.update('valid_uuid', request);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vacancy not found');
      }
    });
  });

  describe('remove', () => {
    it('should return an empty response', async () => {
      const result = undefined;
      jest.spyOn(service, 'remove').mockImplementation(async () => result);

      expect(await controller.remove('valid_uuid')).toBe(result);
    });

    it('should throw NotFoundException if vacancy not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vacancy not found'),
        );

      try {
        await controller.remove('valid_uuid');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vacancy not found');
      }
    });
  });
});
