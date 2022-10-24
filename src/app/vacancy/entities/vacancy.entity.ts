import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  Relation,
} from 'typeorm';

import { Company } from '@app/company/entities/company.entity';
import { CompanyVacancy } from '@app/company_vacancy/entities/company_vacancy.entity';
import { Vehicle } from '@app/vehicle/entities/vehicle.entity';
import { BaseEntity } from '@common/entity';

@Entity('vacancy')
export class Vacancy extends BaseEntity {
  @ApiProperty()
  @Column('uuid')
  @Exclude()
  company_id: string;

  @ApiProperty()
  @Column('uuid')
  @Exclude()
  vehicle_id: string;

  @ApiProperty()
  @Column({ type: 'datetime', nullable: true, default: null })
  date_in?: Date;

  @ApiProperty()
  @Column({ type: 'datetime', nullable: true, default: null })
  date_out?: Date;

  @ApiProperty({ type: Company })
  @OneToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Relation<Company>;

  @ApiProperty({ type: Vehicle })
  @OneToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Relation<Vehicle>;
}
