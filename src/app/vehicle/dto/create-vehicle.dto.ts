import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleInput {
  @ApiProperty({ example: '' })
  readonly vehicle_type_id: string;

  @ApiProperty({ example: 'Passeio' })
  readonly type: string;

  @ApiProperty({ example: faker.vehicle.manufacturer() })
  readonly brand: string;

  @ApiProperty({ example: faker.vehicle.model() })
  readonly model: string;

  @ApiProperty({ example: faker.vehicle.color() })
  readonly color: string;

  @ApiProperty({ example: faker.vehicle.vrm() })
  readonly license_plate: string;

  @ApiProperty({ example: 5 })
  readonly passenger_capacity: number;

  @ApiProperty({ example: true })
  readonly is_active?: boolean;
}
