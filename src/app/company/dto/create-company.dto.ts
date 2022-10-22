import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyInput {
  @ApiProperty({ example: faker.company.name() })
  readonly fantasy_name: string;

  @ApiProperty({ example: faker.internet.email() })
  readonly email: string;

  @ApiProperty({ example: '123456' })
  readonly password: string;

  @ApiProperty({ example: '123456' })
  readonly password_confirm: string;
}

export class CreateCompanyOutput {}
