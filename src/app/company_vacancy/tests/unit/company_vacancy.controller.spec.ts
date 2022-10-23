import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyVacancyController } from '@app/company_vacancy/company_vacancy.controller';
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

describe('CompanyVacancyController', () => {
  let controller: CompanyVacancyController;
  let service: CompanyVacancyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfig, synchronize: false }),
        CompanyVacancyModule,
      ],
    }).compile();

    controller = module.get<CompanyVacancyController>(CompanyVacancyController);
    service = module.get<CompanyVacancyService>(CompanyVacancyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vacancies', async () => {
      const result: CompanyVacancy[] =
        CompanyVacancyFakerBuilder.theCompanyVacancies(2).build();
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });

    it('should return an empty array', async () => {
      const result: CompanyVacancy[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a object of vacancy', async () => {
      const result: CompanyVacancy =
        CompanyVacancyFakerBuilder.aCompanyVacancy().build();
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
      const request = CompanyVacancyFakerBuilder.aCompanyVacancy().build();
      const result = undefined;
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(request)).toBe(result);
    });

    it('should throw UnprocessableEntityException if vacancy already registered', async () => {
      const request = CompanyVacancyFakerBuilder.aCompanyVacancy().build();
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() =>
          throwUnprocessableEntityException('Vacancy already registered'),
        );

      try {
        await controller.create(request);
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect(e.message).toBe('Vacancy already registered');
      }
    });
  });

  describe('update', () => {
    it('should return an empty response', async () => {
      const request = CompanyVacancyFakerBuilder.aCompanyVacancy().build();
      const result = undefined;
      jest.spyOn(service, 'update').mockImplementation(async () => result);

      expect(await controller.update('valid_uuid', request)).toBe(result);
    });

    it('should throw NotFoundException if vacancy not found', async () => {
      const request = CompanyVacancyFakerBuilder.aCompanyVacancy().build();
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
