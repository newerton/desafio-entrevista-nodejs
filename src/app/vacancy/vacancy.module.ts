import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyVacancyRepository } from '@app/company_vacancy/company_vacancy.repository';
import { VehicleRepository } from '@app/vehicle/vehicle.repository';

import { Vacancy } from './entities/vacancy.entity';
import { VacancyController } from './vacancy.controller';
import { VacancyRepository } from './vacancy.repository';
import { VacancyService } from './vacancy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  controllers: [VacancyController],
  providers: [
    VacancyService,
    VacancyRepository,
    CompanyVacancyRepository,
    VehicleRepository,
  ],
})
export class VacancyModule {}
