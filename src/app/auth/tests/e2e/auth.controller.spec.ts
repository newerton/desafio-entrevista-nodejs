import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import dayjs from 'dayjs';
import request from 'supertest';
import { DataSource } from 'typeorm';

import { AuthLoginInput } from '@app/auth/dto/auth-login.dto';
import { Company } from '@app/company/entities/company.entity';
import { CompanyFakerBuilder } from '@app/company/tests/faker-builder/company-faker-builder';
import {
  clearRepositories,
  createNestApplication,
} from '@common/helpers/test-helpers';
import { validateUUIDV4 } from '@common/utils/validate-uuid-v4';

describe('Auth - /auth (e2e)', () => {
  let app: INestApplication;
  let dbConnection: DataSource;
  let company: Company;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        dbConnection = moduleRef.get(DataSource);
        jwtService = moduleRef.get(JwtService);
        configService = moduleRef.get(ConfigService);
      },
    });
  });

  beforeEach(async () => {
    await clearRepositories(dbConnection);
    const password = await hash('123456', 8);
    const companyPayload = CompanyFakerBuilder.aCompany()
      .withEmail('test@test.com')
      .withPassword(password)
      .build();
    company = await dbConnection.manager.save(Company, companyPayload);
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/POST auth/login`, async () => {
    const credentials: AuthLoginInput = {
      email: 'test@test.com',
      password: '123456',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(credentials)
      .expect(HttpStatus.OK);

    const verify = await jwtService.verifyAsync(response.body.access_token);
    expect(validateUUIDV4(verify.sub)).toBeTruthy();
    expect(company.id).toEqual(verify.sub);

    const expiresIn = configService.get('jwt.expiresIn');
    const expiresInNumber = parseInt(expiresIn.replace(/\D/g, ''), 10);
    const expiresInString = expiresIn.replace(/[^a-z]/gi, '');

    const now = dayjs();
    const expires = now.add(expiresInNumber, expiresInString);

    const diff = expires.diff(now, 'days');
    expect(diff).toEqual(expiresInNumber);
  });
});
