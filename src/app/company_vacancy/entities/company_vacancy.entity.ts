import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Relation,
} from 'typeorm';

import { Company } from '@app/company/entities/company.entity';
import { VehicleType } from '@app/vehicle_type/entities/vehicle_type.entity';
import { BaseEntity } from '@common/entity';

@Entity('company_vacancy')
export class CompanyVacancy extends BaseEntity {
  @ApiProperty({ type: 'string' })
  @Column('uuid')
  @Exclude()
  company_id: string;

  @ApiProperty()
  @Column('uuid')
  @Exclude()
  vehicle_type_id: string;

  @ApiProperty()
  @Column({ type: 'int' })
  quantity: string;

  @ApiProperty()
  @Column({ default: true })
  is_active?: boolean;

  @ManyToOne(() => Company, (company) => company.vacancies, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<Company>;

  @ApiProperty()
  @OneToOne(() => VehicleType, (vehicleType) => vehicleType.vacancy, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicle_type_id', referencedColumnName: 'id' })
  vehicleType: Relation<VehicleType>;
}
