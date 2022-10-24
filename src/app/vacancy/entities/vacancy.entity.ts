import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, OneToOne, Relation } from 'typeorm';

import { CompanyVacancy } from '@app/company_vacancy/entities/company_vacancy.entity';
import { BaseEntity } from '@common/entity';

@Entity('vacancy')
export class Vacancy extends BaseEntity {
  @ApiProperty()
  @Column('uuid')
  company_id: string;

  @ApiProperty()
  @Column('uuid')
  vehicle_id: string;

  @ApiProperty()
  @Column({ type: 'datetime', nullable: true, default: null })
  date_in?: Date;

  @ApiProperty()
  @Column({ type: 'datetime', nullable: true, default: null })
  date_out?: Date;

  @ApiProperty({ type: [CompanyVacancy] })
  @OneToOne(
    () => CompanyVacancy,
    (companyVacancy) => companyVacancy.vehicleType,
  )
  @JoinTable()
  vacancy: Relation<CompanyVacancy[]>;
}
