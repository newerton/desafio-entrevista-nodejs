import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, OneToOne, Relation } from 'typeorm';

import { BaseEntity } from '@common/entity';

import { CompanyAddress } from './company_address.entity';

@Entity('company')
export class Company extends BaseEntity {
  @ApiProperty()
  @Column({ nullable: true, default: null })
  social_name: string;

  @ApiProperty()
  @Column()
  fantasy_name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ default: false })
  email_verified: boolean;

  @ApiProperty()
  @Column()
  @Exclude()
  password: string;

  @ApiProperty()
  @Exclude()
  repeat_password: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  document: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  phone: string;

  @ApiProperty()
  @Column({ default: true })
  is_active?: boolean;

  @ApiProperty()
  @OneToOne(() => CompanyAddress, (address) => address.company, {
    cascade: true,
  })
  @JoinTable()
  address: Relation<CompanyAddress>;
}
