import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, OneToOne, Relation } from 'typeorm';

import { CompanyVacancy } from '@app/company_vacancy/entities/company_vacancy.entity';
import { Vehicle } from '@app/vehicle/entities/vehicle.entity';
import { BaseEntity } from '@common/entity';

@Entity('vehicle_type')
export class VehicleType extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ default: true })
  is_active?: boolean;

  @ApiProperty()
  @OneToOne(() => Vehicle, (vehicle) => vehicle.vehicleType)
  @JoinTable()
  vehicle: Relation<Vehicle[]>;

  @ApiProperty()
  @OneToOne(
    () => CompanyVacancy,
    (companyVacancy) => companyVacancy.vehicleType,
  )
  @JoinTable()
  vacancy: Relation<CompanyVacancy[]>;
}
