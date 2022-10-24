import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyVacancyController } from './company_vacancy.controller';
import { CompanyVacancyRepository } from './company_vacancy.repository';
import { CompanyVacancyService } from './company_vacancy.service';
import { CompanyVacancy } from './entities/company_vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyVacancy])],
  controllers: [CompanyVacancyController],
  providers: [CompanyVacancyService, CompanyVacancyRepository],
})
export class CompanyVacancyModule {}
