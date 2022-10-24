import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleTypeInput {
  @ApiProperty({ example: 'Car' })
  readonly name: string;

  @ApiProperty({ example: true })
  readonly is_active?: boolean;
}
