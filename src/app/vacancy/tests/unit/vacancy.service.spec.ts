import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vacancy } from '@app/vacancy/entities/vacancy.entity';
import { VacancyModule } from '@app/vacancy/vacancy.module';
import { VacancyService } from '@app/vacancy/vacancy.service';
import { databaseConfig } from '@common/config/database';

import { VacancyFakerBuilder } from '../faker-builder/vacancy-faker-builder';

export const throwNotFoundException = (message?: string): never => {
  throw new NotFoundException(message);
};

export const throwUnprocessableEntityException = (message?: string): never => {
  throw new UnprocessableEntityException(message);
};

describe('VacancyService', () => {
  let service: VacancyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfig, synchronize: false }),
        VacancyModule,
      ],
    }).compile();

    service = module.get<VacancyService>(VacancyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should show an array of vacancies', async () => {
      const result: Vacancy[] = VacancyFakerBuilder.theVacancies(2).build();
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });

    it('should show an empty array of vacancies', async () => {
      const result: Vacancy[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should show a object of vacancy', async () => {
      const result: Vacancy = VacancyFakerBuilder.aVacancy().build();
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await service.findOne('1')).toBe(result);
    });

    it('should throw NotFoundException if vacancy not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vacancy not found'),
        );

      try {
        await service.findOne('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vacancy not found');
      }
    });
  });

  describe('create', () => {
    it('should return an empty response', async () => {
      const request = VacancyFakerBuilder.aVacancy().build();
      jest.spyOn(service, 'create').mockImplementation(async () => undefined);
      expect(await service.create(request)).toBe(undefined);
    });

    it('should throw UnprocessableEntityException if vacancy already registered', async () => {
      const request = VacancyFakerBuilder.aVacancy().build();
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() =>
          throwUnprocessableEntityException('Vacancy already registered'),
        );

      try {
        await service.create(request);
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect(e.message).toBe('Vacancy already registered');
      }
    });
  });

  describe('update', () => {
    it('should return an empty response', async () => {
      const request = VacancyFakerBuilder.aVacancy().build();
      jest.spyOn(service, 'update').mockImplementation(async () => undefined);
      expect(await service.update('1', request)).toBe(undefined);
    });

    it('should throw NotFoundException if vacancy not found', async () => {
      const request = VacancyFakerBuilder.aVacancy().build();
      jest
        .spyOn(service, 'update')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vacancy not found'),
        );

      try {
        await service.update('1', request);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vacancy not found');
      }
    });
  });

  describe('remove', () => {
    it('should return an empty response', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => undefined);
      expect(await service.remove('1')).toBe(undefined);
    });

    it('should throw NotFoundException if vacancy not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockImplementationOnce(() =>
          throwNotFoundException('Vacancy not found'),
        );

      try {
        await service.remove('1');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Vacancy not found');
      }
    });
  });
});
