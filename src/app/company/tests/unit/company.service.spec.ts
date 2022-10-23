import { faker } from '@faker-js/faker';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyModule } from '@app/company/company.module';
import { CompanyService } from '@app/company/company.service';
import { CreateCompanyInput } from '@app/company/dto/create-company.dto';
import { Company } from '@app/company/entities/company.entity';
import { databaseConfig } from '@common/config/database';

import { CompanyFakeBuilder } from '../fake-builder/company-fake-builder';

export const throwNotFoundException = (message?: string): never => {
  throw new NotFoundException(message);
};

export const throwUnprocessableEntityException = (message?: string): never => {
  throw new UnprocessableEntityException(message);
};

const mockCreateRequest = (): CreateCompanyInput => {
  const password = faker.internet.password();
  return {
    fantasy_name: faker.company.name(),
    email: faker.internet.email(),
    password,
    password_confirm: password,
  };
};

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfig, synchronize: false }),
        CompanyModule,
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should show an array of companies', async () => {
      const result: Company[] = CompanyFakeBuilder.theCompanies(2).build();
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });

    it('should show an empty array of companies', async () => {
      const result: Company[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should show a object of company', async () => {
      const result: Company = CompanyFakeBuilder.aCompany().build();
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await service.findOne('1')).toBe(result);
    });

    it('should throw NotFoundException if company not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementationOnce(() =>
          throwNotFoundException('Company not found'),
        );

      try {
        await service.findOne('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Company not found');
      }
    });
  });

  describe('create', () => {
    it('should return an empty response', async () => {
      const request = mockCreateRequest();
      jest.spyOn(service, 'create').mockImplementation(async () => undefined);
      expect(await service.create(request)).toBe(undefined);
    });

    it('should throw UnprocessableEntityException if company already registered', async () => {
      const request = mockCreateRequest();
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() =>
          throwUnprocessableEntityException('Company already registered'),
        );

      try {
        await service.create(request);
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect(e.message).toBe('Company already registered');
      }
    });
  });

  describe('update', () => {
    it('should return an empty response', async () => {
      const request = mockCreateRequest();
      jest.spyOn(service, 'update').mockImplementation(async () => undefined);
      expect(await service.update('1', request)).toBe(undefined);
    });

    it('should throw NotFoundException if company not found', async () => {
      const request = mockCreateRequest();
      jest
        .spyOn(service, 'update')
        .mockImplementationOnce(() =>
          throwNotFoundException('Company not found'),
        );

      try {
        await service.update('1', request);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Company not found');
      }
    });
  });

  describe('remove', () => {
    it('should return an empty response', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => undefined);
      expect(await service.remove('1')).toBe(undefined);
    });

    it('should throw NotFoundException if company not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockImplementationOnce(() =>
          throwNotFoundException('Company not found'),
        );

      try {
        await service.remove('1');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Company not found');
      }
    });
  });
});
