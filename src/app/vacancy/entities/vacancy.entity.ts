import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

import { Company } from '@app/company/entities/company.entity';
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
  @ManyToOne(() => Company, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Relation<Company[]>;

  @ApiProperty({ type: Vehicle })
  @ManyToOne(() => Vehicle, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Relation<Vehicle[]>;
}
