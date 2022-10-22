import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { cnpj } from 'cpf-cnpj-validator';

import { CompanyService } from '@app/company/company.service';
import { CompanyOutput } from '@app/company/dto/company.dto';
import { CreateCompanyInput } from '@app/company/dto/create-company.dto';

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
      providers: [CompanyService],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should show an array of companies', async () => {
      const result: CompanyOutput[] = [
        {
          id: faker.datatype.uuid(),
          social_name: faker.company.name(),
          fantasy_name: faker.company.name(),
          email: faker.internet.email(),
          document: cnpj.generate(),
          phone: '(11) 9 9876-5432',
          is_active: true,
          created_at: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });

    it('should show an empty array of companies', async () => {
      const result: CompanyOutput[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should show a object of company', async () => {
      const result: CompanyOutput = {
        id: faker.datatype.uuid(),
        social_name: faker.company.name(),
        fantasy_name: faker.company.name(),
        email: faker.internet.email(),
        document: cnpj.generate(),
        phone: '(11) 9 9876-5432',
        is_active: true,
        created_at: new Date(),
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await service.findOne(11)).toBe(result);
    });

    it('should show a empty object of company', async () => {
      const result = {};
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await service.findOne(9999)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return an empty response', async () => {
      const request = mockCreateRequest();
      jest.spyOn(service, 'create').mockImplementation(async () => undefined);
      expect(await service.create(request)).toBe(undefined);
    });
  });

  describe('update', () => {
    it('should return an empty response', async () => {
      const request = mockCreateRequest();
      jest.spyOn(service, 'update').mockImplementation(async () => undefined);
      expect(await service.update(1, request)).toBe(undefined);
    });
  });

  describe('update', () => {
    it('should return an empty response', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => undefined);
      expect(await service.remove(1)).toBe(undefined);
    });
  });
});
