import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginInput {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
