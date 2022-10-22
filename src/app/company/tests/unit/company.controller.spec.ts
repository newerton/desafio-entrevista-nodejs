import { faker } from '@faker-js/faker';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { cnpj } from 'cpf-cnpj-validator';

import { CompanyController } from '@app/company/company.controller';
import { CompanyService } from '@app/company/company.service';
import { CompanyOutput } from '@app/company/dto/company.dto';
import { CreateCompanyInput } from '@app/company/dto/create-company.dto';

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

const mockOutput = (): CompanyOutput => {
  return {
    id: faker.datatype.uuid(),
    social_name: faker.company.name(),
    fantasy_name: faker.company.name(),
    email: faker.internet.email(),
    document: cnpj.generate(),
    phone: '(11) 9 9876-5432',
    is_active: true,
    created_at: new Date(),
  };
};

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const result: CompanyOutput[] = [mockOutput()];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });

    it('should return an empty array', async () => {
      const result: CompanyOutput[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a object of company', async () => {
      const result: CompanyOutput = mockOutput();
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne('valid_uuid')).toBe(result);
    });

    it('should throw NotFoundException if company not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementationOnce(() =>
          throwNotFoundException('Company not found'),
        );

      try {
        await controller.findOne('valid_uuid');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Company not found');
      }
    });
  });

  describe('create', () => {
    it('should return an empty response', async () => {
      const request = mockCreateRequest();
      const result = undefined;
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(request)).toBe(result);
    });

    it('should throw UnprocessableEntityException if company already registered', async () => {
      const request = mockCreateRequest();
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() =>
          throwUnprocessableEntityException('Company already registered'),
        );

      try {
        await controller.create(request);
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect(e.message).toBe('Company already registered');
      }
    });
  });

  describe('update', () => {
    it('should return an empty response', async () => {
      const request = mockCreateRequest();
      const result = undefined;
      jest.spyOn(service, 'update').mockImplementation(async () => result);

      expect(await controller.update('valid_uuid', request)).toBe(result);
    });

    it('should throw NotFoundException if company not found', async () => {
      const request = mockCreateRequest();
      jest
        .spyOn(service, 'update')
        .mockImplementationOnce(() =>
          throwNotFoundException('Company not found'),
        );

      try {
        await controller.update('valid_uuid', request);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Company not found');
      }
    });
  });

  describe('remove', () => {
    it('should return an empty response', async () => {
      const result = undefined;
      jest.spyOn(service, 'remove').mockImplementation(async () => result);

      expect(await controller.remove('valid_uuid')).toBe(result);
    });

    it('should throw NotFoundException if company not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockImplementationOnce(() =>
          throwNotFoundException('Company not found'),
        );

      try {
        await controller.remove('valid_uuid');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Company not found');
      }
    });
  });
});
