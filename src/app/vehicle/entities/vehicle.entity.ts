import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@common/entity';

@Entity('vehicle')
export class Vehicle extends BaseEntity {
  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  brand: string;

  @ApiProperty()
  @Column()
  model: string;

  @ApiProperty()
  @Column()
  color: string;

  @ApiProperty()
  @Column()
  license_plate: string;

  @ApiProperty()
  @Column()
  passenger_capacity: number;

  @ApiProperty()
  @Column({ default: true })
  is_active?: boolean;
}
