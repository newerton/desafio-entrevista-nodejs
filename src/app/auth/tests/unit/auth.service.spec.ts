import { faker } from '@faker-js/faker';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@app/auth/auth.module';
import { AuthService } from '@app/auth/auth.service';
import { AuthLoginInput } from '@app/auth/dto/auth-login.dto';
import { databaseConfig } from '@common/config/database';

export const throwBadRequestException = (message?: string): never => {
  throw new BadRequestException(message);
};

export const throwNotFoundException = (message?: string): never => {
  throw new NotFoundException(message);
};

const mockLoginRequest = (): AuthLoginInput => {
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    password,
  };
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfig, synchronize: false }),
        AuthModule,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an empty response', async () => {
      const request = mockLoginRequest();
      jest.spyOn(service, 'login').mockImplementation(async () => undefined);
      expect(await service.login(request)).toBe(undefined);
    });

    it('should throw BadRequestException if login is invalid', async () => {
      const request = mockLoginRequest();
      jest
        .spyOn(service, 'login')
        .mockImplementationOnce(() =>
          throwBadRequestException('E-mail or password invalid'),
        );

      try {
        await service.login(request);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe('E-mail or password invalid');
      }
    });
  });

  describe('validateUser', () => {
    it('should return an empty response', async () => {
      jest
        .spyOn(service, 'validateUser')
        .mockImplementation(async () => undefined);
      expect(await service.validateUser('valid_uuid')).toBe(undefined);
    });

    it('should throw BadRequestException if validateUser is invalid', async () => {
      jest
        .spyOn(service, 'validateUser')
        .mockImplementationOnce(() => throwNotFoundException('Not found'));

      try {
        await service.validateUser('valid_uuid');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Not found');
      }
    });
  });
});
