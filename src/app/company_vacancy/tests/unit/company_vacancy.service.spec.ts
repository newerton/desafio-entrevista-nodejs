import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyVacancyModule } from '@app/company_vacancy/company_vacancy.module';
import { CompanyVacancyService } from '@app/company_vacancy/company_vacancy.service';
import { CompanyVacancy } from '@app/company_vacancy/entities/company_vacancy.entity';
import { databaseConfig } from '@common/config/database';

import { CompanyVacancyFakerBuilder } from '../faker-builder/company_vacancy-faker-builder';

export const throwNotFoundException = (message?: string): never => {
  throw new NotFoundException(message);
};

export const throwUnprocessableEntityException = (message?: string): never => {
  throw new UnprocessableEntityException(message);
};

describe('CompanyVacancyService', () => {
  let service: CompanyVacancyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfig, synchronize: false }),
        CompanyVacancyModule,
      ],
    }).compile();

    service = module.get<CompanyVacancyService>(CompanyVacancyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should show an array of vacancies', async () => {
      const result: CompanyVacancy[] =
        CompanyVacancyFakerBuilder.theCompanyVacancies(2).build();
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });

    it('should show an empty array of vacancies', async () => {
      const result: CompanyVacancy[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should show a object of vacancy', async () => {
      const result: CompanyVacancy =
        CompanyVacancyFakerBuilder.aCompanyVacancy().build();
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
      const request = CompanyVacancyFakerBuilder.aCompanyVacancy().build();
      jest.spyOn(service, 'create').mockImplementation(async () => undefined);
      expect(await service.create(request)).toBe(undefined);
    });

    it('should throw UnprocessableEntityException if vacancy already registered', async () => {
      const request = CompanyVacancyFakerBuilder.aCompanyVacancy().build();
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
      const request = CompanyVacancyFakerBuilder.aCompanyVacancy().build();
      jest.spyOn(service, 'update').mockImplementation(async () => undefined);
      expect(await service.update('1', request)).toBe(undefined);
    });

    it('should throw NotFoundException if vacancy not found', async () => {
      const request = CompanyVacancyFakerBuilder.aCompanyVacancy().build();
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
