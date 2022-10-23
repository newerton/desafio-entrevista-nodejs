import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { cnpj } from 'cpf-cnpj-validator';

import { CompanyAddress } from '../entities/company_address.entity';

export class CreateCompanyInput {
  @ApiProperty({ example: faker.company.name() })
  readonly social_name?: string;

  @ApiProperty({ example: faker.company.name() })
  readonly fantasy_name: string;

  @ApiProperty({ example: faker.internet.email() })
  readonly email: string;

  @ApiProperty({ example: '123456' })
  readonly password: string;

  @ApiProperty({ example: '123456' })
  readonly password_confirm: string;

  @ApiProperty({ example: cnpj.generate() })
  readonly document?: string;

  @ApiProperty({ example: '(11) 9 9876-5432' })
  readonly phone?: string;

  @ApiProperty({ example: true })
  readonly is_active?: boolean;

  @ApiProperty({ example: {} })
  readonly address?: CompanyAddress;
}

export class CreateCompanyOutput {}
