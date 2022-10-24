import { faker } from '@faker-js/faker';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from '@app/auth/auth.controller';
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

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfig, synchronize: false }),
        AuthModule,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an empty response', async () => {
      const request = mockLoginRequest();
      const result = undefined;
      jest.spyOn(service, 'login').mockImplementation(async () => result);

      expect(await controller.login(request)).toBe(result);
    });

    it('should throw UnprocessableEntityException if login is invalid', async () => {
      const request = mockLoginRequest();
      jest
        .spyOn(service, 'login')
        .mockImplementationOnce(() =>
          throwBadRequestException('E-mail or password invalid'),
        );

      try {
        await controller.login(request);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe('E-mail or password invalid');
      }
    });
  });
});
