import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';

import { BaseEntity } from '@common/entity';

import { Company } from './company.entity';

@Entity('company_address')
export class CompanyAddress extends BaseEntity {
  @Column('uuid')
  @Exclude()
  company_id: string;

  @ApiProperty()
  @Column()
  zipcode: string;

  @ApiProperty()
  @Column()
  street: string;

  @ApiProperty()
  @Column()
  number: string;

  @ApiProperty()
  @Column()
  neighborhood: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  complement?: string;

  @Column()
  state_id: number;

  @Column()
  city_id: number;

  @OneToOne(() => Company, (company) => company.address)
  @JoinColumn({ name: 'company_id' })
  company: Relation<Company>;
}
