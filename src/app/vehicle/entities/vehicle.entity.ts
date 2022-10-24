import { ApiProperty } from '@nestjs/swagger';
import {
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  OneToOne,
  Relation,
} from 'typeorm';

import { VehicleType } from '@app/vehicle_type/entities/vehicle_type.entity';
import { BaseEntity } from '@common/entity';

@Entity('vehicle')
export class Vehicle extends BaseEntity {
  @ApiProperty()
  @Column('uuid')
  vehicle_type_id: string;

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

  short_name: string;

  @AfterLoad()
  generateShortName(): void {
    this.short_name = `${this.brand} ${this.model} (${this.color}) - ${this.license_plate}`;
  }

  @ApiProperty()
  @OneToOne(() => VehicleType, (vehicleType) => vehicleType.vehicle)
  @JoinTable()
  vehicleType: Relation<VehicleType>;
}
