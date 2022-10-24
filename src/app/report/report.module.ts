import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vacancy } from '@app/vacancy/entities/vacancy.entity';

import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  controllers: [ReportController],
  providers: [ReportService, ReportRepository],
})
export class ReportModule {}
