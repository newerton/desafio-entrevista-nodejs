import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { CompanyAddress } from './entities/company_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyAddress])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
